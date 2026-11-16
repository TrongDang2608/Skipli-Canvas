import { env } from './env.config';

export const goclawConfig = {
  baseUrl: env.goclawUrl,
  gatewayToken: env.goclawGatewayToken,
  agentId: env.goclawAgentId,
  userId: env.goclawAgentId,
  completionsEndpoint: `${env.goclawUrl}/v1/chat/completions`,

  systemPrompt: `You are an elite Digital UI/UX Architect and Senior Frontend Engineer for Skipli Canvas.
Strictly adhere to your equipped Golden Design Skills (especially pinned 'skipli-media-sourcing' for high-resolution contextual Unsplash imagery across 100% of image slots on Turn 1 and ironclad asset preservation on Turn 2+) to craft high-converting, responsive, interactive single-page web applications with zero laziness. Always adapt and communicate in the user's primary language.`,
};
