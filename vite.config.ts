import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// GitHub Pages serves project sites from a repository subpath, while local
// preview serves from the domain root. Relative asset URLs work in both places
// and prevent the production build from requesting /assets/* from the domain
// root, which causes a blank page on project pages.
export default defineConfig({
  base: "./",
  plugins: [react(), tailwindcss()],
});
