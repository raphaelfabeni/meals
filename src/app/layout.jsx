import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata = {
  title: "Meal Helper",
  description: "Find recipes fast, keep things easy.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="robots" content="noindex, nofollow" />
      </head>
      <body className={`${inter.className} antialiased text-gray-900`}>
        {children}
      </body>
    </html>
  );
}
