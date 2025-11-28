import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        ref: true,
        exportType: "named",
        jsxRuntime: "automatic",
        typescript: true,
        dimensions: false,

        // Torna os valores das cores variáveis
        replaceAttrValues: {
          "#4682DA": "{props.primaryColor}",
          "#EFEFEF": "{props.whiteColor}",
          "#DDD83B": "{props.yellowColor}",
        },
        svgo: true,
        svgoConfig: {
          plugins: [
            {
              name: "preset-default",
              params: {
                overrides: {
                  cleanupIds: false,
                  inlineStyles: {
                    onlyMatchedOnce: false,
                  },
                },
              },
            },
            "prefixIds", // Adiciona prefixo nos IDs
            "convertStyleToAttrs", // Transforma CSS em atributos
          ],
        },
      },
    }),
  ],
});
