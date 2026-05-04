import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { DetailInput } from '@/components/common/DetailInput';

const meta = {
  title: 'Common/DetailInput',
  component: DetailInput,
  tags: ['autodocs'],
  args: {
    defaultValue: '빠르게 변화하는 비즈니스 요구사항으로 인해 코드 복잡도 급증',
  },
  decorators: [
    (Story) => (
      <div className="w-[452px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DetailInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
