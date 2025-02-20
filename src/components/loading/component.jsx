import styled from 'styled-components';

const LoadingComponent = () => {
  return <Component />;
};

export default LoadingComponent;

const Component = styled.div`
  width: 100%;
  height: 100%;
  background: var(--contrastGrad);
  box-shadow: var(--lightShadow);
  background-size: 400% 400%;
  animation: gradient 3s ease infinite;
`;
