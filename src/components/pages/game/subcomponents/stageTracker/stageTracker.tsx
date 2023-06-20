'use client';

import { useState } from 'react';

type Stage = 'Pre-flop' | 'Flop' | 'Turn' | 'River';

export default function StageTracker() {
  const [stage, setStage] = useState<Stage>('Pre-flop');

  return (
    <div>
      <p>Stage: {stage}</p>
    </div>
  );
}
