import type { APIRoute } from "astro";
import { site } from "../config/site.ts";

// Sitemap a mano (sin @astrojs/sitemap: casi todas las páginas son SSR y no las detectaría).
// Las páginas legales quedan fuera mientras sean provisionales (llevan noindex).
const rutas = [
	{ ruta: "/", prioridad: "1.0" },
	{ ruta: "/reservas", prioridad: "0.7" },
];

export const GET: APIRoute = () => {
	const urls = rutas
		.map(
			({ ruta, prioridad }) =>
				`  <url><loc>${new URL(ruta, site.url).href}</loc><changefreq>weekly</changefreq><priority>${prioridad}</priority></url>`,
		)
		.join("\n");

	return new Response(
		`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
		{ headers: { "Content-Type": "application/xml; charset=utf-8" } },
	);
};
