import React from 'react';
import styled, { keyframes } from 'styled-components';

const rotateAnimation = keyframes`
  0% {
    background-position: 0% 0%;
  }
  100% {
    background-position: 100% 100%;
  }
`;

const Pattern = () => {
  return (
    <StyledWrapper>
      <div className="container" />
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  overflow: hidden;
  
  .container {
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #007541 0%, #005530 100%);
    animation: ${rotateAnimation} 30s linear infinite;
  }
`;

export default Pattern; 