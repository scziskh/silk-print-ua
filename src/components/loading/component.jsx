import styled, { keyframes } from 'styled-components';

const LoadingComponent = () => {
  return <StyledLoadingContainer />;
};

export default LoadingComponent;

const gradientAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const StyledLoadingContainer = styled.div`
  width: 100%;
  height: 100%;
  background: var(--contrastGrad);
  box-shadow: var(--lightShadow);
  background-size: 400% 400%;
  animation: ${gradientAnimation} 3s ease infinite;
`;
