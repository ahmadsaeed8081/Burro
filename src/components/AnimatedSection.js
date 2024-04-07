// React Component
import React, { useEffect, useRef } from 'react';

function AnimatedSection({ children }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          section.classList.add('fade-in', 'fade-up');
        }
      });
    });

    observer.observe(section);

    return () => {
      observer.unobserve(section);
    };
  }, []);

  return <section ref={sectionRef}>{children}</section>;
}

export default AnimatedSection;
