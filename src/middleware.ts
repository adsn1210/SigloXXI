import { defineMiddleware } from "astro:middleware";
import { site } from "./config/site.ts";

// Hasta site.inauguracion.gateSwitchAt, cualquier visita ve solo /countdown.
// Corre como Netlify Edge Function (astro.config.mjs: netlify({ edgeMiddleware: true })),
// así que intercepta también las páginas estáticas prerenderizadas, no solo las SSR.
const GATE_PATH = "/countdown";
// "/.netlify" incluye el CDN de imágenes de Netlify (/.netlify/images?url=...), que es
// por donde se sirven en producción las imágenes de astro:assets: sin esta excepción,
// el gate redirigía las imágenes de /countdown a /countdown y salían rotas.
const EXEMPT_PREFIXES = ["/_astro", "/.netlify", "/fonts", "/favicon"];

export const onRequest = defineMiddleware((context, next) => {
	const switchAt = new Date(site.inauguracion.gateSwitchAt);
	const isBeforeLaunch = Date.now() < switchAt.getTime();

	if (!isBeforeLaunch) {
		return next();
	}

	// Solo en desarrollo: ?preview=1 deja una cookie que salta el gate para revisar la web real.
	if (import.meta.env.DEV) {
		if (context.url.searchParams.get("preview") === "1") {
			context.cookies.set("preview", "1", { path: "/" });
			return next();
		}
		if (context.cookies.get("preview")?.value === "1") {
			return next();
		}
	}

	// Astro genera internamente la ruta prerenderizada como "/countdown/" (con barra
	// final, formato "directory"); normalizamos para que no se redirija a sí misma.
	const pathname = context.url.pathname.replace(/\/$/, "") || "/";
	const isExempt =
		pathname === GATE_PATH || EXEMPT_PREFIXES.some((prefix) => pathname.startsWith(prefix));

	if (isExempt) {
		return next();
	}

	return context.redirect(GATE_PATH, 302);
});
