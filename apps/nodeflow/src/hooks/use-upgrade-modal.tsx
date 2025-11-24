import { TRPCClientError } from "@trpc/client";
import { useState } from "react";

import { UpgradeModal } from "@/components/upgrade-modal";
import { authClient } from "@/lib/auth/client";

export const useUpgradeModal = () => {
	const [open, setOpen] = useState(false);

	const handleError = (error: unknown) => {
		if (error instanceof TRPCClientError) {
			if (error.data?.code === "FORBIDDEN") {
				setOpen(true);
				return true;
			}
		}
		return false;
	};

	const handleProceed = () => {
		authClient.checkout({
			slug: process.env.NEXT_PUBLIC_POLAR_PRODUCT_SLUG,
		});
	};

	const modal = (
		<UpgradeModal
			open={open}
			onOpenChange={setOpen}
			handleProceed={handleProceed}
		/>
	);

	return { handleError, modal };
};
