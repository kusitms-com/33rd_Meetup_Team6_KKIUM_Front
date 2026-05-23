import type { ExperienceCategory } from '@/app/(pages)/experience/_components/ExperienceCategoryTab';

export type ApplyMyExperienceItem = {
  id: string;
  type: Exclude<ExperienceCategory, 'all'>;
  title: string;
  period: string;
  skillTags: readonly string[];
  competencyTags: readonly string[];
};

export const applyMyExperienceMockData: readonly ApplyMyExperienceItem[] = [
  {
    id: '1',
    type: 'career',
    title: '토스페이먼츠 백엔드 인턴',
    period: '2025.07 ~ 2025.12',
    skillTags: ['Java', 'Spring', 'Kafka'],
    competencyTags: ['협업', '문제 해결'],
  },
  {
    id: '2',
    type: 'activity',
    title: '해커톤 우수상 수상',
    period: '2024.11 ~ 2024.11',
    skillTags: ['React', 'TypeScript'],
    competencyTags: ['주도성', '커뮤니케이션'],
  },
  {
    id: '3',
    type: 'education',
    title: '컴퓨터공학 전공 프로젝트',
    period: '2023.03 ~ 2023.12',
    skillTags: ['MySQL', 'Redis'],
    competencyTags: ['성장 마인드'],
  },
];
