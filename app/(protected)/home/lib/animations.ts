// 통일된 애니메이션 설정
export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] as const },
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] as const },
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] as const },
};

export const slideInLeft = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] as const },
};

// 순차적 애니메이션을 위한 delay 계산
export const getStaggerDelay = (index: number, baseDelay: number = 0, stagger: number = 0.05) => {
  return baseDelay + index * stagger;
};

