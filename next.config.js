// Next.js build configuration. Must be JavaScript because Next reads it directly.
// Settings below build a static site that’s easy to host (e.g., S3, Netlify, GitHub Pages).

const nextConfig = {
  // Create a static export in /out when running `next build`.
  output: 'export',

  // Ensure routes end with a slash (so /about → /about/). Static hosts map that to /about/index.html.
  trailingSlash: true,

  // Disable Next’s image optimizer (it requires a running server). We’ll use normal <img> tags.
  images: { unoptimized: true }
};

export default nextConfig;