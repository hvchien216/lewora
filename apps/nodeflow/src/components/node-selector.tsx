import {
  Separator,
  toast,
  cn,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@lewora/ui';
import { NodeType } from '@/generated/prisma';

import { createId } from '@paralleldrive/cuid2';
import { useReactFlow } from '@xyflow/react';
import Image from 'next/image';
import { useCallback, type ReactNode } from 'react';
import { GlobeIcon, MousePointerIcon } from 'lucide-react';

type NodeSelectorOption = {
  type: NodeType;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }> | string;
  iconClassName?: string;
};

const triggerNodes: NodeSelectorOption[] = [
  {
    type: NodeType.MANUAL_TRIGGER,
    label: 'Manual Trigger',
    description:
      "Runs the flow when clicking 'Execute Workflow'. Great for getting started quickly.",
    icon: MousePointerIcon,
  },
  {
    type: NodeType.GOOGLE_FORM_TRIGGER,
    label: 'Google Form',
    description: 'Runs the flow when a Google Form is submitted.',
    icon: '/logos/googleform.svg',
  },
  {
    type: NodeType.STRIPE_TRIGGER,
    label: 'Stripe',
    description: 'Runs the flow when a Stripe Event is captured.',
    icon: '/logos/stripe.svg',
  },
];

const executionNodes: NodeSelectorOption[] = [
  {
    type: NodeType.HTTP_REQUEST,
    label: 'HTTP Request',
    description: 'Makes an HTTP request to an external API or service.',
    icon: GlobeIcon,
  },
  {
    type: NodeType.ANTHROPIC,
    label: 'Anthropic',
    description: 'Uses Anthropic to generate text.',
    icon: '/logos/anthropic.svg',
  },
  {
    type: NodeType.GEMINI,
    label: 'Gemini',
    description: 'Uses Google Gemini to generate text.',
    icon: '/logos/gemini.svg',
  },
  {
    type: NodeType.OPENAI,
    label: 'OpenAI',
    description: 'Uses OpenAI to generate text.',
    icon: '/logos/openai.svg',
    iconClassName: 'dark:invert opacity-50 group-hover:opacity-100',
  },
  {
    type: NodeType.DISCORD,
    label: 'Discord',
    description: 'Send a message to Discord.',
    icon: '/logos/discord.svg',
  },
  {
    type: NodeType.SLACK,
    label: 'Slack',
    description: 'Send a message to Slack.',
    icon: '/logos/slack.svg',
  },
];

interface NodeSelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
}

const NodeGroup = ({
  nodes,
  onSelect,
}: {
  nodes: NodeSelectorOption[];
  onSelect: (node: NodeSelectorOption) => void;
}) => {
  return (
    <div>
      {nodes.map((node) => {
        const Icon = node.icon;

        return (
          <div
            key={node.type}
            className={cn(
              'cursor-pointer group w-full justify-start h-auto py-5 px-4 rounded-none transition-all duration-300',
              'border-l-3 border-transparent hover:border-l-secondary dark:hover:border-l-primary'
            )}
            onClick={() => onSelect(node)}
          >
            <div className="flex items-center gap-6 w-full overflow-hidden">
              {/* <div className="size-12 rounded-lg border-[1.5px] dark:border border-border/50 group-hover:border-secondary dark:group-hover:border-primary/40 bg-muted/40 aspect-square flex items-center justify-center transition-colors duration-300">
              <div className="size-6.5 aspect-square relative">
                <Image
                  src={node.icon}
                  alt={node.label}
                  fill
                  className={cn(
                    'object-contain object-top shrink-0 grayscale group-hover:grayscale-0 group-hover:drop-shadow-md transition-transform duration-300',
                    node.iconClassName
                  )}
                />
              </div>
            </div> */}
              {typeof Icon === 'string' ? (
                <Image
                  src={Icon}
                  alt={node.label}
                  className="object-contain rounded-sm size-5"
                  width={20}
                  height={20}
                />
              ) : (
                <Icon className="size-5" />
              )}
              <div className="flex flex-col items-start text-left space-y-1">
                <span className="font-medium text-sm group-hover:text-secondary dark:group-hover:text-primary leading-snug transition-colors duration-300">
                  {node.label}
                </span>
                <span className="line-clamp-2 text-xs text-muted-foreground leading-tight">
                  {node.description}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export const NodeSelector = ({
  open,
  onOpenChange,
  children,
}: NodeSelectorProps) => {
  const { setNodes, getNodes, screenToFlowPosition } = useReactFlow();

  const handleNodeSelect = useCallback(
    (selection: NodeSelectorOption) => {
      // Check if trying to add a manual trigger when one already exists
      if (selection.type === NodeType.MANUAL_TRIGGER) {
        const nodes = getNodes();
        const existingManualTrigger = nodes.some(
          (node) => node.type === NodeType.MANUAL_TRIGGER
        );

        if (existingManualTrigger) {
          toast.error('Only 1 manual trigger is allowed per workflow.');
          return;
        }
      }

      setNodes((nodes) => {
        const existingInitialTrigger = nodes.some(
          (node) => node.type === NodeType.INITIAL
        );

        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        const flowPosition = screenToFlowPosition({
          x: centerX + (Math.random() - 0.5) * 200,
          y: centerY + (Math.random() - 0.5) * 200,
        });

        const newNode = {
          id: createId(),
          data: {},
          position: flowPosition,
          type: selection.type,
        };

        if (existingInitialTrigger) {
          return [newNode];
        }

        return [...nodes, newNode];
      });

      onOpenChange(false);
    },
    [getNodes, onOpenChange, screenToFlowPosition, setNodes]
  );

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent
        side="right"
        className="w-full sm:max-w-md overflow-y-auto dark:bg-sidebar/60 backdrop-blur-lg"
      >
        <SheetHeader>
          <SheetTitle>What triggers this workflow?</SheetTitle>
          <SheetDescription>
            Choose a trigger or action to start building your workflow.
          </SheetDescription>
        </SheetHeader>
        <NodeGroup nodes={triggerNodes} onSelect={handleNodeSelect} />
        <Separator />
        <NodeGroup nodes={executionNodes} onSelect={handleNodeSelect} />
      </SheetContent>
    </Sheet>
  );
};
