import React from 'react';
import { useRuneScape } from '../../contexts/RuneScapeContext';
import { css } from '@emotion/react';

interface Requirement {
  name: string;
  type: 'skill' | 'combat' | 'quest' | 'questPoints';
  level: number;
  skillName?: string; // For skill requirements
  questName?: string; // For quest requirements
}

interface RequirementsCheckerProps {
  title: string;
  description?: string;
  children: React.ReactNode; // Accept any React children, we'll convert to string
}

const containerStyles = css`
  margin: 1rem 0;
  padding: 1rem;
  border: 1px solid var(--ifm-color-emphasis-300);
  border-radius: 6px;
  background: var(--ifm-background-surface-color);

  @media (max-width: 768px) {
    padding: 0.75rem;
  }

  [data-theme='dark'] & {
    border-color: var(--ifm-color-emphasis-400);
    background: var(--ifm-background-surface-color);
  }
`;

const titleStyles = css`
  margin: 0 0 0.5rem 0;
  color: var(--ifm-color-primary);
  font-size: 1.1rem;
  font-weight: 600;
`;

const descriptionStyles = css`
  margin: 0 0 0.75rem 0;
  color: var(--ifm-color-emphasis-700);
  font-size: 0.85rem;
  line-height: 1.4;
`;

const requirementsListStyles = css`
  margin: 0.75rem 0;
`;

const requirementBaseStyles = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0.75rem;
  margin: 0.25rem 0;
  border-radius: 4px;
  font-size: 0.9rem;
  transition: all 0.2s ease;
  border: 2px solid transparent;
  background-color: transparent;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.25rem;
    text-align: center;
    padding: 0.5rem;
  }
`;

const requirementMetStyles = css`
  border-color: var(--ifm-color-success);
  background-color: rgba(16, 185, 129, 0.1);

  [data-theme='dark'] & {
    background-color: rgba(16, 185, 129, 0.15);
  }
`;

const requirementNotMetStyles = css`
  border-color: var(--ifm-color-warning);
  background-color: rgba(239, 68, 68, 0.1);

  [data-theme='dark'] & {
    background-color: rgba(239, 68, 68, 0.15);
  }
`;

const requirementNeutralStyles = css`
  border-color: var(--ifm-color-emphasis-400);
  background-color: rgba(156, 163, 175, 0.1);
  opacity: 0.8;
`;

const requirementNameStyles = css`
  font-weight: 500;
  color: var(--ifm-color-content);
  flex: 1;
`;

const requirementLevelStyles = css`
  font-weight: 600;
  color: var(--ifm-color-primary);
  margin: 0 0.75rem;
  min-width: 30px;
  text-align: center;
  font-size: 0.85rem;

  @media (max-width: 768px) {
    margin: 0;
  }
`;

const summaryBaseStyles = css`
  margin-top: 1rem;
  padding: 0.75rem;
  border-radius: 4px;
  text-align: center;
  font-size: 0.95rem;
  border: 2px solid transparent;
  background-color: transparent;
`;

const summaryAllMetStyles = css`
  border-color: var(--ifm-color-success);
  background-color: rgba(16, 185, 129, 0.1);
  color: var(--ifm-color-success-darkest);

  [data-theme='dark'] & {
    background-color: rgba(16, 185, 129, 0.15);
  }
`;

const summaryNotAllMetStyles = css`
  border-color: var(--ifm-color-warning);
  background-color: rgba(239, 68, 68, 0.1);
  color: var(--ifm-color-warning-darkest);

  [data-theme='dark'] & {
    background-color: rgba(239, 68, 68, 0.15);
  }
`;

const noteStyles = css`
  margin-top: 0.5rem;
  padding: 0.25rem 0.5rem;
  text-align: center;
  color: var(--ifm-color-emphasis-500);
  font-size: 0.75rem;
  font-style: italic;
  opacity: 0.8;
`;

const getRequirementStyles = (met: boolean, neutral: boolean = false) => {
  if (neutral) {
    return [requirementBaseStyles, requirementNeutralStyles];
  }
  return [requirementBaseStyles, met ? requirementMetStyles : requirementNotMetStyles];
};

const getSummaryStyles = (allMet: boolean) => {
  return [summaryBaseStyles, allMet ? summaryAllMetStyles : summaryNotAllMetStyles];
};

const RequirementsChecker: React.FC<RequirementsCheckerProps> = ({
  title,
  description,
  children
}) => {
  const { username, playerStats, isLoading, error } = useRuneScape();

  // Extract text content from React children
  const extractTextFromChildren = (children: React.ReactNode): string => {
    if (typeof children === 'string') {
      return children;
    }
    if (typeof children === 'number') {
      return String(children);
    }
    if (Array.isArray(children)) {
      return children.map(extractTextFromChildren).join('');
    }
    if (children && typeof children === 'object' && 'props' in children) {
      // Handle React elements by extracting text from their children
      const reactElement = children as { props: { children?: React.ReactNode } };
      return extractTextFromChildren(reactElement.props.children);
    }
    return '';
  };

  // Parse comma-separated text into requirements
  const parseRequirements = (text: string): Requirement[] => {
    // Ensure we have a string to work with
    const textString = String(text || '');
    
    return textString
      .split(',')
      .map(item => item.trim())
      .filter(item => item.length > 0)
      .map(item => {
        // Check if it's a skill requirement (number + skill name)
        const skillMatch = item.match(/^(\d+)\s+(.+)$/);
        if (skillMatch) {
          const level = parseInt(skillMatch[1]);
          const skillName = skillMatch[2];
          return {
            name: skillName,
            type: 'skill' as const,
            level,
            skillName
          };
        }

        // Check if it's a combat requirement (number + "Combat")
        if (item.toLowerCase().includes('combat')) {
          const combatMatch = item.match(/(\d+)/);
          if (combatMatch) {
            return {
              name: 'Combat Level',
              type: 'combat' as const,
              level: parseInt(combatMatch[1])
            };
          }
        }

        // Default to quest requirement (no number = quest)
        return {
          name: item,
          type: 'quest' as const,
          level: 1,
          questName: item
        };
      });
  };

  const requirements = parseRequirements(extractTextFromChildren(children));

  if (!username) {
    return (
      <div css={containerStyles}>
        <h3 css={titleStyles}>{title}</h3>
        {description && <p css={descriptionStyles}>{description}</p>}
        <div css={noteStyles}>
          <p>Enter username to check requirements</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div css={containerStyles}>
        <h3 css={titleStyles}>{title}</h3>
        {description && <p css={descriptionStyles}>{description}</p>}
        <div css={noteStyles}>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div css={containerStyles}>
        <h3 css={titleStyles}>{title}</h3>
        {description && <p css={descriptionStyles}>{description}</p>}

        {/* Show requirements neutrally even with error */}
        <div css={requirementsListStyles}>
          {requirements.map((requirement, index) => (
            <div
              key={index}
              css={getRequirementStyles(false, true)}
            >
              <span css={requirementNameStyles}>{requirement.name}:</span>
              <span css={requirementLevelStyles}>
                {requirement.type === 'quest' ?
                  'Unknown' :
                  requirement.level
                }
              </span>
            </div>
          ))}
        </div>

        <div css={noteStyles}>
          Unable to fetch user data
        </div>
      </div>
    );
  }

  if (!playerStats) {
    return (
      <div css={containerStyles}>
        <h3 css={titleStyles}>{title}</h3>
        {description && <p css={descriptionStyles}>{description}</p>}

        {/* Show requirements neutrally without data */}
        <div css={requirementsListStyles}>
          {requirements.map((requirement, index) => (
            <div
              key={index}
              css={getRequirementStyles(false, true)}
            >
              <span css={requirementNameStyles}>{requirement.name}:</span>
              <span css={requirementLevelStyles}>
                {requirement.type === 'quest' ?
                  'Unknown' :
                  requirement.level
                }
              </span>
            </div>
          ))}
        </div>

        <div css={noteStyles}>
          Enter username to check requirements
        </div>
      </div>
    );
  }

  const checkRequirement = (requirement: Requirement): { met: boolean; current: number; required: number; details?: string } => {
    switch (requirement.type) {
      case 'skill':
        if (requirement.skillName) {
          const skill = playerStats.skills[requirement.skillName];
          return {
            met: skill ? skill.level >= requirement.level : false,
            current: skill ? skill.level : 0,
            required: requirement.level
          };
        }
        break;
      case 'combat':
        return {
          met: playerStats.combatLevel >= requirement.level,
          current: playerStats.combatLevel,
          required: requirement.level
        };
      case 'questPoints':
        return {
          met: playerStats.questPoints >= requirement.level,
          current: playerStats.questPoints,
          required: requirement.level
        };
      case 'quest':
        if (requirement.questName) {
          const quest = playerStats.quests.find(q => 
            q.title.toLowerCase() === requirement.questName!.toLowerCase()
          );
          if (quest) {
            return {
              met: quest.status === 'COMPLETED',
              current: quest.status === 'COMPLETED' ? 1 : 0,
              required: 1,
              details: quest.status === 'COMPLETED' ? 'Completed' : 
                      quest.status === 'STARTED' ? 'In Progress' : 'Not Started'
            };
          }
        }
        break;
    }
    return { met: false, current: 0, required: requirement.level };
  };

  const allRequirementsMet = requirements.every(req => checkRequirement(req).met);

  return (
    <div css={containerStyles}>
      <h3 css={titleStyles}>{title}</h3>
      {description && <p css={descriptionStyles}>{description}</p>}

      <div css={requirementsListStyles}>
        {requirements.map((requirement, index) => {
          const result = checkRequirement(requirement);
          return (
            <div
              key={index}
              css={getRequirementStyles(result.met)}
            >
              <span css={requirementNameStyles}>{requirement.name}:</span>
              <span css={requirementLevelStyles}>
                {requirement.type === 'quest' ?
                  (result.details || 'Not Found') :
                  result.met ?
                    requirement.level :
                    `${requirement.level} (${result.current})`
                }
              </span>
            </div>
          );
        })}
      </div>

      <div css={getSummaryStyles(allRequirementsMet)}>
        <strong>
          {allRequirementsMet
            ? 'All requirements met!'
            : 'Some requirements not met'}
        </strong>
      </div>
    </div>
  );
};

export default RequirementsChecker;
