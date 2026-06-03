import type { ExperienceItem } from '@/app/(pages)/experience/_components/ExperienceCardGrid';

export type BasicDetailKey = keyof ExperienceItem['basicDetail'];

export type ExperienceDetailInfoItem =
  | {
      type: 'period';
      label: string;
      value: string;
    }
  | {
      type: 'field';
      label: string;
      value: string;
      displayValue: string;
      name: BasicDetailKey;
    };

export function getExperienceDetailInfoItems(
  type: ExperienceItem['type'],
  basicDetail: ExperienceItem['basicDetail'],
  periodLabel: string,
): ExperienceDetailInfoItem[] {
  switch (type) {
    case 'activity': {
      const teamNum = basicDetail.teamNum ?? '';
      const contributionRate = basicDetail.contributionRate ?? '';

      return [
        { type: 'period', label: '기간', value: periodLabel },
        {
          type: 'field',
          label: '팀원 수',
          value: teamNum,
          displayValue: teamNum ? `${teamNum}명` : '',
          name: 'teamNum',
        },
        {
          type: 'field',
          label: '내 역할',
          value: basicDetail.role ?? '',
          displayValue: basicDetail.role ?? '',
          name: 'role',
        },
        {
          type: 'field',
          label: '기여도',
          value: contributionRate,
          displayValue: contributionRate ? `${contributionRate}%` : '',
          name: 'contributionRate',
        },
      ];
    }
    case 'career':
      return [
        { type: 'period', label: '기간', value: periodLabel },
        {
          type: 'field',
          label: '회사/기관/단체명',
          value: basicDetail.company ?? '',
          displayValue: basicDetail.company ?? '',
          name: 'company',
        },
        {
          type: 'field',
          label: '고용 형태',
          value: basicDetail.employmentStatus ?? '',
          displayValue: basicDetail.employmentStatus ?? '',
          name: 'employmentStatus',
        },
      ];
    case 'education':
      return [
        { type: 'period', label: '기간', value: periodLabel },
        {
          type: 'field',
          label: '기관명',
          value: basicDetail.organizationName ?? '',
          displayValue: basicDetail.organizationName ?? '',
          name: 'organizationName',
        },
        {
          type: 'field',
          label: '수강명',
          value: basicDetail.name ?? '',
          displayValue: basicDetail.name ?? '',
          name: 'name',
        },
      ];
    case 'etc':
      return [{ type: 'period', label: '기간', value: periodLabel }];
  }
}
