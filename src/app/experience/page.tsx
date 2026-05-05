import { ExperienceBoard } from '@/app/experience/_components/ExperienceBoard';
import { ExperiencePageHeader } from '@/app/experience/_components/ExperiencePageHeader';
import { ExperienceTopBar } from '@/app/experience/_components/ExperienceTopBar';
import { experienceMockData } from '@/app/experience/_constants/experienceMockData';

export default function ExperiencePage() {
  return (
    <div className="mx-16 flex flex-col">
      <ExperienceTopBar />
      <div className="mt-5 flex flex-col gap-5">
        <ExperiencePageHeader />
        <ExperienceBoard experiences={experienceMockData} />
      </div>
    </div>
  );
}
