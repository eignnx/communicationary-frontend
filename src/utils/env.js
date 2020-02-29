const isProd = process.env.NODE_ENV === "production";
const HTTP_PROTO = isProd ? "https://" : "http://";
const WS_PROTO = isProd ? "wss://" : "ws://";
const BACKEND_HOST = isProd
  ? "communicationary.herokuapp.com"
  : "localhost:3000";

export const BACKEND_HOST_HTTP = HTTP_PROTO + BACKEND_HOST;
export const BACKEND_HOST_WS = WS_PROTO + BACKEND_HOST;
