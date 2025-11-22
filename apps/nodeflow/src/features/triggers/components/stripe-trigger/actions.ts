'use server';

import { getSubscriptionToken, type Realtime } from '@inngest/realtime';

import { inngest } from '@/lib/inngest/client';
import { stripeTriggerChannel } from '@/lib/inngest/channels/stripe-trigger';

export type StripeToken = Realtime.Token<
  typeof stripeTriggerChannel,
  ['status']
>;

export async function fetchStripeTriggerRealtimeToken(): Promise<StripeToken> {
  const token = await getSubscriptionToken(inngest, {
    channel: stripeTriggerChannel(),
    topics: ['status'],
  });

  return token;
}
