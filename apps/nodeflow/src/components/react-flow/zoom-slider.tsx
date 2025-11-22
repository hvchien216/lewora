'use client';

import { Button, Slider, cn } from '@lewora/ui';
import {
  Panel,
  useReactFlow,
  useStore,
  useViewport,
  type PanelProps,
} from '@xyflow/react';
import { Maximize, Minus, Plus } from 'lucide-react';
import { forwardRef } from 'react';

export const ZoomSlider = forwardRef<
  HTMLDivElement,
  Omit<PanelProps, 'children'>
>(({ className, ...props }, ref) => {
  const { zoom } = useViewport();
  const { zoomTo, zoomIn, zoomOut, fitView } = useReactFlow();
  const minZoom = useStore((state) => state.minZoom);
  const maxZoom = useStore((state) => state.maxZoom);

  return (
    <Panel
      className={cn(
        'h-7 flex gap-1 rounded-md border-none shadow-none bg-muted/40 backdrop-blur-lg py-1 px-0 text-foreground items-center',
        className
      )}
      ref={ref}
      {...props}
    >
      <Button
        variant="ghost"
        size="icon-sm"
        className="size-7"
        onClick={() => zoomOut({ duration: 300 })}
      >
        <Minus className="h-4 w-4" />
      </Button>
      <Slider
        className="w-[100px]"
        value={[zoom]}
        min={minZoom}
        max={maxZoom}
        step={0.01}
        onValueChange={(values) => zoomTo(values[0])}
      />
      <Button
        variant="ghost"
        size="icon-sm"
        className="size-7"
        onClick={() => zoomIn({ duration: 300 })}
      >
        <Plus className="h-4 w-4" />
      </Button>
      <Button
        className="tabular-nums text-xs h-7 px-2"
        variant="ghost"
        size="sm"
        onClick={() => zoomTo(1, { duration: 300 })}
      >
        {(100 * zoom).toFixed(0)}%
      </Button>
      <Button
        variant="ghost"
        size="icon-sm"
        className="size-7"
        onClick={() => fitView({ duration: 300 })}
      >
        <Maximize className="h-4 w-4" />
      </Button>
    </Panel>
  );
});

ZoomSlider.displayName = 'ZoomSlider';
