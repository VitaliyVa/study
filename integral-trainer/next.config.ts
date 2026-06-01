import type { NextConfig } from "next";

// Назва репозиторію — для project-сайту GitHub Pages адреса буде
// https://<user>.github.io/<repo>/ , тож потрібен basePath.
const repo = "study";

// У CI (GitHub Actions) додаємо basePath/assetPrefix, локально — ні,
// щоб `npm run dev` працював зі звичайного кореня "/".
const isCI = process.env.GITHUB_ACTIONS === "true";

const nextConfig: NextConfig = {
  output: "export", // статичний експорт у папку out/
  images: { unoptimized: true }, // на статиці немає оптимізатора зображень
  basePath: isCI ? `/${repo}` : "",
  assetPrefix: isCI ? `/${repo}/` : "",
  trailingSlash: true, // стабільніші шляхи на GitHub Pages
};

export default nextConfig;
