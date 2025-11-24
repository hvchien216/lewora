"use server";

import { getSubscriptionToken, type Realtime } from "@inngest/realtime";
import { googleFormTriggerChannel } from "@/lib/inngest/channels/google-form-trigger";
import { inngest } from "@/lib/inngest/client";

export type GoogleFormToken = Realtime.Token<
	typeof googleFormTriggerChannel,
	["status"]
>;

export async function fetchGoogleFormTriggerRealtimeToken(): Promise<GoogleFormToken> {
	const token = await getSubscriptionToken(inngest, {
		channel: googleFormTriggerChannel(),
		topics: ["status"],
	});

	return token;
}
