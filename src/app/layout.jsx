import "./globals.css";
import NewRelicAgent from "@/app/_lib/NewRelicAgent";

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
        <NewRelicAgent />
      </head>
      <body className="antialiased text-gray-900">
        {children}
      </body>
    </html>
  );
}
