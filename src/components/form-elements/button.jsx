'use client';

import { forwardRef } from 'react';
import styled from 'styled-components';

const Button = forwardRef(({ children, label, type = 'button', ...props }, ref) => {
  return (
    <StyledButton ref={ref} type={type} {...props}>
      {children || label}
    </StyledButton>
  );
});

Button.displayName = 'Button';

export default Button;

const StyledButton = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  margin: 15px 0;
  padding: 14px 20px;

  font-size: 1em;
  font-weight: normal;

  background-color: transparent;
  color: inherit;

  border-style: solid;
  border-width: 2px;
  border-image-source: var(--secondaryGrad);
  border-image-slice: 2;

  cursor: pointer;

  transition: background-color var(--transitionDuration, 0.3s) ease;

  &:hover,
  &:focus-visible {
    color: var(--contrastColor);
    text-shadow: var(--darkShadow);
    background: var(--secondaryGrad);
    border-image-source: none;
    border-color: transparent;
    outline: none;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    background: var(--lightColor);
    color: #ccc;
    text-shadow: none;
    border-image-source: none;
    border-color: #ccc;
    pointer-events: none;
  }
`;
