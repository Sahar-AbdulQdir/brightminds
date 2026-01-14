import { useRef, useLayoutEffect, useState } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame
} from 'motion/react';
import React from "react";
import './/PodcastPageStyles/marquee.css';

// Custom hook to get the width of an element
function useElementWidth(ref) {
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    // Function to update width state based on element's current offsetWidth
    function updateWidth() {
      if (ref.current) {
        setWidth(ref.current.offsetWidth);
      }
    }
    updateWidth();

    // Add listener to update width on window resize
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, [ref]);

  return width;
}

// Main ScrollVelocity component
export const ScrollVelocity = ({
  scrollContainerRef,  
  texts = [],          
  className = '',     
  velocity=15,          
  damping=50,           
  stiffness=250,     
  numCopies=3,    
  velocityMapping = { input: [0, 1000], output: [0, 5] }, 
  parallaxClassName = '', 
  scrollerClassName = '',  
  parallaxStyle,          
  scrollerStyle            
}) => {

  // Nested component for each scrolling text
  function VelocityText({
    children,
    baseVelocity,
    scrollContainerRef,
    className,
    damping,
    stiffness,
    numCopies,
    velocityMapping,
    parallaxClassName,
    scrollerClassName,
    parallaxStyle,
    scrollerStyle
  }) {
    const baseX = useMotionValue(0);  // base horizontal position
    const scrollOptions = scrollContainerRef ? { container: scrollContainerRef } : {};
    const { scrollY } = useScroll(scrollOptions); // track scroll position
    const scrollVelocity = useVelocity(scrollY);  // get scroll speed

    // Smooth the scroll velocity using a spring
    const smoothVelocity = useSpring(scrollVelocity, {
      damping,
      stiffness
    });

    // Map smooth velocity to a factor for movement direction/speed
    const velocityFactor = useTransform(
      smoothVelocity,
      velocityMapping.input,
      velocityMapping.output,
      { clamp: false }
    );

    const copyRef = useRef(null);          // reference for first text copy
    const copyWidth = useElementWidth(copyRef);  // width of one text copy

    // Function to wrap x position for continuous scroll effect
    function wrap(min, max, v) {
      const range = max - min;
      return ((((v - min) % range) + range) % range) + min;
    }

    // Transform baseX value into wrapped x position for scrolling
    const x = useTransform(baseX, v =>
      copyWidth === 0 ? '0px' : `${wrap(-copyWidth, 0, v)}px`
    );

    const directionFactor = useRef(1);  // stores current scroll direction

    // Update the scroll position on every animation frame
    useAnimationFrame((_, delta) => {
      let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

      // Reverse direction if velocity is negative
      directionFactor.current = velocityFactor.get() < 0 ? -1 : 1;
      moveBy += directionFactor.current * moveBy * velocityFactor.get();

      baseX.set(baseX.get() + moveBy);
    });

    // Render the scrolling text copies
    return (
      <div
        className={`scroll-parallax ${parallaxClassName}`}
        style={parallaxStyle}
      >
        <motion.div
          className={`scroll-scroller scroll-shadow ${scrollerClassName}`}
          style={{ x, ...scrollerStyle }}
        >
          {Array.from({ length: numCopies }).map((_, i) => (
            <span
              key={i}
              ref={i === 0 ? copyRef : null} // only first copy ref is needed
              className={`scroll-item ${className}`}
            >
              {children}
            </span>
          ))}
        </motion.div>
      </div>
    );
  }

  // Render all text items using VelocityText
  return (
    <section>
      {texts.map((text, index) => (
        <VelocityText
          key={index}
          baseVelocity={index % 2 ? -velocity : velocity} // alternate direction for each line
          scrollContainerRef={scrollContainerRef}
          damping={damping}
          stiffness={stiffness}
          numCopies={numCopies}
          velocityMapping={velocityMapping}
          parallaxClassName={parallaxClassName}
          scrollerClassName={scrollerClassName}
          parallaxStyle={parallaxStyle}
          scrollerStyle={scrollerStyle}
          className={className}
        >
          {text}&nbsp;
        </VelocityText>
      ))}
    </section>
  );
};

export default ScrollVelocity;
