'use client';

import styled from 'styled-components';

const Button = (props) => {
  return <Wrapper>{props.label}</Wrapper>;
};

export default Button;

const Wrapper = styled.button`
  margin: 15px 0;
  font-size: 1em;
  padding: 14px 20px;
  width: 200px;
  text-align: center;
  border-image-source: var(--secondaryGrad);
  background-color: inherit;
  border-style: solid;
  border-image-slice: 2;
  border-width: 2px;
  font-weight: normal;
  cursor: pointer;
  &:hover {
    color: var(--contrastColor);
    text-shadow: var(--darkShadow);
    background: var(--secondaryGrad);
  }
`;
