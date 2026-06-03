'use client';

import { useEffect, useState } from 'react';

import type { ExperienceMaterial } from '@/app/(pages)/experience/add/_components/ExperienceAddMaterialModal';
import { getExperienceAddPdfDraft } from '@/app/(pages)/experience/add/_utils/experienceAddPdfDraftStorage';

export function useExperienceAddMaterials() {
  const [materials, setMaterials] = useState<ExperienceMaterial[]>([]);

  useEffect(() => {
    const restorePdfDraft = async () => {
      try {
        const pdfMaterial = await getExperienceAddPdfDraft();

        if (!pdfMaterial) return;

        setMaterials((currentMaterials) => {
          const hasPdf = currentMaterials.some((material) => material.type === 'pdf');

          if (hasPdf) return currentMaterials;

          return [pdfMaterial, ...currentMaterials];
        });
      } catch (error) {
        console.warn('PDF 임시 저장 데이터를 복구하지 못했습니다.', error);
      }
    };

    void restorePdfDraft();
  }, []);

  return {
    materials,
    setMaterials,
  };
}
