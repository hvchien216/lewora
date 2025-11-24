import { Button } from "@lewora/ui";
import { NodeToolbar, Position } from "@xyflow/react";
import { SettingsIcon, Trash2Icon } from "lucide-react";
import type { ReactNode } from "react";

interface WorkflowNodeProps {
	name?: string;
	description?: string;
	showToolbar?: boolean;
	children: ReactNode;
	onDelete?: () => void;
	onSettings?: () => void;
}

export const WorkflowNode = ({
	name,
	description,
	showToolbar = true,
	children,
	onDelete,
	onSettings,
}: WorkflowNodeProps) => {
	return (
		<>
			{showToolbar && (
				<NodeToolbar>
					<Button
						type="button"
						size="icon-sm"
						variant="ghost"
						onClick={onSettings}
						className="text-zinc-400 hover:text-foreground size-7"
					>
						<SettingsIcon className="size=4" />
					</Button>
					<Button
						type="button"
						size="icon-sm"
						variant="ghost"
						onClick={onDelete}
						className="text-zinc-400 hover:text-foreground size-7"
					>
						<Trash2Icon className="size-4" />
					</Button>
				</NodeToolbar>
			)}
			{children}
			{name && (
				<NodeToolbar
					position={Position.Bottom}
					isVisible
					className="max-w-[200px] text-center"
				>
					<p className="font-medium text-sm">{name}</p>
					{description && (
						<div className="line-clamp-2 text-muted-foreground text-xs wrap-break-word">
							{description}
						</div>
					)}
				</NodeToolbar>
			)}
		</>
	);
};
