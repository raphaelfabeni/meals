# 🍽️ Meal Finder App

Find recipes fast, keep things easy.

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📜 Available Scripts

### Development
- **`npm run dev`** 🔧  
  Starts the development server with hot reload. Use this while coding.

- **`npm run build`** 📦  
  Creates a production-ready static site in the `/out` folder.

- **`npm run preview`** 👀  
  Previews the built static site locally. Run `build` first.

### Testing
- **`npm run e2e`** 🧪  
  Runs all end-to-end tests with Playwright.

- **`npm run e2e:ui`** 🎨  
  Opens Playwright's interactive UI for debugging tests.

- **`npm run e2e:headed`** 🖥️  
  Runs tests with a visible browser window (helpful for debugging).

## ️ Tech Stack

- **Next.js** - React framework with static export
- **Tailwind CSS** - Styling
- **Playwright** - E2E testing
- **AWS S3 + CloudFront** - Static site hosting and CDN
- **New Relic** - Browser monitoring and performance tracking
- **GitHub Actions** - CI/CD automation

##  Deployment

The app automatically deploys to AWS S3 + CloudFront when changes are merged to the `main` branch.

### Required GitHub Secrets
- `AWS_ACCESS_KEY_ID` - AWS access key
- `AWS_SECRET_ACCESS_KEY` - AWS secret key
- `AWS_REGION` - AWS region (e.g., `us-east-1`)
- `S3_BUCKET` - S3 bucket name
- `CF_DISTRIBUTION_ID` - CloudFront distribution ID (optional)

### Deployment Workflow
1. Push to `main` branch (or merge PR)
2. GitHub Actions builds the static site
3. Uploads to S3 with optimized caching
4. Invalidates CloudFront cache
5. Site is live! 🎉

## 📊 Monitoring

The app uses **New Relic** for browser monitoring:
- Page load performance
- JavaScript errors
- User interactions
- Core Web Vitals (LCP, FID, CLS)