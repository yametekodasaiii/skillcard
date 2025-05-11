import React, { useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';

const float = keyframes`
  0%, 100% { transform: translateY(0) rotateZ(0); opacity: 0; }
  10% { opacity: 1; }
  50% { opacity: 0.7; }
  90% { opacity: 0.2; }
  100% { transform: translateY(-20px) rotateZ(180deg); opacity: 0; }
`;

const GoldSparkle = () => {
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
    
    // Create initial sparkles
    for (let i = 0; i < 10; i++) {
      createSparkle();
    }
    
    // Create new sparkles periodically
    const interval = setInterval(() => {
      createSparkle();
    }, 500);
    
    return () => clearInterval(interval);
  }, []);
  
  return <SparkleContainer ref={containerRef} />;
};

const SparkleContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  overflow: hidden;
  
  .sparkle {
    position: absolute;
    width: 4px;
    height: 4px;
    background-color: #FFD700;
    border-radius: 50%;
    box-shadow: 0 0 8px rgba(255, 215, 0, 0.8);
    animation: ${float} 2s linear forwards;
  }

  .sparkle::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 50%;
    filter: blur(1px);
  }
`;

export default GoldSparkle; 