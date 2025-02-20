import styled from 'styled-components';

const Container = ({ children }) => <Wrapper>{children}</Wrapper>;

export default Container;

const Wrapper = styled.div`
  position: relative;
  width: 1280px;
  margin: 0 auto;
  height: 100%;
  @media screen and (max-width: 1366px) {
    width: 1160px;
  }
  @media screen and (max-width: 1280px) {
    width: 968px;
  }
  @media screen and (max-width: 1024px) {
    width: 95%;
  }
`;
