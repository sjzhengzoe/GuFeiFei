import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [reactRefresh()],
//   resolve: {
//     alias: [
//       { find: "images", replacement: "../../global/images" },
//       { find: "global", replacement: "../../global" },
//       { find: "qeeq-components", replacement: "../../index" },
//       { find: "Components", replacement: "./components" },
//     ],
//   },
// });

// vite.config.js
import { resolve } from "path";

module.exports = {
  root: resolve(__dirname),
  resolve: {
    alias: [
      { find: "images", replacement: "../../global/images" },
      { find: "global", replacement: "../../global" },
      { find: "qeeq-components", replacement: "../../index" },
      { find: "Components", replacement: "./components" },
    ],
  },
};
