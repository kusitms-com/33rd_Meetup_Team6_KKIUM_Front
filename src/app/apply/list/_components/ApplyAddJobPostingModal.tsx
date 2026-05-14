'use client';

import { Modal, ModalDescription, ModalTitle } from '@/components/common/Modal';
import { PlusIcon } from '@/components/common/icons/PlusIcon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useJobPostingUrlField } from '@/hooks/apply/useJobPostingUrlField';

export function ApplyAddJobPostingModal() {
  const { url, setUrl, validation, showError, markTouched, reset, maxLength } = useJobPostingUrlField();
  const errorId = 'apply-job-posting-url-error';

  return (
    <Modal
      showCloseButton
      onOpenChange={(open) => {
        if (!open) {
          reset();
        }
      }}
      trigger={
        <Button type="button" variant="default" size="default" leftIcon={<PlusIcon />}>
          지원 추가
        </Button>
      }
    >
      <div className="flex w-full min-w-0 items-start justify-between pr-10">
        <div className="flex min-w-0 flex-col gap-0.5">
          <ModalTitle className="text-strong">공고 등록</ModalTitle>
          <ModalDescription>지원하고 싶은 기업의 공고 링크를 입력해주세요</ModalDescription>
        </div>
      </div>

      <div className="flex w-full flex-col gap-6">
        <div className="flex w-full flex-col gap-4">
          <label htmlFor="apply-job-posting-url" className="title-2-bold text-strong">
            공고 링크
          </label>
          <div className="flex flex-col gap-1.5">
            <Input
              id="apply-job-posting-url"
              type="url"
              inputMode="url"
              name="jobPostingUrl"
              autoComplete="url"
              value={url}
              maxLength={maxLength}
              aria-invalid={showError}
              aria-describedby={showError ? errorId : undefined}
              onChange={(e) => setUrl(e.target.value)}
              onBlur={markTouched}
              placeholder="링크를 입력해주세요"
            />
            {showError && !validation.ok ? (
              <p id={errorId} className="body-3-regular text-red-700" role="alert">
                {validation.error}
              </p>
            ) : null}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="body-1-bold text-quaternary">공고 링크가 없나요?</span>
          <button
            type="button"
            className="body-1-bold text-secondary underline underline-offset-4 hover:text-strong"
          >
            공고 직접 등록하기
          </button>
        </div>
      </div>

      <Button
        type="button"
        variant="default"
        size="default"
        disabled={!validation.ok}
        className="w-full text-xs font-bold leading-5"
      >
        공고 분석하기
      </Button>
    </Modal>
  );
}
