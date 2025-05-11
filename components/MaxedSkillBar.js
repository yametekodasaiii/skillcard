import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import styled, { keyframes } from 'styled-components';

// Create a breaking effect animation
const breakingEffect = keyframes`
  0% {
    box-shadow: 0 0 5px rgba(255, 0, 0, 0.5);
    background: linear-gradient(90deg, #6a0dad, #9370db);
  }
  25% {
    box-shadow: 0 0 20px rgba(255, 60, 0, 0.8);
    background: linear-gradient(90deg, #8600ff, #da70d6);
  }
  50% {
    box-shadow: 0 0 25px rgba(255, 0, 0, 0.9), 0 0 15px rgba(255, 60, 0, 0.7) inset;
    background: linear-gradient(90deg, #9370db, #ff00ff);
    transform: scale(1.02);
  }
  75% {
    box-shadow: 0 0 15px rgba(255, 0, 0, 0.7);
    background: linear-gradient(90deg, #8600ff, #da70d6);
  }
  100% {
    box-shadow: 0 0 5px rgba(255, 0, 0, 0.5);
    background: linear-gradient(90deg, #6a0dad, #9370db);
  }
`;

// Create warning effects
const warningFlash = keyframes`
  0%, 100% {
    opacity: 0.7;
  }
  25%, 75% {
    opacity: 1;
  }
`;

// Glitch text animation
const glitchText = keyframes`
  0%, 100% { 
    transform: translate(0);
    text-shadow: 0.5px 0 0 #00fffc, -0.5px 0 0 #fc00ff;
  }
  10% { 
    transform: translate(-3px, 1px);
    text-shadow: 1px 0 0 #00fffc, -1px 0 0 #fc00ff;
  }
  20% { 
    transform: translate(3px, 0);
    text-shadow: 0.5px 0 0 #00fffc, -0.5px 0 0 #fc00ff;
  }
  30% { 
    transform: translate(0, 1px);
    text-shadow: 1.5px 0 0 #00fffc, -1.5px 0 0 #fc00ff;
  }
  40% { 
    transform: translate(1px, -1px);
    text-shadow: 0.5px 0 0 #00fffc, -0.5px 0 0 #fc00ff;
  }
  50% { 
    transform: translate(-1px, 2px);
    text-shadow: 1px 0 0 #00fffc, -1px 0 0 #fc00ff;
  }
  60% { 
    transform: translate(-3px, 1px);
    text-shadow: 0.5px 0 0 #00fffc, -0.5px 0 0 #fc00ff;
  }
  70% { 
    transform: translate(3px, 1px);
    text-shadow: 1px 0 0 #00fffc, -1px 0 0 #fc00ff;
  }
  80% { 
    transform: translate(-1px, -1px);
    text-shadow: 0.5px 0 0 #00fffc, -0.5px 0 0 #fc00ff;
  }
  90% { 
    transform: translate(1px, 2px);
    text-shadow: 1.5px 0 0 #00fffc, -1.5px 0 0 #fc00ff;
  }
`;

// Horizontal scan line animation
const scanLineAnimation = keyframes`
  0% { 
    transform: translateY(0%);
    opacity: 0.5;
  }
  10% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
  100% { 
    transform: translateY(100%);
    opacity: 0.5;
  }
`;

const MaxedSkillBar = ({ label, level }) => {
  const controls = useAnimation();
  const skillBarRef = useRef(null);
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const [glitchActive, setGlitchActive] = useState(false);
  const [isCanvasReady, setIsCanvasReady] = useState(false);
  
  useEffect(() => {
    // Calculate percentage (should be 100% for maxed out skill)
    const percentage = (level / 5) * 100;
    
    // Start animation after a small delay
    const timer = setTimeout(() => {
      controls.start({
        width: `${percentage}%`,
        transition: { 
          duration: 1.2,
          ease: [0.17, 0.67, 0.83, 0.67] 
        }
      });
      
      // Give the skillBar time to render before initializing canvas
      setTimeout(() => {
        setIsCanvasReady(true);
      }, 100);
    }, 200);
    
    return () => clearTimeout(timer);
  }, [level, controls]);

  // Periodically trigger glitch effect - more frequent now
  useEffect(() => {
    const glitchTimer = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 300);
    }, 1800); // Reduced from 3000ms to 1800ms
    
    return () => clearInterval(glitchTimer);
  }, []);

  // Create the TV static pixel effect on canvas
  useEffect(() => {
    if (!canvasRef.current || !isCanvasReady || !skillBarRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    
    // Make canvas the same size as the container
    const resizeCanvas = () => {
      if (skillBarRef.current) {
        const rect = skillBarRef.current.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          canvas.width = rect.width;
          canvas.height = rect.height;
        }
      }
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // TV static styles for randomizing
    const staticStyles = [
      // Classic B&W static
      () => {
        const val = Math.random() * 255;
        return `rgba(${val}, ${val}, ${val}, 0.7)`;
      },
      // Purple-hued static (matching skill bar color)
      () => {
        const r = Math.floor(Math.random() * 100) + 100; // 100-200 for red component
        const g = Math.floor(Math.random() * 80); // lower green
        const b = Math.floor(Math.random() * 155) + 100; // 100-255 for blue component
        return `rgba(${r}, ${g}, ${b}, 0.7)`;
      },
      // Glitchy colored static
      () => {
        const r = Math.floor(Math.random() * 255);
        const g = Math.floor(Math.random() * 255);
        const b = Math.floor(Math.random() * 255);
        return `rgba(${r}, ${g}, ${b}, 0.7)`;
      }
    ];
    
    // Generate random pixels
    const drawStatic = () => {
      if (!ctx || canvas.width <= 0 || canvas.height <= 0) {
        animationRef.current = requestAnimationFrame(drawStatic);
        return;
      }
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Create random colored pixels
      const pixelSize = 2; // Size of each "pixel"
      
      // More frequent scan lines and artifacts
      const shouldDrawScanLine = Math.random() < 0.15; // Increased from 0.05
      const shouldDrawArtifact = Math.random() < 0.25; // Increased from 0.1
      
      // Draw the main static
      for (let y = 0; y < canvas.height; y += pixelSize) {
        for (let x = 0; x < canvas.width; x += pixelSize) {
          // Randomly choose one of the static styles with higher chance of colored static
          const styleIndex = Math.random() < 0.7 ? 2 : Math.floor(Math.random() * 3);
          ctx.fillStyle = staticStyles[styleIndex]();
          
          // More random opacity for enhanced flicker
          if (Math.random() < 0.2) { // Increased from 0.1
            // Some pixels will be more prominent
            ctx.globalAlpha = 0.9;
          } else {
            ctx.globalAlpha = 0.4 + Math.random() * 0.4;
          }
          
          ctx.fillRect(x, y, pixelSize, pixelSize);
        }
      }
      
      // Reset global alpha
      ctx.globalAlpha = 1;
      
      // Draw scan line
      if (shouldDrawScanLine) {
        const lineHeight = Math.floor(Math.random() * 4) + 1;
        const lineY = Math.floor(Math.random() * canvas.height);
        const gradient = ctx.createLinearGradient(0, lineY, canvas.width, lineY);
        gradient.addColorStop(0, 'rgba(255,255,255,0)');
        gradient.addColorStop(0.5, 'rgba(255,255,255,0.8)');
        gradient.addColorStop(1, 'rgba(255,255,255,0)');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, lineY, canvas.width, lineHeight);
      }
      
      // Draw artifact
      if (shouldDrawArtifact) {
        const artifactWidth = Math.floor(Math.random() * 30) + 10;
        const artifactHeight = Math.floor(Math.random() * 10) + 2;
        const artifactX = Math.floor(Math.random() * (canvas.width - artifactWidth));
        const artifactY = Math.floor(Math.random() * (canvas.height - artifactHeight));
        
        // Use a bright color for the artifact
        ctx.fillStyle = 'rgba(255, 100, 255, 0.8)';
        ctx.fillRect(artifactX, artifactY, artifactWidth, artifactHeight);
      }
      
      // Simulate VHS tracking issues more frequently
      if (Math.random() < 0.08) { // Increased from 0.02
        if (canvas.width > 0 && canvas.height > 0) { // Safety check
          try {
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;
            
            // Shift rows of pixels
            const startY = Math.floor(Math.random() * canvas.height);
            const shiftAmount = Math.floor(Math.random() * 20) - 10;
            
            for (let y = startY; y < startY + 10 && y < canvas.height; y++) {
              for (let x = 0; x < canvas.width; x++) {
                const newX = (x + shiftAmount + canvas.width) % canvas.width;
                const i = (y * canvas.width + x) * 4;
                const newI = (y * canvas.width + newX) * 4;
                
                data[newI] = data[i];
                data[newI + 1] = data[i + 1];
                data[newI + 2] = data[i + 2];
                data[newI + 3] = data[i + 3];
              }
            }
            
            ctx.putImageData(imageData, 0, 0);
          } catch (error) {
            console.log("Canvas error prevented:", error);
          }
        }
      }
      
      // Request next frame faster for more frequent updates
      animationRef.current = requestAnimationFrame(drawStatic);
    };
    
    drawStatic();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isCanvasReady]);
  
  return (
    <div className="mb-2.5 relative">
      <GlitchLabel className={`text-sm font-bold mb-0.5 text-red-700 flex items-center ${glitchActive ? 'active' : ''}`}>
        {label}
        <OverloadedTag className="ml-2 text-xs bg-red-600 text-white px-2 py-0.5 rounded-full">
          OVERLOADED
        </OverloadedTag>
      </GlitchLabel>
      <div className="h-4 bg-gray-200 rounded-md overflow-hidden relative">
        <StyledSkillBar
          ref={skillBarRef}
          initial={{ width: 0 }}
          animate={controls}
          className={glitchActive ? 'active-glitch' : ''}
        />
        <CanvasContainer>
          <canvas ref={canvasRef} className="static-canvas" />
        </CanvasContainer>
        <ScanLine />
        <WarningIcon>⚠️</WarningIcon>
      </div>
    </div>
  );
};

const StyledSkillBar = styled(motion.div)`
  height: 100%;
  background: linear-gradient(90deg, #6a0dad, #9370db);
  border-radius: 0.375rem;
  animation: ${breakingEffect} 1s infinite; /* Faster animation - reduced from 1.5s */
  position: relative;
  z-index: 1;
  
  &.active-glitch {
    animation: ${breakingEffect} 0.3s infinite; /* Faster glitch - reduced from 0.5s */
    transform: translate(-2px, 0);
  }
`;

const GlitchLabel = styled.div`
  position: relative;
  
  &.active {
    animation: ${glitchText} 0.5s linear;
    color: #ff0057;
  }
`;

const OverloadedTag = styled.span`
  animation: ${warningFlash} 2s infinite;
  text-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
`;

const CanvasContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 5;
  mix-blend-mode: overlay;
  pointer-events: none;
  
  .static-canvas {
    width: 100%;
    height: 100%;
  }
`;

const ScanLine = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 1px;
  background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.5), transparent);
  z-index: 6;
  animation: ${scanLineAnimation} 1.2s linear infinite; /* Faster scan line - reduced from 2s */
`;

const WarningIcon = styled.div`
  position: absolute;
  top: -10px;
  right: 2px;
  font-size: 20px;
  animation: ${warningFlash} 2s infinite;
  text-shadow: 0 0 10px rgba(255, 0, 0, 0.7);
  z-index: 10;
`;

export default MaxedSkillBar; 