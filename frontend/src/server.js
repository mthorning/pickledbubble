import sirv from "sirv";
import polka from "polka";
import compression from "compression";
import { createProxyMiddleware } from "http-proxy-middleware";

import * as sapper from "@sapper/server";

const { PORT, NODE_ENV, BACKEND_HOST } = process.env;
const dev = NODE_ENV === "development";

const apiProxy = createProxyMiddleware("/api", {
  target: `http://${dev ? "localhost" : BACKEND_HOST}:1337`,
  changeOrigin: true,
  pathRewrite: {
    "^/api": "",
  },
});

polka()
  .use(
    apiProxy,
    compression({ threshold: 0 }),
    sirv("static", { dev }),
    sapper.middleware()
  )
  .listen(PORT, (err) => {
    if (err) console.log("error", err);
  });
