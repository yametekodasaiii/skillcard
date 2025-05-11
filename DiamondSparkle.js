import React, { useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';

// Silver shimmer effect
const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

// Gold sparkle float effect
const float = keyframes`
  0%, 100% { transform: translateY(0) rotateZ(0); opacity: 0; }
  10% { opacity: 1; }
  50% { opacity: 0.7; }
  90% { opacity: 0.2; }
  100% { transform: translateY(-20px) rotateZ(180deg); opacity: 0; }
`;

const DiamondSparkle = () => {
  const containerRef = useRef(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const createSparkle = () => {
      const sparkle = document.createElement('div');
      sparkle.className = 'sparkle';
      sparkle.style.left = `${Math.random() * 100}%`;
      sparkle.style.top = `${Math.random() * 100}%`;
      sparkle.style.animationDuration = `${1 + Math.random()}s`;
      sparkle.style.animationDelay = `${Math.random() * 2}s`;
      
      container.appendChild(sparkle);
      
      setTimeout(() => {
        if (container.contains(sparkle)) {
          container.removeChild(sparkle);
        }
      }, 3000);
    };
    
    // Create initial sparkles - exactly 10 like in gold
    for (let i = 0; i < 10; i++) {
      createSparkle();
    }
    
    // Create new sparkles periodically - exactly 500ms like in gold
    const interval = setInterval(() => {
      createSparkle();
    }, 500);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <>
      {/* Silver effect */}
      <ShimmerOverlay />
      {/* Gold effect */}
      <SparkleContainer ref={containerRef} />
    </>
  );
};

// Silver effect component
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
    rgba(168, 224, 236, 0.1) 0%,
    rgba(255, 255, 255, 0.8) 25%,
    rgba(168, 224, 236, 0.1) 50%,
    rgba(255, 255, 255, 0.3) 75%,
    rgba(168, 224, 236, 0.1) 100%
  );
  background-size: 200% 100%;
  animation: ${shimmer} 4s linear infinite;
  opacity: 0.7;
  z-index: 1;
`;

// Sparkle effect component with blue-white colors
const SparkleContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  overflow: hidden;
  z-index: 2;
  
  .sparkle {
    position: absolute;
    width: 4px;
    height: 4px;
    background-color: #FFFFFF; /* Pure white for the sparkle center */
    border-radius: 50%;
    box-shadow: 0 0 8px rgba(140, 210, 245, 0.9); /* Blue-tinted shadow */
    animation: ${float} 2s linear forwards;
  }

  .sparkle::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(220, 240, 255, 0.9); /* Light blue-white glow */
    border-radius: 50%;
    filter: blur(1px);
  }
`;

export default DiamondSparkle; 