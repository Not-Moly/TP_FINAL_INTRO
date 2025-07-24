const isLocal = location.hostname === "localhost" || location.hostname === "127.0.0.1";

export const BACKEND_URL = isLocal
  ? "http://localhost:3000"
  : "http://playle.duckdns.org:3000";