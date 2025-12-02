import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        ref: true,
        exportType: "default",
        dimensions: false,

        svgoConfig: {
          plugins: [
            {
              name: "preset-default",
              params: {
                overrides: {
                  cleanupIds: false,
                },
              },
            },
          ],
        },

        // Torna os valores das cores variáveis
        replaceAttrValues: {
          "#4682DA": "rgb(var(--color-primary))",
          "#EFEFEF": "rgb(var(--color-white))",
          "#DDD83B": "rgb(var(--color-yellow))",
        },
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@services": path.resolve(__dirname, "./src/services"),
      "@utils": path.resolve(__dirname, "./src/utils"),
    },
  },
});
