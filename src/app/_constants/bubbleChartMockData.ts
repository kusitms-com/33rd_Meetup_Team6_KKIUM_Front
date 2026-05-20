export type BubbleChartItem = {
  label: string;
  percent: number;
  /** chart canvas x position (0~288) */
  x: number;
  /** chart canvas y position (0~224, top-origin) */
  y: number;
  /** bubble diameter in px */
  size: number;
  tone: 'mint' | 'gray600' | 'gray300' | 'gray200';
};

export const bubbleChartMockData: BubbleChartItem[] = [
  { label: '학내외활동', percent: 36, x: 103, y: 84, size: 160, tone: 'mint' },
  { label: '인턴', percent: 22, x: 206, y: 162, size: 96, tone: 'gray600' },
  { label: '수강/교육', percent: 13, x: 34, y: 172, size: 64, tone: 'gray200' },
  { label: '기타', percent: 13, x: 224, y: 67, size: 80, tone: 'gray300' },
];
