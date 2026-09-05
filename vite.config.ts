import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Served from https://kubegraf.github.io/quantumilion.com/, so every asset URL
// has to carry that prefix. Vite rewrites the `/public` references in
// index.html and in the CSS using this value. Set it wrong and the deploy still
// goes green while every visitor gets a page with no CSS, no fonts and no
// JavaScript — which reads as a broken build rather than a wrong path.
// `deploy.yml` greps the built HTML for it and fails instead of publishing that.
const BASE = "/quantumilion.com/";

export default defineConfig({
  base: BASE,
  plugins: [react()],
  build: {
    target: "es2020",
    cssCodeSplit: false,
    // One page, one bundle. Splitting a single-route site only adds round trips.
    rollupOptions: { output: { manualChunks: undefined } },
  },
});
