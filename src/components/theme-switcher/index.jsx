'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import styled from 'styled-components';
import { Check, Monitor, Moon, Sun } from 'lucide-react';
import { useTranslations } from 'next-intl';

const THEME_STORAGE_KEY = 'theme';
const THEME_EVENT = 'silk-theme-change';

function getThemeSnapshot() {
  if (typeof window === 'undefined') return 'system';
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === 'light' || stored === 'dark' || stored === 'system') {
      return stored;
    }
  } catch {
    // ignore storage access errors
  }
  return 'system';
}

function subscribeToTheme(callback) {
  if (typeof window === 'undefined') return () => {};
  const handleChange = () => callback();
  window.addEventListener('storage', handleChange);
  window.addEventListener(THEME_EVENT, handleChange);
  return () => {
    window.removeEventListener('storage', handleChange);
    window.removeEventListener(THEME_EVENT, handleChange);
  };
}

function applyThemePreference(mode) {
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, mode);
  } catch {
    // ignore storage write errors
  }

  if (mode === 'system') {
    delete document.documentElement.dataset.theme;
  } else {
    document.documentElement.dataset.theme = mode;
  }

  window.dispatchEvent(new Event(THEME_EVENT));
}

const THEME_OPTIONS = [
  { id: 'system', Icon: Monitor },
  { id: 'light', Icon: Sun },
  { id: 'dark', Icon: Moon },
];

const ThemeSwitcher = () => {
  const t = useTranslations('ThemeSwitcher');
  const theme = useSyncExternalStore(subscribeToTheme, getThemeSnapshot, () => 'system');
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const ActiveIcon = theme === 'dark' ? Moon : theme === 'light' ? Sun : Monitor;

  const handleSelect = (mode) => {
    applyThemePreference(mode);
    setIsOpen(false);
  };

  return (
    <Wrapper ref={wrapperRef}>
      <TriggerButton
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={`${t('label')}: ${t(theme)}`}
        title={`${t('label')}: ${t(theme)}`}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        $active={isOpen}
      >
        <ActiveIcon size={18} strokeWidth={1.9} />
      </TriggerButton>

      {isOpen && (
        <Menu role="menu" aria-label={t('label')}>
          {THEME_OPTIONS.map(({ id, Icon }) => {
            const isSelected = theme === id;
            return (
              <MenuItem key={id} type="button" role="menuitemradio" aria-checked={isSelected} $selected={isSelected} onClick={() => handleSelect(id)}>
                <ItemLabel>
                  <Icon size={16} strokeWidth={1.9} />
                  <span>{t(id)}</span>
                </ItemLabel>
                {isSelected && <Check size={15} strokeWidth={2.2} />}
              </MenuItem>
            );
          })}
        </Menu>
      )}
    </Wrapper>
  );
};

export default ThemeSwitcher;

const Wrapper = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
`;

const TriggerButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  border: 1px solid ${({ $active }) => ($active ? 'var(--secondaryColor)' : 'rgba(255, 255, 255, 0.16)')};
  background: ${({ $active }) => ($active ? 'rgba(212, 175, 55, 0.16)' : 'rgba(255, 255, 255, 0.06)')};
  color: ${({ $active }) => ($active ? 'var(--secondaryColor)' : '#f1f3f6')};
  cursor: pointer;
  transition:
    border-color 0.2s ease,
    background-color 0.2s ease,
    color 0.2s ease;

  &:hover {
    border-color: var(--secondaryColor);
    color: var(--secondaryColor);
    background: rgba(212, 175, 55, 0.12);
  }

  &:focus-visible {
    outline: 2px solid var(--secondaryColor);
    outline-offset: 2px;
  }
`;

const Menu = styled.div`
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  min-width: 172px;
  padding: 6px;
  border-radius: 10px;
  background: #1a1e28;
  border: 1px solid rgba(255, 255, 255, 0.14);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.45);
  display: flex;
  flex-direction: column;
  gap: 2px;
  z-index: 120;
`;

const MenuItem = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  width: 100%;
  padding: 9px 12px;
  border: none;
  border-radius: 7px;
  background: ${({ $selected }) => ($selected ? 'rgba(212, 175, 55, 0.16)' : 'transparent')};
  color: ${({ $selected }) => ($selected ? 'var(--secondaryColor)' : '#e5e7eb')};
  font-family: inherit;
  font-size: 0.9rem;
  font-weight: ${({ $selected }) => ($selected ? 600 : 500)};
  white-space: nowrap;
  cursor: pointer;
  transition:
    background-color 0.15s ease,
    color 0.15s ease;

  &:hover {
    background: ${({ $selected }) => ($selected ? 'rgba(212, 175, 55, 0.22)' : 'rgba(255, 255, 255, 0.08)')};
    color: ${({ $selected }) => ($selected ? 'var(--secondaryColor)' : '#ffffff')};
  }

  &:focus-visible {
    outline: 2px solid var(--secondaryColor);
    outline-offset: -2px;
  }
`;

const ItemLabel = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 10px;
`;
