"use server";

import { getSubscriptionToken, type Realtime } from "@inngest/realtime";
import { httpRequestChannel } from "@/lib/inngest/channels/http-request";
import { inngest } from "@/lib/inngest/client";

export type HttpRequestToken = Realtime.Token<
	typeof httpRequestChannel,
	["status"]
>;

export async function fetchHttpRequestRealtimeToken(): Promise<HttpRequestToken> {
	const token = await getSubscriptionToken(inngest, {
		channel: httpRequestChannel(),
		topics: ["status"],
	});

	return token;
}
