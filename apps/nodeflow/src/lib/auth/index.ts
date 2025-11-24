import { checkout, polar, portal } from "@polar-sh/better-auth";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

import prisma from "@/lib/db";
import { polarClient } from "@/lib/polar";

export const auth = betterAuth({
	database: prismaAdapter(prisma, { provider: "postgresql" }),

	emailAndPassword: { enabled: true, autoSignIn: true },

	socialProviders: {
		github: {
			clientId: process.env.GITHUB_CLIENT_ID || "",
			clientSecret: process.env.GITHUB_CLIENT_SECRET,
		},
		google: {
			clientId: process.env.GOOGLE_CLIENT_ID || "",
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		},
	},

	plugins: [
		polar({
			client: polarClient,
			createCustomerOnSignUp: true,
			use: [
				checkout({
					products: [
						{
							productId: process.env.NEXT_PUBLIC_POLAR_PRODUCT_ID || "",
							slug: process.env.NEXT_PUBLIC_POLAR_PRODUCT_SLUG || "",
						},
					],
					successUrl: process.env.POLAR_SUCCESS_URL || "",
					authenticatedUsersOnly: true,
				}),
				portal(),
			],
		}),
	],
});
