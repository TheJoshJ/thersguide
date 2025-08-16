import React from 'react';
import { useRuneScape } from '../../contexts/RuneScapeContext';
import styles from './styles.module.css';

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
      <div className={styles.container}>
        <h3 className={styles.title}>{title}</h3>
        {description && <p className={styles.description}>{description}</p>}
        <div className={styles.noUsername}>
          <p>Enter username to check requirements</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={styles.container}>
        <h3 className={styles.title}>{title}</h3>
        {description && <p className={styles.description}>{description}</p>}
        <div className={styles.loading}>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <h3 className={styles.title}>{title}</h3>
        {description && <p className={styles.description}>{description}</p>}
        
        {/* Show requirements neutrally even with error */}
        <div className={styles.requirementsList}>
          {requirements.map((requirement, index) => (
            <div 
              key={index} 
              className={`${styles.requirement} ${styles.neutralState}`}
            >
              <span className={styles.requirementName}>{requirement.name}:</span>
              <span className={styles.requirementLevel}>
                {requirement.type === 'quest' ? 
                  'Unknown' : 
                  requirement.level
                }
              </span>
            </div>
          ))}
        </div>
        
        <div className={styles.errorNote}>
          Unable to fetch user data
        </div>
      </div>
    );
  }

  if (!playerStats) {
    return (
      <div className={styles.container}>
        <h3 className={styles.title}>{title}</h3>
        {description && <p className={styles.description}>{description}</p>}
        
        {/* Show requirements neutrally without data */}
        <div className={styles.requirementsList}>
          {requirements.map((requirement, index) => (
            <div 
              key={index} 
              className={`${styles.requirement} ${styles.neutralState}`}
            >
              <span className={styles.requirementName}>{requirement.name}:</span>
              <span className={styles.requirementLevel}>
                {requirement.type === 'quest' ? 
                  'Unknown' : 
                  requirement.level
                }
              </span>
            </div>
          ))}
        </div>
        
        <div className={styles.noDataNote}>
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
    <div className={styles.container}>
      <h3 className={styles.title}>{title}</h3>
      {description && <p className={styles.description}>{description}</p>}
      
      <div className={styles.requirementsList}>
        {requirements.map((requirement, index) => {
          const result = checkRequirement(requirement);
          return (
            <div 
              key={index} 
              className={`${styles.requirement} ${result.met ? styles.met : styles.notMet}`}
            >
              <span className={styles.requirementName}>{requirement.name}:</span>
              <span className={styles.requirementLevel}>
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

      <div className={`${styles.summary} ${allRequirementsMet ? styles.allMet : styles.notAllMet}`}>
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
