import react from "@vitejs/plugin-react-swc";
import { defineConfig, splitVendorChunkPlugin } from "vite";
import eslint from "vite-plugin-eslint";

// https://vitejs.dev/config/
// eslint-disable-next-line import/no-default-export
export default defineConfig({
  plugins: [react(), eslint(), splitVendorChunkPlugin()],
  base: "https://myang3577.github.io/my-website",
});
