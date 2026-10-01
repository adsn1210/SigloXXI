# CLAUDE.md — Web Taberna Siglo XXI

## Contexto
Web para **Taberna Siglo XXI**, bar de tardeo y copas en Parla (Madrid). Cliente real, proyecto en producción.
Inauguración: **3 de octubre de 2026**. Prioridad: landing mobile-first rápida y después web completa con reservas de eventos.

Desarrollador: Adri. Entorno: **Windows + PowerShell**. Responde y comenta en **español**. Sé directo: código antes que explicaciones largas.

## Rutas
| Qué | Ruta |
|---|---|
| Código de la web (directorio de trabajo) | `C:\Users\adria\Desktop\SigloXXI` |
| Notas del proyecto (Obsidian) | `C:\Users\adria\Documents\Obsidian Notes\Programacion 1.0\SIGLOXII-BAR` |

Arrancar Claude Code con acceso a ambas:
```powershell
cd C:\Users\adria\Desktop\SigloXXI
claude --add-dir "C:\Users\adria\Documents\Obsidian Notes\Programacion 1.0\SIGLOXII-BAR"
```

### Reglas para las notas de Obsidian
- Solo Markdown compatible con Obsidian (enlaces `[[Nota]]`, checkboxes `- [ ]`).
- Mantener actualizadas estas notas (crearlas si no existen):
  - `00-Indice.md` — índice con enlaces al resto.
  - `Decisiones.md` — registro de decisiones: fecha, decisión, motivo.
  - `Pendientes.md` — tareas abiertas con checkbox; marca las completadas.
  - `Wireframes.md` — bocetos y cambios de diseño acordados.
  - `Cliente.md` — datos del negocio (NUNCA contraseñas ni claves).
- Al terminar cada tarea relevante: actualiza `Pendientes.md` y, si se decidió algo, `Decisiones.md`.
- No borres notas existentes; añade o edita.

## Stack
- **Astro 5** + **Tailwind CSS v4** + TypeScript.
- Hosting: **Netlify** (`@astrojs/netlify`), endpoints en `src/pages/api/*` con `export const prerender = false`.
- Reservas: Google Calendar API (cuenta de servicio) + aviso WhatsApp al propietario (CallMeBot en MVP).
- Validación: `zod`. Calendario de selección: `flatpickr` (locale `es`).
- QR: script `scripts/qr.mjs` con `qrcode` (dev dependency).

### Comandos (PowerShell)
```powershell
npm run dev        # http://localhost:4321
npm run build
npm run preview
node scripts/qr.mjs
```

## Reglas de trabajo
- Mobile-first siempre: diseña a 375 px y escala a `md:` / `lg:`.
- Toda la configuración del negocio en `src/config/site.ts`. Nada de datos repetidos hardcodeados en componentes.
- Secretos solo en `.env` (en `.gitignore`); mantener `.env.example` actualizado.
- El endpoint público de disponibilidad devuelve **solo fechas**, nunca datos personales.
- Accesibilidad: contraste suficiente, `alt` en imágenes, `prefers-reduced-motion` desactiva animaciones.
- Imágenes con `astro:assets` (`<Image />`), formato webp/avif.
- Antes de instalar una dependencia nueva, di cuál y por qué.
- Commits en español, estilo convencional: `feat:`, `fix:`, `style:`, `docs:`, `chore:`.
- **Cero emojis en toda la web** (ni en componentes, ni en contenido, ni en `site.ts`). Todo icono es SVG de línea (stroke, sin relleno) — ver `Identidad visual`.

## Datos del negocio (públicos)
- Nombre: Taberna Siglo XXI — "Bar · Tardeo · Copas"
- Dirección: Calle Doctor Morcillo 38, Parla (Madrid)
- Horario: jueves a domingo, 17:30–02:00
- Instagram: `@tabernasxxi`
- Oferta: cervezas, copas, combinados, tapas, buen ambiente, pantallas para eventos, local para cumpleaños.
- Pendiente (TODO): dominio definitivo, Place ID de Google, enlace de reseñas, teléfono público, datos legales (titular, NIF, email).

## Identidad visual: NEÓN
Referencia: flyer de inauguración (astronauta, mural de manos, barra con luz roja/violeta).

**Matiz acordado con el cliente:** el neón manda — colores vivos, degradado de verdad, no
apagado — con un toque latino-ecuatoriano/español discreto — **nada literal** (sin banderas
ni iconografía folclórica): el mestizaje se transmite solo con el protagonismo del dorado y
una tipografía más cálida. La elegancia ("estilo Calle Serrano") viene del **espaciado, la
tipografía y la composición**, no de bajar la saturación. Un primer intento desaturado y con
fondo casi negro-sobre-negro fue rechazado por el cliente. Detalle en `Decisiones.md`
(Obsidian, entradas del 2026-09-30).

| Token | Valor | Uso |
|---|---|---|
| `noche` | `#07030f` | Base del fondo (con `.bg-neon-glow`, nunca plano) |
| `noche-2` | `#120822` | Fondos de tarjetas/secciones |
| `neon-rosa` | `#ff2d95` | Titulares principales, CTA |
| `neon-cian` | `#22d3ee` | Titulares secundarios, fechas, iconos |
| `neon-violeta` | `#a855f7` | Bordes de cajas |
| `neon-oro` | `#ffc93c` | Acento dorado — **el que más se repite** (bordes, separadores, detalles); es el hilo conductor del toque latino |

Tipografías: **Arial Narrow** (`--font-titular` y `--font-cuerpo`, fuente de sistema —
titulares generales y cuerpo de texto en toda la web), **Matcha World**
(`--font-inauguracion`, en `public/fonts/`, fuente propia del cliente — **uso exclusivo
para el título de inauguración**: "Gran Inauguración" en el Hero y el `<h1>` de
`/countdown`, nada más), **Permanent Marker** (`@fontsource`, frases a brocha),
**Cormorant Garamond** en cursiva (`@fontsource`, `--font-acento`) para precios y citas.
Makcasa se probó y se eliminó (sin licencia confirmada de uso web) — ver `Decisiones.md`.

Efectos: `.neon-text` / `.neon-box` / `.neon-btn` con **glow de una sola capa** (no el
triple-shadow del primer boceto) pero color vivo. `.acento-oro` para bordes/detalles dorados.
`.bg-neon-glow` para fondos oscuros: varias luces de color (rosa/cián/violeta) difuminadas
sobre la base oscura vía `radial-gradient` + `color-mix`, no un negro plano. `.flicker`
(parpadeo sutil, solo en 1–2 elementos).

Iconos: **SVG de línea inline, cero emojis** (stroke, sin relleno, estilo "pictograma de
revista"): cerveza, copa, coctelera, tapa, nota musical, calendario, ubicación, Instagram,
corona. En Fase 2 se agrupan en `src/components/NeonIcon.astro`.

Espaciado: secciones más airadas que la maqueta gris de Fase 1 — móvil ~`py-20/24`, escritorio
(`lg:`) ~`py-28/32`, con más separación entre bloques internos y contenedor centrado
(`max-w-*` + `mx-auto`) en vez de contenido a lo ancho completo.

No abusar del glow: titulares y CTA sí: el cuerpo de texto va limpio y legible.

## Mapa del sitio
- `/countdown` — única página visible hasta el 03/10/2026 00:00 (gate); única prerenderizada
- `/` — one-page con anclas: `#inicio`, `#oferta` (Carta), `#galeria`, `#eventos`, `#visitanos` — orden real: Carta → Galería → Eventos → Ubícanos. Menú: Inicio/Carta/Eventos/Galería/Ubícanos + botón "Reservar"
- `/reservas` — de momento placeholder con CTA a WhatsApp; el formulario completo de reserva de eventos es Fase 3
- `/resena` y `/qr` — pendientes: necesitan Place ID / enlace de reseñas real antes de crear las redirecciones (Netlify `_redirects`)
- `/aviso-legal`, `/privacidad`, `/cookies` — placeholders, contenido real pendiente de datos del cliente

## Wireframes (móvil, 375 px)

```
┌───────────────────────────────┐
│ [CORONA · SIGLO XXI]    [MENU]│  HEADER sticky, fondo noche/blur
├───────────────────────────────┤
│                               │
│   (imagen astronauta/mural)   │  HERO a pantalla completa
│                               │  overlay oscuro degradado
│        GRAN (blanco)          │
│     INAUGURACIÓN (rosa neón)  │  ← visible hasta el 04/10/2026,
│  ┌─────────────────────────┐  │     después pasa a "Bar · Tardeo · Copas"
│  │ [CAL] 03 DE OCTUBRE 2026│  │  neon-box cian
│  └─────────────────────────┘  │
│  [ CÓMO LLEGAR ] [ WHATSAPP ] │  2 CTA neon-btn
├───────────────────────────────┤
│  QUÉ OFRECEMOS  (#oferta)     │
│  ┌─────┐ ┌─────┐ ┌─────┐      │  grid 2-3 cols de iconos neón (SVG línea)
│  │CERV.│ │COPA │ │COMB.│      │  Cervezas · Copas · Combinados
│  └─────┘ └─────┘ └─────┘      │  Tapas · Buen ambiente
│  ┌─────┐ ┌─────┐              │
│  │TAPA │ │MÚS. │              │
│  └─────┘ └─────┘              │
│  [ VER CARTA ]                │  (fase 2: carta con precios)
├───────────────────────────────┤
│  "Buen ambiente" (brocha)     │  FRANJA foto barra + frase marker
├───────────────────────────────┤
│  CELEBRA CON NOSOTROS         │  EVENTOS (#eventos)
│  Cumpleaños · Despedidas ·    │
│  Empresa · Partidos           │
│  ┌─────────────────────────┐  │
│  │ [PANT.] Pantallas para  │  │  2 tarjetas neon-box
│  │    tus eventos          │  │
│  └─────────────────────────┘  │
│  ┌─────────────────────────┐  │
│  │ [CORONA] Local completo │  │
│  │    o zona reservada     │  │
│  └─────────────────────────┘  │
│  [ RESERVAR FECHA ]           │  → formulario / calendario
├───────────────────────────────┤
│  GALERÍA  (#galeria)          │  carrusel horizontal scroll-snap
│  [img][img][img] →            │  + enlace "Más en Instagram"
├───────────────────────────────┤
│  VISÍTANOS  (#visitanos)      │
│  [CAL] Jue–Dom 17:30–02:00    │
│  [PIN] C/ Doctor Morcillo 38  │
│  ┌─────────────────────────┐  │
│  │      MAPA (iframe)      │  │  carga diferida (click para cargar)
│  └─────────────────────────┘  │
│  [ [ESTRELLA] DÉJANOS RESEÑA ]│  → /resena
├───────────────────────────────┤
│  FOOTER                       │
│  Te esperamos (brocha)        │
│  IG · WhatsApp · Maps         │
│  Aviso legal · Privacidad ·   │
│  Cookies  © 2026              │
└───────────────────────────────┘
```

### Formulario de reservas (móvil)
```
┌───────────────────────────────┐
│  RESERVA EL LOCAL (cian)      │
│  ┌─────────────────────────┐  │
│  │ [CAL] Elige el día  ▾   │  │  flatpickr: días ocupados deshabilitados
│  └─────────────────────────┘  │
│  ( ) Local completo           │  fase 2: zona parcial
│  ( ) Zona reservada           │
│  [ Nombre                 ]   │
│  [ Teléfono (WhatsApp)    ]   │
│  [ Email (opcional)       ]   │
│  [ Tipo de evento       ▾ ]   │
│  [ Nº personas            ]   │
│  [ Cuéntanos qué necesitas ]  │
│  ☐ Acepto la privacidad       │
│  [   SOLICITAR RESERVA    ]   │
│  (estado: enviado / error)    │
└───────────────────────────────┘
```

### Desktop (≥1024 px)
- Header con navegación visible en lugar de hamburguesa.
- Hero: texto a la izquierda, imagen a la derecha (o imagen de fondo a sangre).
- Oferta: 5 iconos en una fila.
- Eventos: texto + tarjetas a la izquierda, formulario de reserva a la derecha.
- Visítanos: datos a la izquierda, mapa a la derecha.

## Reservas — especificación
1. `GET /api/disponibilidad` → `{ ocupados: string[] }` (fechas `YYYY-MM-DD`). Cualquier evento del calendario "Reservas" bloquea el día.
2. `POST /api/reservas` (FormData): `fecha, nombre, telefono, email?, tipo, personas, mensaje?, rgpd, website (honeypot)`.
   - Valida con zod, vuelve a comprobar la disponibilidad y limita a 1 solicitud pendiente por teléfono.
   - Crea un evento de día completo: `PENDIENTE · {tipo} · {nombre}`, color rojo (`colorId 11`), teléfono en `extendedProperties.private`.
   - Envía WhatsApp al propietario (datos + enlace `wa.me` del cliente + enlace al evento). Si falla el WhatsApp, la reserva se mantiene.
3. El propietario gestiona en Google Calendar: **rojo = pendiente**, **verde (`colorId 10`) = completo**, **borrar evento = liberar día**.
4. Fase 2: reservas parciales (zona del local con el bar abierto), Cloudflare Turnstile y expiración automática de pendientes > 72 h.

Variables de entorno: `GOOGLE_SA_EMAIL`, `GOOGLE_SA_KEY`, `CALENDAR_ID`, `OWNER_WHATSAPP`, `CALLMEBOT_KEY`.

## Gate de cuenta atrás (hasta el 03/10/2026 00:00, hora Madrid)
Hasta `site.inauguracion.gateSwitchAt`, **cualquier ruta** redirige a `/countdown`
(contador grande, sin emojis, ubicación + "Cómo llegar", burbuja de WhatsApp, logo +
Instagram). A partir de ese instante, la web real se sirve normal. Mecanismo:
`src/middleware.ts` desplegado como **Netlify Edge Function** (`edgeMiddleware: true`
en `astro.config.mjs`), comparando la fecha del servidor en cada petición — cambia solo,
sin redeploy manual.

**Importante para cualquier página nueva:** Astro ejecuta el middleware también en
tiempo de build para páginas prerenderizadas, y si redirige durante el build, Astro
hornea un HTML de redirección permanente en vez del contenido real (bug ya sufrido y
corregido — ver `Decisiones.md` 2026-09-30). Por eso **toda página server-side excepto
`/countdown` lleva `export const prerender = false`**. Si se añade una página nueva
afectada por el gate, hay que añadir esa misma línea.

**Recursos que deben verse durante el gate** van en `EXEMPT_PREFIXES` de `src/middleware.ts`:
`/_astro`, `/.netlify` (CDN de imágenes de Netlify — sin esto las imágenes salen rotas en
producción), fuentes, iconos, `og.jpg`, `robots.txt`, `sitemap.xml`. Cualquier archivo
público nuevo que tenga que cargarse antes de la apertura debe añadirse ahí.

Utilidades solo de desarrollo (`npm run dev`): `?preview=1` salta el gate (cookie) y
`?ahora=2026-10-05` simula la fecha en el hero.

SEO: todo `<head>` usa `src/components/SEO.astro`; `site.url` en `site.ts` alimenta
canonical, OG, sitemap y robots — **cambiarlo al dominio definitivo** cuando exista.

## Estructura actual
```
src/
  config/site.ts              # datos del negocio, incluye gateSwitchAt
  middleware.ts                # gate de cuenta atrás
  styles/global.css
  layouts/LegalLayout.astro
  assets/
    fotos/                     # fotos reales del local (mural astronauta, murales, barra)
    decor/                     # gráficos de stock (coco, blob, mandala) — acentos de bajo protagonismo
  components/
    SEO.astro                  # <head> común: title, description, canonical, OG, Twitter, favicons, JSON-LD BarOrPub
    Marca.astro                # wordmark "Taberna / SIGLO XXI" (sustituye a la píldora con corona)
    Header.astro  Hero.astro  Carta.astro  Eventos.astro
    Galeria.astro  Visitanos.astro  Footer.astro
    NeonIcon.astro  WhatsAppBubble.astro
  pages/
    index.astro                # home real (prerender:false)
    countdown.astro             # única página prerenderizada (exenta del gate); tras la apertura redirige a /
    reservas.astro              # placeholder (CTA a WhatsApp) — formulario real es Fase 3
    404.astro                   # prerender:false
    aviso-legal.astro  privacidad.astro  cookies.astro   # placeholders con noindex, prerender:false
    wireframe.astro  preview-neon.astro                   # solo en dev (404 en producción)
    sitemap.xml.ts  robots.txt.ts                         # generados desde site.url
public/  favicon.ico  favicon.svg  apple-touch-icon.png  og.jpg (1200×630)
```
Pendiente aún (no construido): `lib/calendar.ts`, `lib/whatsapp.ts`, `lib/fechas.ts`,
`api/disponibilidad.ts`, `api/reservas.ts`, `ReservaForm.astro` (Fase 3), `scripts/qr.mjs`
y `_redirects` para `/resena` y `/qr` (Fase 4 — necesitan Place ID / enlace real de reseñas).

## Roadmap
### Fase 0 — Setup ✅
- [x] Astro 7 + Tailwind v4 + adaptador de Netlify en `C:\Users\adria\Desktop\SigloXXI`
- [x] `git init`, `.gitignore` (incluye `.env`), `.env.example`
- [x] `src/config/site.ts` y `global.css` con los tokens neón
- [x] Notas base en Obsidian (`00-Indice`, `Decisiones`, `Pendientes`, `Wireframes`, `Cliente`)

### Fase 1 — Wireframes navegables ✅
- [x] `src/pages/wireframe.astro`: todas las secciones en escala de grises, sin glow
- [ ] Revisar a 375 px y 1280 px con ojo humano; anotar cambios en `Wireframes.md`

### Fase 2 — Landing de inauguración ✅ construida, falta deploy
- [x] Identidad neón aplicada sobre la estructura validada
- [x] Hero con inauguración (cambio automático de contenido a partir del 04/10/2026)
- [x] Gate de cuenta atrás hasta el 03/10/2026 (ver sección arriba)
- [x] Home real con fotos reales del local, menú hamburguesa, orden Carta → Galería → Eventos → Ubícanos
- [x] Páginas legales con placeholders
- [x] JSON-LD `BarOrPub`, meta OG (imagen del mural), favicon con corona, sitemap, robots, 404
- [x] Deploy en Netlify (https://sigoxxi.netlify.app, cuenta de Adri, auto-deploy desde `main`)
- [ ] DNS del dominio definitivo (lo contrata el cliente) + actualizar `site.url`
- [ ] Revisar visualmente en navegador (375px y escritorio) — solo verificado por build/curl hasta ahora

### Fase 3 — Reservas
- [ ] `lib/calendar.ts`, `lib/whatsapp.ts`, `lib/fechas.ts`, endpoints de la API
- [ ] `ReservaForm.astro` con flatpickr (de momento `/reservas` es un placeholder con CTA a WhatsApp)
- [ ] Pruebas con un calendario de test antes de usar el real

### Fase 4 — Extras
- [ ] QR web y reseñas (`scripts/qr.mjs` + `_redirects`) — necesita Place ID / enlace de reseñas real
- [ ] Carta con precios editable
- [ ] Reservas parciales, Turnstile, expiración de pendientes
