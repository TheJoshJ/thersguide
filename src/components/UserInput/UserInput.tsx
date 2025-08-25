import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useRuneScape } from '../../contexts/RuneScapeContext';
import { css } from '@emotion/react';

const containerStyles = css`
  margin: 1rem 0;
  width: 50%;
  max-width: 300px;

  @media (max-width: 768px) {
    width: 100%;
    max-width: none;
  }
`;

const inputStyles = css`
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--ifm-color-emphasis-300);
  border-radius: 4px;
  font-size: 0.9rem;
  font-family: inherit;
  background: var(--ifm-background-color);
  color: var(--ifm-color-content);
  transition: border-color 0.2s ease;
  box-sizing: border-box;

  @media (max-width: 768px) {
    font-size: 16px; /* Prevents zoom on iOS */
  }

  &:focus {
    outline: none;
    border-color: var(--ifm-color-primary);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &[data-theme='dark'] {
    background: var(--ifm-background-color);
    border-color: var(--ifm-color-emphasis-400);
    color: var(--ifm-color-content);
  }
`;

const inputErrorStyles = css`
  border-color: var(--ifm-color-danger);
`;

const inputLoadingStyles = css`
  border-color: var(--ifm-color-warning);
`;

const statusTextStyles = css`
  font-size: 0.75rem;
  color: var(--ifm-color-emphasis-600);
  font-style: italic;
`;

const statusTextLoadedStyles = css`
  color: var(--ifm-color-success);
`;

const statusTextErrorStyles = css`
  color: var(--ifm-color-danger);
`;

const UserInput: React.FC = () => {
  const { setUsername, playerStats, isLoading, error, username } = useRuneScape();
  const [inputValue, setInputValue] = useState<string>('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'loaded' | 'error'>('idle');
  const debounceTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  // Load username from localStorage on component mount
  useEffect(() => {
    const savedUsername = localStorage.getItem('runescape-username');
    if (savedUsername) {
      setInputValue(savedUsername);
      setUsername(savedUsername);
    }
  }, [setUsername]);

  // Update input value when username changes externally (e.g., from localStorage)
  useEffect(() => {
    if (username && username !== inputValue) {
      setInputValue(username);
    }
  }, [username, inputValue]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setStatus('loading');

    // Clear existing timeout
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    // Set new timeout for debounced search
    debounceTimeoutRef.current = setTimeout(() => {
      if (value.trim()) {
        setUsername(value.trim());
      }
    }, 500); // Hardcoded 500ms debounce
  }, [setUsername]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      // Clear timeout and search immediately
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
      if (inputValue.trim()) {
        setUsername(inputValue.trim());
      }
    }
  }, [inputValue, setUsername]);

  // Update status based on context state
  useEffect(() => {
    if (error) {
      setStatus('error');
    } else if (playerStats) {
      setStatus('loaded');
    } else if (isLoading) {
      setStatus('loading');
    }
  }, [playerStats, isLoading, error]);

  const getStatusText = () => {
    switch (status) {
      case 'loaded':
        return 'Loaded';
      case 'loading':
        return 'Loading...';
      case 'error':
        if (error === 'NOT_A_MEMBER' || error === 'NO_PROFILE') {
          return 'Not found';
        }
        return error || 'Error';
      default:
        return '';
    }
  };

  const getInputStatusStyles = () => {
    switch (status) {
      case 'error':
        return inputErrorStyles;
      case 'loading':
        return inputLoadingStyles;
      default:
        return null;
    }
  };

  const getStatusTextStyles = () => {
    switch (status) {
      case 'loaded':
        return [statusTextStyles, statusTextLoadedStyles];
      case 'error':
        return [statusTextStyles, statusTextErrorStyles];
      default:
        return [statusTextStyles];
    }
  };

  return (
    <div css={containerStyles}>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        css={[inputStyles, getInputStatusStyles()]}
        placeholder="Type username here..."
        aria-label="Enter Your Username"
      />
      {status !== 'idle' && (
        <div css={getStatusTextStyles()}>
          {getStatusText()}
        </div>
      )}
    </div>
  );
};

export default UserInput;
