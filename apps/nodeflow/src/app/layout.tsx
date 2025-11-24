import { Toaster } from "@lewora/ui";
import { Provider } from "jotai";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { TRPCReactProvider } from "@/lib/trpc/client";

import "../styles/globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Nodeflow",
	description: "A complete workflow automation platform",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<TRPCReactProvider>
					<NuqsAdapter>
						<Provider>
							{children}
							<Toaster />
						</Provider>
					</NuqsAdapter>
				</TRPCReactProvider>
			</body>
		</html>
	);
}
