"use server";

import { getSubscriptionToken, type Realtime } from "@inngest/realtime";
import { anthropicChannel } from "@/lib/inngest/channels/anthropic";
import { inngest } from "@/lib/inngest/client";

export type AnthropicToken = Realtime.Token<
	typeof anthropicChannel,
	["status"]
>;

export async function fetchAnthropicRealtimeToken(): Promise<AnthropicToken> {
	const token = await getSubscriptionToken(inngest, {
		channel: anthropicChannel(),
		topics: ["status"],
	});

	return token;
}
