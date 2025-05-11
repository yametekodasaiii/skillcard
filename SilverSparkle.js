import React from 'react';
import styled, { keyframes } from 'styled-components';

const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

const SilverSparkle = () => {
  return <ShimmerOverlay />;
};

const ShimmerOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  border-radius: inherit;
  background: linear-gradient(
    90deg,
    rgba(192, 192, 192, 0.1) 0%,
    rgba(255, 255, 255, 0.8) 25%,
    rgba(192, 192, 192, 0.1) 50%,
    rgba(255, 255, 255, 0.3) 75%,
    rgba(192, 192, 192, 0.1) 100%
  );
  background-size: 200% 100%;
  animation: ${shimmer} 4s linear infinite;
  opacity: 0.7;
`;

export default SilverSparkle; 