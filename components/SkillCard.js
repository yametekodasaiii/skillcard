import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import SkillBar from './SkillBar';
import MaxedSkillBar from './MaxedSkillBar';
import Pattern from './Pattern';
import GoldSparkle from './GoldSparkle';
import DiamondSparkle from './DiamondSparkle';
import SilverSparkle from './SilverSparkle';
import ProgressSkillBar from './ProgressSkillBar';
import styled, { keyframes } from 'styled-components';

// Scroll animation for seamless text scrolling
const scroll = keyframes`
  to {
    transform: translateX(calc(-100% - var(--gap)));
  }
`;

// Styled components for ticker effect
const TextTicker = styled.div`
  position: absolute;
  left: 0;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  user-select: none;
  top: ${props => props.top || '20%'};
  z-index: 0;
  
  --gap: 20px;
  display: flex;
  gap: var(--gap);
  
  &:hover {
    animation-play-state: paused;
  }
`;

const TextList = styled.div`
  flex-shrink: 0;
  min-width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: var(--gap);
  animation: ${scroll} ${props => props.duration || '20s'} linear infinite;
`;

const TextItem = styled.div`
  color: white;
  font-weight: 900;
  font-size: ${props => props.fontSize || '32px'};
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  opacity: 0.75;
  letter-spacing: 0.5px;
`;

const SkillCard = ({ userData }) => {
  const { name, section, photo, skills, awards, robotBuilds, contributions, quote } = userData;
  const starsRef = useRef(null);
  
  // Use contributions and robot builds as background text items
  const backgroundTextItems = [
    ...(contributions || ['SOCMED WRITER', 'PROGRAMMER']),
    ...(robotBuilds || ['RFID SYSTEM', 'MEMORY GAME'])
  ];
  
  // Reorder awards to have silver first
  const orderedAwards = [
    awards.find(award => award.type === "silver"),
    awards.find(award => award.type === "gold"),
    awards.find(award => award.type === "diamond")
  ].filter(Boolean);
  
  // Add sparkle effects to the stars
  useEffect(() => {
    if (!starsRef.current) return;
    
    const interval = setInterval(() => {
      const randomSize = Math.random() * 10 + 5;
      const randomOpacity = Math.random() * 0.5 + 0.3;
      
      starsRef.current.style.textShadow = `0 0 ${randomSize}px rgba(255, 209, 0, ${randomOpacity})`;
    }, 300);
    
    return () => clearInterval(interval);
  }, []);
  
  // Function to determine animation delay for list items
  const getAnimationDelay = (index) => {
    return { delay: 1 + (index * 0.2) };
  };
  
  // Handle award flash animation
  const [flashingAward, setFlashingAward] = useState(null);
  
  const handleAwardClick = (index) => {
    setFlashingAward(index);
    setTimeout(() => setFlashingAward(null), 700);
  };

  // Render the appropriate medal with its effects
  const renderMedal = (award, index) => {
    return (
      <motion.div 
        key={`award-${index}`}
        className="flex flex-col items-center opacity-0"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 + (index * 0.2) }}
        onClick={() => handleAwardClick(index)}
        whileTap={{ scale: 1.2 }}
      >
        <motion.div 
          animate={flashingAward === index ? {
            scale: [1, 1.2, 1],
            backgroundColor: ['transparent', 'rgba(255, 255, 255, 0.8)', 'transparent']
          } : {}}
          transition={{ duration: 0.7 }}
          className="text-2xl font-bold text-gray-800"
        >
          {award.count}
        </motion.div>
        <div 
          className={`text-xs font-bold py-0.5 px-1.5 rounded relative ${
            award.type === 'silver' 
              ? 'bg-silver text-gray-800 animate-silver-sparkle' 
              : award.type === 'gold' 
                ? 'bg-gold text-gray-800 animate-gold-shine'
                : 'bg-diamond text-gray-900 animate-diamond-ultra'
          }`}
        >
          {award.type === 'diamond' ? (
            <span className="relative z-20 text-shadow-sm inline-block" style={{ 
              color: '#000',
              fontWeight: 'bold',
              letterSpacing: '0.5px',
              WebkitTextStroke: '0.5px #000'
            }}>
              {award.type.toUpperCase()}
            </span>
          ) : (
            award.type.toUpperCase()
          )}
          {award.type === 'silver' && <SilverSparkle />}
          {award.type === 'gold' && <GoldSparkle />}
          {award.type === 'diamond' && <DiamondSparkle />}
        </div>
      </motion.div>
    );
  };

  return (
    <motion.div
      className="perspective-1000 w-[350px] h-[685px]" // Adjusted height to fit without scrolling
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="w-full h-full relative shadow-xl rounded-[20px] bg-white overflow-hidden border-4 border-primary"
        initial={{ y: 40, opacity: 0 }}
        animate={{ 
          y: 0, 
          opacity: 1 
        }}
        transition={{ 
          type: 'spring',
          stiffness: 100,
          damping: 10
        }}
      >
        {/* Card Header */}
        <div className="relative bg-gradient-to-r from-primary to-green-600 p-5 rounded-t-[16px]">
          <div className="absolute top-2.5 left-0 bg-primary text-white py-1 px-5 font-bold rounded-r-lg shadow-md animate-banner-glow z-20">
            TEAM IGNITE
          </div>
          
          {/* Animated Background Text Elements */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            {/* Row 1 - Ticker */}
            <TextTicker top="20%">
              <TextList duration="25s">
                {backgroundTextItems.map((text, index) => (
                  <TextItem key={`text1-${index}`} fontSize="32px">{text}</TextItem>
                ))}
              </TextList>
              <TextList duration="25s">
                {backgroundTextItems.map((text, index) => (
                  <TextItem key={`text1-dup-${index}`} fontSize="32px">{text}</TextItem>
                ))}
              </TextList>
            </TextTicker>
            
            {/* Row 2 - Ticker (reversed) */}
            <TextTicker top="45%">
              <TextList 
                duration="30s"
                style={{ animationDirection: 'reverse' }}
              >
                {backgroundTextItems.map((text, index) => (
                  <TextItem key={`text2-${index}`} fontSize="28px">{text}</TextItem>
                ))}
              </TextList>
              <TextList 
                duration="30s"
                style={{ animationDirection: 'reverse' }}
              >
                {backgroundTextItems.map((text, index) => (
                  <TextItem key={`text2-dup-${index}`} fontSize="28px">{text}</TextItem>
                ))}
              </TextList>
            </TextTicker>
            
            {/* Row 3 - Ticker */}
            <TextTicker top="70%">
              <TextList duration="22s">
                {backgroundTextItems.map((text, index) => (
                  <TextItem key={`text3-${index}`} fontSize="32px">{text}</TextItem>
                ))}
              </TextList>
              <TextList duration="22s">
                {backgroundTextItems.map((text, index) => (
                  <TextItem key={`text3-dup-${index}`} fontSize="32px">{text}</TextItem>
                ))}
              </TextList>
            </TextTicker>
          </div>
          
          {/* Larger profile photo */}
          <motion.div 
            className="w-[140px] h-[140px] mx-auto mt-5 mb-3 rounded-full overflow-hidden border-4 border-white relative z-10"
            whileHover={{ scale: 1.05 }}
            animate={{ scale: [1, 1.02] }}
            transition={{ 
              repeat: Infinity,
              repeatType: 'reverse',
              duration: 1.5
            }}
          >
            <Pattern />
            <img src={photo} alt={name} className="w-full h-full object-cover relative z-10" />
          </motion.div>
          
          {/* Quote below profile picture */}
          <motion.div 
            className="text-center text-white text-sm italic mt-4 mb-2 px-3 bg-black/20 py-2 rounded-lg max-w-[90%] mx-auto z-10 relative"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <p>"{quote}"</p>
          </motion.div>
          
          <div className="absolute top-2.5 right-2.5 bg-primary text-white py-1 px-2.5 rounded shadow-md z-20">
            GRADE <span className="text-xl font-bold">10</span>
          </div>
        </div>
        
        {/* Card Body */}
        <div className="p-4 bg-white rounded-b-[16px]">
          <h1 className="text-center font-extrabold text-primary mb-1 animate-text-glow">
            {name.toUpperCase()}
          </h1>
          <p className="text-center text-gray-600 mb-4 text-sm">
            {section}
          </p>
          
          {/* Stats Container */}
          <div className="flex justify-between mb-3">
            {/* Awards */}
            <div className="flex gap-2.5">
              {orderedAwards.map((award, index) => renderMedal(award, index))}
            </div>
            
            {/* EXP Level */}
            <div className="flex flex-col items-center">
              <span className="font-bold text-primary mb-1">EXP</span>
              <div ref={starsRef} className="text-accent tracking-wider animate-star-twinkle">
                ★★★★★
              </div>
            </div>
          </div>
          
          {/* Skills Section */}
          <div className="mb-3 space-y-1">
            <h3 className="text-primary font-bold text-sm border-b border-primary/20 pb-1 mb-2">SKILLS ASSESSMENT</h3>
            {/* Use MaxedSkillBar for maxed-out Coding skill */}
            <MaxedSkillBar label="CODING" level={skills.coding} />
            <ProgressSkillBar label="ROBOT DESIGNING" level={skills.robotDesigning} color="#006622" />
            <ProgressSkillBar label="INNOVATION" level={skills.innovation} color="#006622" />
            <ProgressSkillBar label="COLLABORATION" level={skills.collaboration} color="#006622" />
            <ProgressSkillBar label="CREATIVITY" level={skills.creativity} color="#006622" />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SkillCard;