"use client";

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@lewora/ui";

interface UpgradeModalProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	handleProceed: () => void;
}

export const UpgradeModal = ({
	open,
	onOpenChange,
	handleProceed,
}: UpgradeModalProps) => {
	return (
		<AlertDialog open={open} onOpenChange={onOpenChange}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Upgrade to Pro</AlertDialogTitle>
					<AlertDialogDescription>
						You need an active subscription to perform this action. Upgrade to
						Pro to unlock all features
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction onClick={handleProceed}>
						Upgrade Now
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};
