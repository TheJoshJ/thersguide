import React, { createContext, useContext, useState, useEffect, ReactNode, useRef } from 'react';

// Types for RuneScape data from RS3PD API
interface Skill {
  level: number;
  xp: number;
  rank: number;
  id: number;
}

interface Quest {
  title: string;
  status: 'COMPLETED' | 'NOT_STARTED' | 'STARTED';
  difficulty: number;
  members: boolean;
  questPoints: number;
  userEligible: boolean;
}

interface PlayerStats {
  name: string;
  combatLevel: number;
  totalLevel: number;
  totalXp: number;
  rank: string;
  questPoints: number;
  questsCompleted: number;
  questsStarted: number;
  questsNotStarted: number;
  skills: Record<string, Skill>;
  quests: Quest[];
  loggedIn: boolean;
}

interface RuneScapeContextType {
  username: string | null;
  playerStats: PlayerStats | null;
  isLoading: boolean;
  error: string | null;
  setUsername: (username: string) => void;
  refreshStats: () => Promise<void>;
  clearData: () => void;
}

const RuneScapeContext = createContext<RuneScapeContextType | undefined>(undefined);

interface RuneScapeProviderProps {
  children: ReactNode;
}

export const RuneScapeProvider: React.FC<RuneScapeProviderProps> = ({ children }) => {
  const [username, setUsernameState] = useState<string | null>(null);
  const [playerStats, setPlayerStats] = useState<PlayerStats | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const apiCallTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Load username from localStorage on mount
  useEffect(() => {
    const savedUsername = localStorage.getItem('rs_username');
    if (savedUsername) {
      setUsernameState(savedUsername);
    }
  }, []);

  // Fetch player stats when username changes
  useEffect(() => {
    if (username) {
      // Clear any existing timeout
      if (apiCallTimeoutRef.current) {
        clearTimeout(apiCallTimeoutRef.current);
      }
      
      // Add a small delay to prevent rapid successive calls
      apiCallTimeoutRef.current = setTimeout(() => {
        refreshStats();
      }, 100);
    }
  }, [username]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (apiCallTimeoutRef.current) {
        clearTimeout(apiCallTimeoutRef.current);
      }
    };
  }, []);

  const setUsername = (newUsername: string) => {
    const trimmedUsername = newUsername.trim();
    if (trimmedUsername) {
      setUsernameState(trimmedUsername);
      localStorage.setItem('rs_username', trimmedUsername);
      setError(null); // Clear any previous errors
    }
  };

  const refreshStats = async () => {
    if (!username) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.rs3pd.com/api/v1/player-data?username=${encodeURIComponent(username)}&quests=true`,
        {
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
          }
        }
      );
      
      console.log(`API Response Status: ${response.status} ${response.statusText}`);
      console.log(`Response Headers:`, {
        'content-type': response.headers.get('content-type'),
        'cache-control': response.headers.get('cache-control'),
        'etag': response.headers.get('etag'),
        'last-modified': response.headers.get('last-modified')
      });
      
      if (!response.ok) {
        // Handle different error status codes
        if (response.status === 404) {
          throw new Error(`Player not found: ${username}`);
        } else if (response.status === 429) {
          throw new Error('Rate limit exceeded. Please wait a moment and try again.');
        } else {
          throw new Error(`API error: ${response.status} ${response.statusText}`);
        }
      }

      const data = await response.json();
      console.log(`API Response Data:`, data);
      
      if (data.error) {
        throw new Error(data.error);
      }

      const stats = parseRS3PDData(data);
      console.log(`Parsed Stats:`, stats);
      setPlayerStats(stats);
    } catch (err) {
      console.error(`Error fetching stats:`, err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch player data';
      setError(errorMessage);
      setPlayerStats(null);
    } finally {
      setIsLoading(false);
    }
  };

  const clearData = () => {
    setUsernameState(null);
    setPlayerStats(null);
    setError(null);
    localStorage.removeItem('rs_username');
    
    // Clear any pending API call timeout
    if (apiCallTimeoutRef.current) {
      clearTimeout(apiCallTimeoutRef.current);
      apiCallTimeoutRef.current = null;
    }
  };

  const value: RuneScapeContextType = {
    username,
    playerStats,
    isLoading,
    error,
    setUsername,
    refreshStats,
    clearData,
  };

  return (
    <RuneScapeContext.Provider value={value}>
      {children}
    </RuneScapeContext.Provider>
  );
};

// Custom hook to use the context
export const useRuneScape = (): RuneScapeContextType => {
  const context = useContext(RuneScapeContext);
  if (context === undefined) {
    throw new Error('useRuneScape must be used within a RuneScapeProvider');
  }
  return context;
};

// Helper function to parse RS3PD API data
function parseRS3PDData(data: any): PlayerStats {
  // Map skill IDs to names
  const skillMap: Record<number, string> = {
    0: 'Overall',
    1: 'Attack',
    2: 'Defence',
    3: 'Strength',
    4: 'Constitution',
    5: 'Ranged',
    6: 'Prayer',
    7: 'Magic',
    8: 'Cooking',
    9: 'Woodcutting',
    10: 'Fletching',
    11: 'Fishing',
    12: 'Firemaking',
    13: 'Crafting',
    14: 'Smithing',
    15: 'Mining',
    16: 'Herblore',
    17: 'Agility',
    18: 'Thieving',
    19: 'Slayer',
    20: 'Farming',
    21: 'Runecrafting',
    22: 'Hunter',
    23: 'Construction',
    24: 'Summoning',
    25: 'Dungeoneering',
    26: 'Divination',
    27: 'Invention',
    28: 'Archaeology'
  };

  // Parse skills
  const skills: Record<string, Skill> = {};
  if (data.skillvalues) {
    data.skillvalues.forEach((skill: any) => {
      const skillName = skillMap[skill.id];
      if (skillName) {
        skills[skillName] = {
          level: skill.level,
          xp: skill.xp,
          rank: skill.rank,
          id: skill.id
        };
      }
    });
  }

  // Calculate quest points from completed quests
  const questPoints = data.quests ? data.quests
    .filter((q: Quest) => q.status === 'COMPLETED')
    .reduce((sum: number, q: Quest) => sum + q.questPoints, 0) : 0;

  return {
    name: data.name || 'Unknown',
    combatLevel: data.combatlevel || 1,
    totalLevel: data.totalskill || 0,
    totalXp: data.totalxp || 0,
    rank: data.rank || 'Unknown',
    questPoints,
    questsCompleted: data.questscomplete || 0,
    questsStarted: data.questsstarted || 0,
    questsNotStarted: data.questsnotstarted || 0,
    skills,
    quests: data.quests || [],
    loggedIn: data.loggedIn === 'true'
  };
}
