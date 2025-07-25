import createClient from "openapi-fetch";
import type { paths } from "./types/schema";

export const client = createClient<paths>({ baseUrl: "http://127.0.0.1:8000" });
