/*Libs*/
import styled from 'styled-components';

const DarkImage = ({ children }) => <Wrapper>{children}</Wrapper>;

export default DarkImage;

const Wrapper = styled.div`
  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: linear-gradient(to bottom, #1f2129 0%, #798696 100%);
    opacity: 0.7;
  }
`;
