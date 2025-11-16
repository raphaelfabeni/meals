import "./globals.css";

export const metadata = {
  title: "Meal Helper",
  description: "Find recipes fast, keep things accessible.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased text-gray-900">
        {children}
      </body>
    </html>
  );
}