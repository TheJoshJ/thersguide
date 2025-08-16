import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useRuneScape } from '../../contexts/RuneScapeContext';
import styles from './styles.module.css';

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

  const getStatusClass = () => {
    switch (status) {
      case 'loaded':
        return styles.loaded;
      case 'error':
        return styles.error;
      default:
        return '';
    }
  };

  return (
    <div className={styles.container}>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        className={`${styles.input} ${getStatusClass()}`}
        placeholder="Type username here..."
        aria-label="Enter Your Username"
      />
      {status !== 'idle' && (
        <div className={`${styles.statusText} ${getStatusClass()}`}>
          {getStatusText()}
        </div>
      )}
    </div>
  );
};

export default UserInput;
