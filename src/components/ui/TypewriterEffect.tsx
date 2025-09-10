import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface TypewriterEffectProps {
  text: string | string[];
  speed?: number;
  delay?: number;
  className?: string;
  loop?: boolean;
  cursor?: boolean;
  onComplete?: () => void;
}

const TypewriterEffect: React.FC<TypewriterEffectProps> = ({
  text,
  speed = 100,
  delay = 0,
  className,
  loop = false,
  cursor = true,
  onComplete
}) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [textArray, setTextArray] = useState<string[]>([]);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  useEffect(() => {
    const texts = Array.isArray(text) ? text : [text];
    setTextArray(texts);
  }, [text]);

  useEffect(() => {
    if (textArray.length === 0) return;

    const currentText = textArray[currentTextIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (currentIndex < currentText.length) {
          setDisplayText(currentText.substring(0, currentIndex + 1));
          setCurrentIndex(currentIndex + 1);
        } else {
          if (loop && textArray.length > 1) {
            setTimeout(() => setIsDeleting(true), delay);
          } else if (onComplete) {
            onComplete();
          }
        }
      } else {
        if (currentIndex > 0) {
          setDisplayText(currentText.substring(0, currentIndex - 1));
          setCurrentIndex(currentIndex - 1);
        } else {
          setIsDeleting(false);
          setCurrentTextIndex((prev) => (prev + 1) % textArray.length);
        }
      }
    }, isDeleting ? speed / 2 : speed);

    return () => clearTimeout(timeout);
  }, [currentIndex, isDeleting, currentTextIndex, textArray, speed, delay, loop, onComplete]);

  return (
    <span className={cn('inline-block', className)}>
      {displayText}
      {cursor && (
        <span className="animate-pulse ml-1">|</span>
      )}
    </span>
  );
};

export default TypewriterEffect;
