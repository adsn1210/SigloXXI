export const site = {
  nombre: "Taberna Siglo XXI",
  eslogan: "Bar · Tardeo · Copas",
  // TODO: cambiar por el dominio definitivo cuando el cliente lo contrate (canonical, OG, sitemap)
  url: "https://sigoxxi.netlify.app",

  seo: {
    titulo: "Taberna Siglo XXI · Bar de tardeo y copas en Parla",
    descripcion:
      "Bar de tardeo y copas en Parla (Madrid): cervezas, combinados y tapas bajo luz neón. Sesiones de DJ, cumpleaños y eventos. Jueves a domingo, 17:30–02:00.",
    // public/og.jpg — 1200×630, generada a partir del mural del astronauta
    imagen: "/og.jpg",
    imagenAlt: "Mural del astronauta en luz negra de Taberna Siglo XXI, Parla",
    colorTema: "#07030f",
  },
  instagram: "@tabernasxxi",
  instagramUrl: "https://instagram.com/tabernasxxi",

  direccion: {
    calle: "Calle Doctor Morcillo 38",
    localidad: "Parla (Madrid)",
    // datos estructurados (JSON-LD)
    municipio: "Parla",
    provincia: "Madrid",
    pais: "ES",
    // enlace oficial de la ficha de Google Maps facilitado por el cliente (2026-10-01)
    mapsUrl: "https://maps.app.goo.gl/Prj2M6chw3TcRu968",
    placeId: "",
  },

  horario: {
    dias: "Jueves a domingo",
    // schema.org (JSON-LD)
    diasSchema: ["Thursday", "Friday", "Saturday", "Sunday"],
    apertura: "17:30",
    cierre: "02:00",
  },

  contacto: {
    // Decisión 2026-09-30: se usa el teléfono de gestión también como WhatsApp público
    telefonoPublico: "603 712 724",
    telefonoInternacional: "+34603712724",
    whatsappUrl: "https://wa.me/34603712724",
  },

  inauguracion: {
    fecha: "2026-10-03",
    // a partir de esta fecha el hero deja de mostrar el mensaje de inauguración
    finMensaje: "2026-10-04",
    // instante exacto en que la web completa sustituye a la cuenta atrás (src/middleware.ts)
    gateSwitchAt: "2026-10-03T00:00:00+02:00",
  },

  oferta: [
    { icono: "cerveza", label: "Cervezas" },
    { icono: "copa", label: "Copas" },
    { icono: "coctelera", label: "Combinados" },
    { icono: "tapa", label: "Tapas" },
    { icono: "nota-musical", label: "Buen ambiente" },
  ],

  eventos: {
    tipos: ["Cumpleaños", "Sesiones de DJ", "Despedidas", "Empresa", "Partidos"],
    dj: {
      etiqueta: "Para DJs",
      titulo: "Tu sesión tiene sitio aquí",
      texto:
        "Si pinchas un sonido de nicho y buscas un local que lo entienda, hablemos. Ponemos la sala, la luz neón y un público con ganas de descubrir algo distinto.",
      cta: "Propón tu sesión",
      whatsappTexto: "Hola, soy DJ y me gustaría proponer una sesión en Taberna Siglo XXI.",
    },
    cumpleanos: {
      titulo: "Cumpleaños",
      texto: "Local completo o zona reservada, con pantallas si las necesitas. Tú pones la gente, nosotros el ambiente.",
    },
    opciones: [
      {
        titulo: "Pantallas para tus eventos",
        icono: "calendario",
      },
      {
        titulo: "Local completo o zona reservada",
        icono: "ubicacion",
      },
    ],
  },

  // TODO: pendiente de datos legales del cliente (titular, NIF, email de contacto legal)
  legal: {
    titular: "",
    nif: "",
    emailContacto: "",
  },
} as const;

export type Site = typeof site;
