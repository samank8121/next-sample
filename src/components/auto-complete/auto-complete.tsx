'use client';
import React, { useState, ChangeEvent, useRef, useEffect } from 'react';
import styles from './auto-complete.module.css';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';

interface AutocompleteProps<T> {
  suggestions: T[];
  onSuggestionSelected: (suggestion: T) => void;
  renderSuggestion: (suggestion: T) => string;
  filterSuggestions: (suggestion: T, inputValue: string) => boolean;
}

const Autocomplete = <T extends object>({
  suggestions,
  onSuggestionSelected,
  renderSuggestion,
  filterSuggestions,
}: AutocompleteProps<T>) => {
  const [filteredSuggestions, setFilteredSuggestions] = useState<T[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState<number>(0);
  
  const t = useTranslations('Autocomplete');
  const inputRef = useRef<HTMLInputElement | null>(null);
  const suggestionsRef= useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        (inputRef.current &&
        !inputRef.current.contains(event.target as Node))
        && (suggestionsRef.current &&
          !suggestionsRef.current.contains(event.target as Node))
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const userInput = e.currentTarget.value;
    setInputValue(userInput);

    const filtered = suggestions.filter((suggestion) =>
      filterSuggestions(suggestion, userInput)
    );
    setFilteredSuggestions(filtered);
    setShowSuggestions(true);
    setActiveSuggestionIndex(0);
  };

  const handleSuggestionClick = (suggestion: T) => {
    onSuggestionSelected(suggestion);
    setInputValue(renderSuggestion(suggestion));
    setFilteredSuggestions([]);
    setShowSuggestions(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      setActiveSuggestionIndex((prevIndex) =>
        prevIndex < filteredSuggestions.length - 1 ? prevIndex + 1 : prevIndex
      );
    } else if (e.key === 'ArrowUp') {
      setActiveSuggestionIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : prevIndex
      );
    } else if (e.key === 'Enter') {
      const selectedSuggestion = filteredSuggestions[activeSuggestionIndex];
      onSuggestionSelected(selectedSuggestion);
      setInputValue(renderSuggestion(selectedSuggestion));
      setFilteredSuggestions([]);
      setShowSuggestions(false);
    }
  };

  return (
    <div className={styles.autocomplete}>
      <input
        ref={inputRef}
        type='text'
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder={t('placeholder')}
        style={{ width: '100%' }}
      />
      <div
        ref={suggestionsRef}
        className={clsx(styles.suggestions, {
          [styles.show]: showSuggestions && inputValue,
        })}        
      >
        {filteredSuggestions.length ? (
          filteredSuggestions.map((suggestion, index) => (
            <div
              key={index}
              className={clsx(styles.suggestionItem, {
                [styles.active]: index === activeSuggestionIndex,
              })}
              onClick={() => {
                handleSuggestionClick(suggestion);
              }}
            >
              {renderSuggestion(suggestion)}
            </div>
          ))
        ) : (
          <div className={styles.suggestionItem}>{t('noSuggestion')}</div>
        )}
      </div>
    </div>
  );
};

export default Autocomplete;
