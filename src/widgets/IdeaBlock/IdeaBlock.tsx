'use client'

import Image from "next/image";
import styles from "./IdeaBlock.module.scss";
import { useEffect, useState } from "react";

const circleData = [
  { label: "Button", color: "#FF6B6B", line: 0 },
  { label: "Card", color: "#4ECDC4", line: 1 },
  { label: "Input", color: "#FFD93D", line: 2 },
];

export const IdeaBlock = () => {
  const [activeCircles, setActiveCircles] = useState<number[]>([]);
  const [highlight, setHighlight] = useState(false);
  const [showRightCircle, setShowRightCircle] = useState(false);

  useEffect(() => {
    let delay = 0;

    circleData.forEach((_, i) => {
      setTimeout(() => {
        setActiveCircles((prev) => [...prev, i]);
      }, delay);
      delay += 1500;
    });

    const highlightTimer = setTimeout(() => setHighlight(true), 4500);

    const rightCircleTimer = setTimeout(() => setShowRightCircle(true), 5700);

    return () => {
      clearTimeout(highlightTimer);
      clearTimeout(rightCircleTimer);
    };
  }, []);

  return (
    <section className={styles.IdeaBlock}>
      <div className={styles.IdeaBlock__lines_left}>
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className={styles.line}></div>
        ))}

        {circleData.map((circle, i) => (
          activeCircles.includes(i) && (
            <div
              key={i}
              className={styles.circle}
              style={{
                top: `${20 + circle.line * 30}%`,
                '--circle-color': circle.color
              } as React.CSSProperties}
            >
              <div className={styles.circleGlow}></div>
              <span className={styles.circleLabel}>{circle.label}</span>
            </div>
          )
        ))}
      </div>

      <div className={`${styles.IdeaBlock__card} ${highlight ? styles.highlight : ''}`}>
        <Image src="/Union.svg" alt="Логотип" width={102} height={65} />
      </div>

      <div className={styles.IdeaBlock__line_right}></div>

      {showRightCircle && (
        <div className={styles.circleRight}>
          <div className={styles.circleGlow}></div>
          <span className={styles.circleLabel}>UIkit</span>
        </div>
      )}
    </section>
  );
};
