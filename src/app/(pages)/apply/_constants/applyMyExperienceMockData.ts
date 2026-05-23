import type { ExperienceCategory } from '@/app/(pages)/experience/_components/ExperienceCategoryTab';

export type ApplyMyExperienceItem = {
  id: string;
  type: Exclude<ExperienceCategory, 'all'>;
  title: string;
  description: string;
  skillTags: readonly string[];
  competencyTags: readonly string[];
  matchScore: number;
};

export const applyMyExperienceMockData: readonly ApplyMyExperienceItem[] = [
  {
    id: '1',
    type: 'etc',
    title: '고가용성 결제 시스템 설계 및 운영',
    description: '99.99% 가용성을 목표로 한 분산 결제 시스템 설계 및 장애 대응',
    skillTags: [
      'Chrome Extension',
      'Multi-Variate Testing',
      'Multi-Variate Testing',
      'Multi-Variate Testing',
    ],
    competencyTags: ['문제 해결', '주인의식', '시스템 설계'],
    matchScore: 88,
  },
  {
    id: '2',
    type: 'career',
    title: '토스페이먼츠 백엔드 인턴',
    description: '결제 도메인 API 개발 및 장애 대응 프로세스 개선',
    skillTags: ['Java', 'Spring', 'Kafka'],
    competencyTags: ['협업', '문제 해결'],
    matchScore: 76,
  },
  {
    id: '3',
    type: 'activity',
    title: '해커톤 우수상 수상',
    description: '실시간 협업 도구 프로토타입 설계 및 프론트엔드 구현',
    skillTags: ['React', 'TypeScript'],
    competencyTags: ['주도성', '커뮤니케이션'],
    matchScore: 64,
  },
];
