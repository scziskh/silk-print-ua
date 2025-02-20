'use client';

import styled from 'styled-components';

const AlterLayout = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

export default AlterLayout;

const Wrapper = styled.div`
  section:nth-child(even) {
    background: linear-gradient(60deg, rgba(240, 242, 245, 1) 0%, rgba(230, 230, 232, 1) 100%);
  }
`;
