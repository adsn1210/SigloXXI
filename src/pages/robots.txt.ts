import type { APIRoute } from "astro";
import { site } from "../config/site.ts";

// Generado (y no en public/) para que la URL del sitemap salga de site.url.
export const GET: APIRoute = () =>
	new Response(`User-agent: *\nAllow: /\nDisallow: /wireframe\nDisallow: /preview-neon\n\nSitemap: ${site.url}/sitemap.xml\n`, {
		headers: { "Content-Type": "text/plain; charset=utf-8" },
	});
