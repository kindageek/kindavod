import { useState } from 'react';

export default function useCardIndicator(params: {
  id: number;
  type: 'movie' | 'tv';
}) {
  const [indicatorStatus, setIndicatorStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');

  const [isHovering, setIsHovering] = useState(false);

  async function handleCardHover() {
    setIsHovering(true);
    if (indicatorStatus !== 'idle') return;
    setIndicatorStatus('loading');
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_VIDSRC_URL}/embed/${params.type}/${params.id}`
      );
      if (!res.ok) throw new Error('Failed to fetch video');
      setIndicatorStatus('success');
    } catch (e) {
      setIndicatorStatus('error');
    }
  }

  function handleCardUnhover() {
    setIsHovering(false);
  }

  return { indicatorStatus, handleCardHover, isHovering, handleCardUnhover };
}
