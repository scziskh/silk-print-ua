'use client';

/*Libs*/
import { Link } from '@/i18n/routing';
import styled from 'styled-components';

const MenuLink = (props) => (
  <Wrapper>
    <Link href={props.href}>{props.label}</Link>
  </Wrapper>
);

export default MenuLink;

const Wrapper = styled.li`
  a {
    display: block;
    text-decoration: none;
    text-align: center;
    white-space: nowrap;
    &::after {
      content: '';
      display: block;
      height: 2px;
      margin-top: 5px;
      background: var(--secondaryGrad);
      width: 100%;
      transform: translateY(5px);
      opacity: 0;
      transition-duration: var(--transitionDuration);
    }
    &:hover:after {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;
