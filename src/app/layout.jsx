import "./globals.css";

export const metadata = {
  title: "Meal Helper",
  description: "Find recipes fast, keep things easy."
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
