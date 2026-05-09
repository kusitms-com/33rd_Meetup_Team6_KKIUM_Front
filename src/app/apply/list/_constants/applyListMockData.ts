export type ApplyListItem = {
  id: string;
  title: string;
  companyName: string;
  jobField: string;
  period: string;
};

export const applyListMockData: ApplyListItem[] = [
  {
    id: '1',
    title: 'Frontend Developer 채용',
    companyName: '네이버',
    jobField: '프론트엔드 개발자',
    period: '2026.05.10 10:00~05.24 17:00',
  },
  {
    id: '2',
    title: 'Frontend Engineer Internship',
    companyName: '카카오',
    jobField: '프론트엔드 인턴',
    period: '2026.05.12 09:00~05.27 18:00',
  },
  {
    id: '3',
    title: 'Backend Engineer 채용',
    companyName: '쿠팡',
    jobField: '백엔드 개발자',
    period: '2026.05.12 09:00~05.26 18:00',
  },
  {
    id: '4',
    title: 'Product Manager 채용',
    companyName: '카카오',
    jobField: '기획자',
    period: '2026.04.01~04.28',
  },
  {
    id: '5',
    title: 'UI/UX Designer 채용',
    companyName: 'LINE',
    jobField: '디자이너',
    period: '2026.04.01~04.28',
  },
  {
    id: '6',
    title: 'Frontend Engineer 채용',
    companyName: '토스',
    jobField: '프론트엔드',
    period: '2026.04.01~04.28',
  },
  {
    id: '7',
    title: 'Backend Developer 채용',
    companyName: '당근마켓',
    jobField: '백엔드',
    period: '2026.04.01~04.28',
  },
  {
    id: '8',
    title: '서비스 기획 채용',
    companyName: '우아한형제들',
    jobField: '서비스 기획',
    period: '2026.04.01~04.28',
  },
  {
    id: '9',
    title: 'Product Designer 채용',
    companyName: '무신사',
    jobField: '프로덕트 디자이너',
    period: '2026.04.01~04.28',
  },
];
