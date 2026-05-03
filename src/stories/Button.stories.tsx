import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { PlusIcon } from '@/components/common/icons/PlusIcon';
import { Button } from '@/components/ui/button';

const meta = {
  title: 'Common/Button',
  component: Button,
  tags: ['autodocs'],
  args: {
    children: '경험 추가',
    variant: 'default',
    size: 'default',
    leftIcon: <PlusIcon />,
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'unselected'],
    },
    size: {
      control: 'select',
      options: ['default', 'medium', 'small', 'icon'],
    },
    disabled: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const StateMatrix: Story = {
  render: () => (
    <div className="flex flex-col gap-8 p-6">
      <ButtonRow title="Default">
        <Button leftIcon={<PlusIcon />}>경험 추가</Button>
        <Button className="bg-mint-main text-strong shadow-sm" leftIcon={<PlusIcon />}>
          경험 추가
        </Button>
        <Button className="bg-background-b text-on-fill shadow-focus-ring" leftIcon={<PlusIcon />}>
          경험 추가
        </Button>
        <Button disabled leftIcon={<PlusIcon />}>
          경험 추가
        </Button>
      </ButtonRow>

      <ButtonRow title="Secondary">
        <Button variant="secondary" leftIcon={<PlusIcon />}>
          경험 추가
        </Button>
        <Button variant="secondary" className="bg-gray-300 shadow-sm" leftIcon={<PlusIcon />}>
          경험 추가
        </Button>
        <Button
          variant="secondary"
          className="bg-gray-200 shadow-focus-ring"
          leftIcon={<PlusIcon />}
        >
          경험 추가
        </Button>
        <Button variant="secondary" disabled leftIcon={<PlusIcon />}>
          경험 추가
        </Button>
      </ButtonRow>

      <ButtonRow title="Sizes">
        <Button leftIcon={<PlusIcon />}>경험 추가</Button>
        <Button size="medium" leftIcon={<PlusIcon />}>
          경험 추가
        </Button>
        <Button variant="secondary" size="small" leftIcon={<PlusIcon />}>
          추가하기
        </Button>
      </ButtonRow>

      <ButtonRow title="Unselected">
        <Button variant="unselected" leftIcon={<PlusIcon />}>
          경험 추가
        </Button>
      </ButtonRow>
    </div>
  ),
};

function ButtonRow({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-3">
      <h3 className="body-3-bold text-secondary">{title}</h3>
      <div className="flex flex-wrap items-center gap-4">{children}</div>
    </section>
  );
}
