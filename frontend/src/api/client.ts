import createClient from "openapi-fetch";
import type { paths } from "./types/schema";

const BASE_URL = import.meta.env.PROD
  ? "https://switchline-production.up.railway.app"
  : "http://127.0.0.1:8000";

export const client = createClient<paths>({ baseUrl: BASE_URL });
