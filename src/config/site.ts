export const site = {
  nombre: "Taberna Siglo XXI",
  eslogan: "Bar · Tardeo · Copas",
  instagram: "@tabernasxxi",
  instagramUrl: "https://instagram.com/tabernasxxi",

  direccion: {
    calle: "Calle Doctor Morcillo 38",
    localidad: "Parla (Madrid)",
    // enlace oficial de la ficha de Google Maps facilitado por el cliente (2026-10-01)
    mapsUrl: "https://maps.app.goo.gl/Prj2M6chw3TcRu968",
    placeId: "",
  },

  horario: {
    dias: "Jueves a domingo",
    apertura: "17:30",
    cierre: "02:00",
  },

  contacto: {
    // Decisión 2026-09-30: se usa el teléfono de gestión también como WhatsApp público
    telefonoPublico: "603 712 724",
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
