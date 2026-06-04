#!/usr/bin/env bash
# Re-apply Cache-Control on objects already in S3 (no local out/ required).
#
# Required env: S3_BUCKET
# Usage: ./scripts/repair-s3-cache-headers.sh

set -euo pipefail

BUCKET="${S3_BUCKET:?Set S3_BUCKET}"
LONG_CACHE='public, max-age=31536000, immutable'
HTML_CACHE='public, max-age=0, s-maxage=3600, stale-while-revalidate=86400, must-revalidate'

echo "repair-s3-cache-headers: s3://$BUCKET"

if aws s3 ls "s3://$BUCKET/_next/static/" >/dev/null 2>&1; then
  aws s3 cp "s3://$BUCKET/_next/static" "s3://$BUCKET/_next/static" \
    --recursive \
    --metadata-directive REPLACE \
    --cache-control "$LONG_CACHE"
  echo "  updated _next/static/**"
fi

while IFS= read -r key; do
  [ -z "$key" ] && continue
  aws s3 cp "s3://$BUCKET/$key" "s3://$BUCKET/$key" \
    --metadata-directive REPLACE \
    --cache-control "$HTML_CACHE" \
    --content-type "text/html; charset=utf-8"
done < <(
  aws s3api list-objects-v2 --bucket "$BUCKET" --output text --query 'Contents[].Key' \
    | tr '\t' '\n' \
    | grep -E '\.html$' || true
)

aws s3 cp "s3://$BUCKET" "s3://$BUCKET" \
  --recursive \
  --exclude '_next/static/*' \
  --exclude '*.html' \
  --metadata-directive REPLACE \
  --cache-control "$LONG_CACHE"

echo "repair-s3-cache-headers: done"
