import React from 'react';
import { useRuneScape } from '../../contexts/RuneScapeContext';
import { css } from '@emotion/react';

interface InlineRequirementProps {
  children: string;
}

const requirementBaseStyles = css`
  display: inline;
  font-weight: 500;
  transition: all 0.2s ease;
  cursor: help;
  white-space: nowrap;
  position: relative;
  color: inherit;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }
`;

const requirementMetStyles = css`
  border: 2px solid #10b981;
  border-radius: 4px;
  padding: 2px 6px;
  background-color: rgba(16, 185, 129, 0.1);
  transition: all 0.2s ease-in-out;
`;

const requirementNotMetStyles = css`
  border: 2px solid #ef4444;
  border-radius: 4px;
  padding: 2px 6px;
  background-color: rgba(239, 68, 68, 0.1);
  transition: all 0.2s ease-in-out;
`;

const getRequirementStyles = (isMet: boolean | null) => {
  if (isMet === null) {
    return [requirementBaseStyles];
  }
  return [requirementBaseStyles, isMet ? requirementMetStyles : requirementNotMetStyles];
};

const InlineRequirement: React.FC<InlineRequirementProps> = ({ children }) => {
  const { username, playerStats, isLoading, error } = useRuneScape();

  // Parse the requirement text (e.g., "67 Firemaking" or "Dragon Slayer")
  const parseRequirement = (text: string) => {
    // Check if it's a skill requirement (e.g., "67 Firemaking")
    const skillMatch = text.match(/^(\d+)\s+([A-Za-z]+)$/);
    if (skillMatch) {
      return {
        type: 'skill' as const,
        level: parseInt(skillMatch[1]),
        skillName: skillMatch[2],
        displayText: text
      };
    }

    // Check if it's a quest requirement (e.g., "Dragon Slayer")
    // Look for common quest names or just treat as quest if no skill match
    return {
      type: 'quest' as const,
      level: 1,
      questName: text,
      displayText: text
    };
  };

  const requirement = parseRequirement(children);

  // If no username, just show the text normally
  if (!username) {
    return <span css={getRequirementStyles(null)}>{children}</span>;
  }

  // If loading, show with loading indicator
  if (isLoading) {
    return <span css={getRequirementStyles(null)}>{children}</span>;
  }

  // If error, show with error indicator
  if (error) {
    return <span css={getRequirementStyles(null)}>{children}</span>;
  }

  // If no player stats, show normally
  if (!playerStats) {
    return <span css={getRequirementStyles(null)}>{children}</span>;
  }

  // Check if requirement is met
  let isMet = false;
  let currentValue = 0;
  let requiredValue = requirement.level;

  if (requirement.type === 'skill') {
    const skill = playerStats.skills[requirement.skillName];
    if (skill) {
      currentValue = skill.level;
      isMet = skill.level >= requirement.level;
    }
  } else if (requirement.type === 'quest') {
    const quest = playerStats.quests.find(q => 
      q.title.toLowerCase() === requirement.questName.toLowerCase()
    );
    if (quest) {
      currentValue = quest.status === 'COMPLETED' ? 1 : 0;
      isMet = quest.status === 'COMPLETED';
    }
  }

  return (
    <span
      css={getRequirementStyles(isMet)}
      title={`${requirement.displayText}: ${isMet ? 'Requirement met' : 'Requirement not met'} (${currentValue}/${requiredValue})`}
    >
      {children}
    </span>
  );
};

// Named export for better compatibility
export { InlineRequirement };
// Default export
export default InlineRequirement;
