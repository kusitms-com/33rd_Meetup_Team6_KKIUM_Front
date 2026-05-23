'use client';

import { applyMyExperienceMockData } from '../_constants/applyMyExperienceMockData';
import { ApplySectionHeader } from './ApplySectionHeader';
import { ExperienceMatchCard } from './ExperienceMatchCard';

export function ApplyMyExperience() {
  return (
    <aside className="flex h-full w-full min-w-0 flex-col gap-5">
      <ApplySectionHeader title="내 경험" />

      <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto pr-1">
        {applyMyExperienceMockData.map((experience) => (
          <ExperienceMatchCard
            key={experience.id}
            type={experience.type}
            title={experience.title}
            description={experience.description}
            skillTags={experience.skillTags}
            competencyTags={experience.competencyTags}
            matchScore={experience.matchScore}
          />
        ))}
      </div>
    </aside>
  );
}
