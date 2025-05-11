import React, { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';

const SkillBar = ({ label, level }) => {
  const controls = useAnimation();
  const skillBarRef = useRef(null);
  
  useEffect(() => {
    // Animate skill bar after component mounts
    const percentage = (level / 5) * 100;
    
    // Start animation after a small delay
    const timer = setTimeout(() => {
      controls.start({
        width: `${percentage}%`,
        transition: { 
          duration: 1.5,
          ease: [0.17, 0.67, 0.83, 0.67] 
        }
      });
      
      // Add glow effect for high skills
      if (level >= 4 && skillBarRef.current) {
        skillBarRef.current.style.boxShadow = '0 0 10px rgba(255, 209, 0, 0.7)';
      }
    }, 500);
    
    return () => clearTimeout(timer);
  }, [level, controls]);

  return (
    <div className="mb-2.5">
      <div className="text-sm font-bold mb-0.5 text-primary">
        {label}
      </div>
      <div className="h-3 bg-gray-200 rounded-md overflow-hidden">
        <motion.div
          ref={skillBarRef}
          className="h-full bg-gradient-to-r from-primary to-accent rounded-md"
          initial={{ width: 0 }}
          animate={controls}
        />
      </div>
    </div>
  );
};

export default SkillBar; 