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

function useElementWidth(ref) {
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    function updateWidth() {
      if (ref.current) {
        setWidth(ref.current.offsetWidth);
      }
    }
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, [ref]);

  return width;
}

export const ScrollVelocity = ({
  scrollContainerRef,
  texts = [],
  // velocity = 100,
  className = '',
  // damping = 50,
  // stiffness = 400,
  // numCopies = 6,

  velocity=15,      // slower
damping=50,    // smoother
stiffness=250,
numCopies=3,        // fewer repetitions

  velocityMapping = { input: [0, 1000], output: [0, 5] },
  parallaxClassName = '',
  scrollerClassName = '',
  parallaxStyle,
  scrollerStyle
}) => {

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
    const baseX = useMotionValue(0);
    const scrollOptions = scrollContainerRef ? { container: scrollContainerRef } : {};
    const { scrollY } = useScroll(scrollOptions);
    const scrollVelocity = useVelocity(scrollY);

    const smoothVelocity = useSpring(scrollVelocity, {
      damping,
      stiffness
    });

    const velocityFactor = useTransform(
      smoothVelocity,
      velocityMapping.input,
      velocityMapping.output,
      { clamp: false }
    );

    const copyRef = useRef(null);
    const copyWidth = useElementWidth(copyRef);

    function wrap(min, max, v) {
      const range = max - min;
      return ((((v - min) % range) + range) % range) + min;
    }

    const x = useTransform(baseX, v =>
      copyWidth === 0 ? '0px' : `${wrap(-copyWidth, 0, v)}px`
    );

    const directionFactor = useRef(1);

    useAnimationFrame((_, delta) => {
      let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

      directionFactor.current = velocityFactor.get() < 0 ? -1 : 1;
      moveBy += directionFactor.current * moveBy * velocityFactor.get();

      baseX.set(baseX.get() + moveBy);
    });

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
              ref={i === 0 ? copyRef : null}
              className={`scroll-item ${className}`}
            >
              {children}
            </span>
          ))}
        </motion.div>
      </div>
    );
  }

  return (
    <section>
      {texts.map((text, index) => (
        <VelocityText
          key={index}
          baseVelocity={index % 2 ? -velocity : velocity}
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
