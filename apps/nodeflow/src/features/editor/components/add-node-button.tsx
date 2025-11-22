'use client';

import { memo, useState } from 'react';
import { PlusIcon } from 'lucide-react';

import { Button } from '@lewora/ui';
import { NodeSelector } from '@/components/node-selector';

export const AddNodeButton = memo(() => {
  const [selectorOpen, setSelectorOpen] = useState(false);

  return (
    <NodeSelector open={selectorOpen} onOpenChange={setSelectorOpen}>
      <Button size="icon" variant="outline" className="bg-background">
        <PlusIcon />
      </Button>
    </NodeSelector>
  );
});

AddNodeButton.displayName = 'AddNodeButton';
