import React, { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import styled, { keyframes } from 'styled-components';

// Animations
const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.7;
  }
`;

const progressGlow = keyframes`
  0%, 100% {
    opacity: 1;
    box-shadow: 0 0 15px rgba(0, 165, 80, 0.3);
  }
  50% {
    opacity: 0.8;
    box-shadow: 0 0 25px rgba(0, 165, 80, 0.5);
  }
`;

const particleFlow = keyframes`
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 100% 0;
  }
`;

// Styled components
const ProgressWrapper = styled.div`
  position: relative;
  height: 20px;
  background: rgba(230, 230, 230, 0.2);
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 4px;
  border: 1px solid rgba(0, 100, 0, 0.1);
`;

const ProgressBar = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const ProgressLine = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: ${props => props.percentage || '0%'};
  background: linear-gradient(
    90deg,
    #006622,
    #FFCC00
  );
  border-radius: 10px;
  animation: ${progressGlow} 2s infinite;
`;

const ProgressParticles = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: radial-gradient(
    circle at center,
    rgba(255, 255, 255, 0.3) 1px,
    transparent 1px
  );
  background-size: 6px 6px;
  animation: ${particleFlow} 20s linear infinite;
`;

const SkillHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2px;
`;

const SkillLabel = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: ${props => props.color || '#006622'};
`;

const StatusIndicator = styled.span`
  display: inline-block;
  width: 6px;
  height: 6px;
  background: #00a550;
  border-radius: 50%;
  margin-right: 6px;
  animation: ${pulse} 2s infinite ease-in-out;
`;

const ProgressSkillBar = ({ label, level, color = '#006622' }) => {
  const percentage = Math.min(Math.max((level / 5) * 100, 0), 100);
  
  return (
    <div className="mb-2">
      <SkillHeader>
        <SkillLabel color={color}>
          {label}
        </SkillLabel>
        <div className="text-xs font-medium text-gray-600">{Math.round(percentage)}%</div>
      </SkillHeader>
      
      <ProgressWrapper>
        <ProgressBar 
          role="progressbar"
          aria-valuemin="0"
          aria-valuemax="100"
          aria-valuenow={percentage}
        >
          <ProgressLine percentage={`${percentage}%`} />
          <ProgressParticles />
        </ProgressBar>
      </ProgressWrapper>
    </div>
  );
};

export default ProgressSkillBar; 