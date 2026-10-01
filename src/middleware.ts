import { defineMiddleware } from "astro:middleware";
import { site } from "./config/site.ts";

// Hasta site.inauguracion.gateSwitchAt, cualquier visita ve solo /countdown.
// Corre como Netlify Edge Function (astro.config.mjs: netlify({ edgeMiddleware: true })),
// así que intercepta también las páginas estáticas prerenderizadas, no solo las SSR.
const GATE_PATH = "/countdown";
// "/.netlify" incluye el CDN de imágenes de Netlify (/.netlify/images?url=...), que es
// por donde se sirven en producción las imágenes de astro:assets: sin esta excepción,
// el gate redirigía las imágenes de /countdown a /countdown y salían rotas.
// robots.txt, sitemap, imagen OG e iconos también deben verse durante el gate (buscadores y redes).
const EXEMPT_PREFIXES = [
	"/_astro",
	"/.netlify",
	"/fonts",
	"/favicon",
	"/apple-touch-icon",
	"/og.jpg",
	"/robots.txt",
	"/sitemap.xml",
];

export const onRequest = defineMiddleware((context, next) => {
	const switchAt = new Date(site.inauguracion.gateSwitchAt);
	const isBeforeLaunch = Date.now() < switchAt.getTime();

	if (!isBeforeLaunch) {
		// Tras la apertura la cuenta atrás ya no tiene sentido: se manda a la home.
		if (context.url.pathname.replace(/\/$/, "") === GATE_PATH) {
			return context.redirect("/", 301);
		}
		return next();
	}

	// Astro genera internamente la ruta prerenderizada como "/countdown/" (con barra
	// final, formato "directory"); normalizamos para que no se redirija a sí misma.
	const pathname = context.url.pathname.replace(/\/$/, "") || "/";
	const isExempt =
		pathname === GATE_PATH || EXEMPT_PREFIXES.some((prefix) => pathname.startsWith(prefix));

	if (isExempt) {
		return next();
	}

	// Vista previa antes de la apertura: ?preview=<PREVIEW_TOKEN> deja una cookie que salta
	// el gate en ese navegador; ?preview=salir la borra. Sin token configurado no hay
	// vista previa en producción. En desarrollo vale también ?preview=1.
	// Las cookies se manejan a mano con cabeceras: en la Edge Function de Netlify,
	// context.cookies no se adjunta a las respuestas creadas por el propio middleware.
	const token = leerPreviewToken();
	const esValido = (valor: string | null | undefined) =>
		!!valor && ((!!token && valor === token) || (import.meta.env.DEV && valor === "1"));
	// Diagnóstico sin revelar nada: solo indica si el servidor tiene un token configurado.
	const diagnostico = { "x-sxxi-preview": token ? "configurado" : "sin-token" };

	const param = context.url.searchParams.get("preview");
	if (param === "salir") {
		return redirigir(GATE_PATH, { ...diagnostico, "set-cookie": `${PREVIEW_COOKIE}=; Path=/; Max-Age=0` });
	}
	if (esValido(param)) {
		const seguro = import.meta.env.DEV ? "" : "; Secure";
		// Se quita el token de la URL para que no quede en el historial ni se comparta por error.
		const limpia = new URL(context.url);
		limpia.searchParams.delete("preview");
		return redirigir(limpia.pathname + limpia.search, {
			...diagnostico,
			"set-cookie": `${PREVIEW_COOKIE}=${param}; Path=/; Max-Age=${60 * 60 * 24 * 7}; HttpOnly; SameSite=Lax${seguro}`,
		});
	}
	if (esValido(leerCookie(context.request, PREVIEW_COOKIE))) {
		return next();
	}

	return redirigir(GATE_PATH, diagnostico);
});

const PREVIEW_COOKIE = "sxxi_preview";

function redirigir(destino: string, cabeceras: Record<string, string>): Response {
	return new Response(null, {
		status: 302,
		headers: { location: destino, "cache-control": "no-store", ...cabeceras },
	});
}

function leerCookie(request: Request, nombre: string): string | undefined {
	const cabecera = request.headers.get("cookie") ?? "";
	for (const parte of cabecera.split(";")) {
		const [clave, ...resto] = parte.trim().split("=");
		if (clave === nombre) return resto.join("=");
	}
	return undefined;
}

// Se lee en tiempo de ejecución (no se incrusta en el código): en Netlify Edge con
// Netlify.env; en desarrollo/Node, de .env vía import.meta.env o process.env.
function leerPreviewToken(): string | undefined {
	const netlify = (globalThis as { Netlify?: { env?: { get(nombre: string): string | undefined } } }).Netlify;
	const valor =
		netlify?.env?.get("PREVIEW_TOKEN") ??
		import.meta.env.PREVIEW_TOKEN ??
		(typeof process !== "undefined" ? process.env?.PREVIEW_TOKEN : undefined);
	// tokens cortos se rechazan para que nadie lo adivine
	return valor && valor.length >= 16 ? valor : undefined;
}
