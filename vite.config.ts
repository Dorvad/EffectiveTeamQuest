import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// For GitHub Pages:
// In GitHub Actions, GITHUB_REPOSITORY is usually "username/repository-name".
// This automatically sets the correct base path: "/repository-name/".
// Locally, the base remains "/".
const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1];
const base = repositoryName ? `/${repositoryName}/` : "/";

export default defineConfig({
  base,
  plugins: [react(), tailwindcss()],
});
