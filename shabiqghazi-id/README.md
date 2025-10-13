# Nuxt 3 x Strapi Starter

This project is a modern starter template that combines **Nuxt 3** with **Strapi** for building performant, SEO-ready content websites.

## 🚀 Features

- **Nuxt 3** with SSR and hybrid rendering
- **Strapi CMS** as a headless backend
- **TailwindCSS** integration
- Auto-imported **composables**, **utils**, **directives**, and **types**
- Built-in **SEO configuration**, including global metadata and per-article SEO via `useSeoMeta`
- Auto-generated **Sitemap** with dynamic content support
- Custom directive for **safe HTML rendering** using `sanitize-html`
- ESLint configuration with fix and lint scripts
- Type-safe API communication with reusable fetch functions
- Modular code structure for scalability and readability

## 🔍 SEO

This project is pre-configured with best practices for SEO, including:

- Global and dynamic per-page meta tags
- Open Graph and Twitter card support
- Auto-generated sitemap via `@nuxtjs/sitemap`
- Structured article metadata
- Clean and crawlable URLs

## 🔄 Reusable API Functions

The codebase includes reusable utilities and composables to interact with Strapi:

- Handle both **collection** and **single** content types
- Supports filtering, sorting, and pagination
- Query building with `qs` for complex URL parameters
- Safe and consistent fetch logic across the project

These functions abstract repetitive logic and make the codebase clean and maintainable.

## 📁 Project Structure

- `components/` – Vue components
- `composables/` – Auto-imported logic (e.g., `useArticles`, `useSeo`)
- `lib/` – Reusable logic such as HTTP client, query builder
- `pages/` – Route-based views
- `server/` – API endpoints, sitemap handler, etc.
- `types/` – TypeScript interfaces for Strapi content types
- `utilities/` – General helper functions
- `app.vue` – Global layout and SEO injection

## ⚙️ Development Setup

1. Install dependencies:

```bash
 pnpm install
```

2. Start the development server:

```bash
 pnpm dev
```

3. Lint the codebase:

```bash
 pnpm lint
```

4. Auto-fix lint issues:

```bash
 pnpm lint:fix
```

## 🌐 Site Configuration

You can customize global site settings (e.g., `url`, `trailingSlash`) via runtime config in `nuxt.config.ts`, which also influences sitemap generation and canonical URLs.

## 🖼 Assets and Images

Images can be managed through the Strapi media library and loaded dynamically with Nuxt Image Module for optimized delivery. Local assets can also be imported using Nuxt's asset path handling.

## 📄 License

[MIT](LICENSE)

---

Made with ❤️ using Nuxt & Strapi.
