'use client';

import { type ReactNode, useState } from 'react';

import { ExperienceTypeOptionCard } from '@/app/experience/add/_components/ExperienceTypeOptionCard';
import { TextField } from '@/components/common/TextField';

const EXPERIENCE_TYPE_OPTIONS = [
  {
    value: 'activity',
    label: '학내외활동',
    defaultIconSrc: '/activity-default.svg',
    selectedIconSrc: '/activity-selected.svg',
  },
  {
    value: 'career',
    label: '인턴/직무경력',
    defaultIconSrc: '/career-default.svg',
    selectedIconSrc: '/career-selected.svg',
  },
  {
    value: 'education',
    label: '수강/교육',
    defaultIconSrc: '/education-default.svg',
    selectedIconSrc: '/education-selected.svg',
  },
  {
    value: 'etc',
    label: '기타',
    defaultIconSrc: '/etc-default.svg',
    selectedIconSrc: '/etc-selected.svg',
  },
] as const;

type ExperienceType = (typeof EXPERIENCE_TYPE_OPTIONS)[number]['value'];

const EXPERIENCE_TYPE_FIELD_SECTIONS: Record<ExperienceType, ReactNode> = {
  activity: (
    <>
      <QuestionField number="02." label="제목" placeholder="제목을 작성해주세요." />
      <div className="grid w-full grid-cols-2 gap-4">
        <QuestionField number="03." label="팀원 수" placeholder="예시 : 5" />
        <QuestionFieldGroup number="04." label="내 역할 및 기여도">
          <div className="grid w-full grid-cols-2 gap-2.5">
            <TextField placeholder="기획자" description={false} />
            <TextField placeholder="20%" description={false} />
          </div>
        </QuestionFieldGroup>
      </div>
      <div className="grid w-full grid-cols-2 gap-4">
        <QuestionField number="05." label="시작 날짜" variant="date" />
        <QuestionField number="06." label="종료 날짜" variant="date" />
      </div>
    </>
  ),
  career: (
    <>
      <QuestionField number="02." label="제목" placeholder="제목을 작성해주세요." />
      <div className="grid w-full grid-cols-2 gap-4">
        <QuestionField
          number="03."
          label="회사/기관/단체명"
          placeholder="회사/기관/단체명을 입력해주세요."
        />
        <QuestionField number="04." label="고용 형태" placeholder="고용 형태를 선택해주세요" />
      </div>
      <div className="grid w-full grid-cols-2 gap-4">
        <QuestionField number="05." label="시작 날짜" variant="date" />
        <QuestionField number="06." label="종료 날짜" variant="date" />
      </div>
    </>
  ),
  education: (
    <>
      <QuestionField number="02." label="제목" placeholder="제목을 작성해주세요." />
      <div className="grid w-full grid-cols-2 gap-4">
        <QuestionField number="03." label="기관명" placeholder="교육기관명을 입력해주세요." />
        <QuestionField number="04." label="수강명" placeholder="수강명을 입력해주세요." />
      </div>
      <div className="grid w-full grid-cols-2 gap-4">
        <QuestionField number="05." label="시작 날짜" variant="date" />
        <QuestionField number="06." label="종료 날짜" variant="date" />
      </div>
    </>
  ),
  etc: null,
};

export function ExperienceAddBasicInfoStep() {
  const [selectedType, setSelectedType] = useState<ExperienceType | null>(null);

  return (
    <section
      aria-labelledby="experience-add-basic-info-title"
      className="flex w-full flex-col gap-6 overflow-hidden rounded-xl border border-border-default bg-background-w px-[30px] py-5"
    >
      <div className="flex flex-col gap-1">
        <p className="title-2-bold text-mint-300">Step 2</p>
        <div className="flex flex-col gap-0.5">
          <h2 id="experience-add-basic-info-title" className="heading-3-bold text-[#050505]">
            기본 정보 입력
          </h2>
          <p className="body-2-regular text-gray-700">경험의 기본 정보를 입력해주세요.</p>
        </div>
      </div>

      <div className="flex w-full flex-col gap-4">
        <div className="flex items-start gap-0.5 title-2-bold">
          <span className="text-mint-300">01.</span>
          <span className="text-strong">경험 유형</span>
          <span className="text-mint-300">*</span>
        </div>

        <div className="grid w-full grid-cols-4 gap-2">
          {EXPERIENCE_TYPE_OPTIONS.map((option) => (
            <ExperienceTypeOptionCard
              key={option.value}
              label={option.label}
              defaultIconSrc={option.defaultIconSrc}
              selectedIconSrc={option.selectedIconSrc}
              selected={selectedType === option.value}
              onClick={() => setSelectedType(option.value)}
            />
          ))}
        </div>
      </div>

      {selectedType && EXPERIENCE_TYPE_FIELD_SECTIONS[selectedType] && (
        <div className="flex w-full flex-col gap-7">{EXPERIENCE_TYPE_FIELD_SECTIONS[selectedType]}</div>
      )}
    </section>
  );
}

function QuestionField({
  number,
  label,
  placeholder,
  variant,
}: {
  number: string;
  label: string;
  placeholder?: string;
  variant?: 'input' | 'date';
}) {
  return (
    <QuestionFieldGroup number={number} label={label}>
      <TextField variant={variant} placeholder={placeholder} description={false} />
    </QuestionFieldGroup>
  );
}

function QuestionFieldGroup({
  number,
  label,
  children,
}: {
  number: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex items-start gap-0.5 title-2-bold">
        <span className="text-mint-300">{number}</span>
        <span className="text-strong">{label}</span>
        <span className="text-mint-300">*</span>
      </div>
      {children}
    </div>
  );
}
