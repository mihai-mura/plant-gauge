import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Plant Gauge",
  description: "Monitor your plants with ease using our smart dashboard.",
  icons: [{ rel: "icon", url: "/logooo.png" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <head>
        {/* Script do Lottie Player */}
        <script
          src="https://unpkg.com/@dotlottie/player-component@2.7.12/dist/dotlottie-player.mjs"
          type="module"
        ></script>
      </head>
      <body>{children}</body>
    </html>
  );
}
