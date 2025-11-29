// Com URLs comuns
declare module "*.svg" {
  const content: string;
  export default content;
}

// URL para Vite (componente React)
declare module "*.svg?react" {
  import { FunctionComponent, SVGProps } from "react";

  // Entende conteúdo do SVG como elemento SVG do React
  const content: FunctionComponent<SVGProps<SVGSVGElement>>;
  export default content;
}
