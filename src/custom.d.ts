/* eslint-disable @typescript-eslint/no-explicit-any */
// Permite importar SVG's

declare module "*.svg" {
  const content: any;
  export default content;
}
