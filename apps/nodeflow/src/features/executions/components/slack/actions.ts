"use server";

import { getSubscriptionToken, type Realtime } from "@inngest/realtime";
import { slackChannel } from "@/lib/inngest/channels/slack";
import { inngest } from "@/lib/inngest/client";

export type SlackToken = Realtime.Token<typeof slackChannel, ["status"]>;

export async function fetchSlackRealtimeToken(): Promise<SlackToken> {
	const token = await getSubscriptionToken(inngest, {
		channel: slackChannel(),
		topics: ["status"],
	});

	return token;
}
