"use client";
import { useState, useEffect } from 'react';

interface TypewriterProps {
  parts: (string | number)[];
  speed?: number;
  className?: string;
}

const Typewriter: React.FC<TypewriterProps> = ({ parts, speed = 75, className }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [partIndex, setPartIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    setDisplayedText('');
    setPartIndex(0);
    setCharIndex(0);
    setIsFinished(false);
  }, [parts]);

  useEffect(() => {
    if (partIndex >= parts.length) {
      setIsFinished(true);
      return;
    }

    const currentPart = parts[partIndex];

    if (typeof currentPart === 'number') {
      const timer = setTimeout(() => {
        setPartIndex(partIndex + 1);
      }, currentPart);
      return () => clearTimeout(timer);
    }

    if (typeof currentPart === 'string') {
      if (charIndex < currentPart.length) {
        const timer = setTimeout(() => {
          setDisplayedText((prev) => prev + currentPart.charAt(charIndex));
          setCharIndex(charIndex + 1);
        }, speed);
        return () => clearTimeout(timer);
      } else {
        setPartIndex(partIndex + 1);
        setCharIndex(0);
      }
    }
  }, [partIndex, charIndex, parts, speed]);

  return (
    <span className={className}>
      {displayedText}
      {!isFinished && <span className="animate-pulse">|</span>}
    </span>
  );
};

export default Typewriter;
