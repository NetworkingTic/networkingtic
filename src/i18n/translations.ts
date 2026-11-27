// Todos los textos del sitio en español e inglés.
// Para cambiar un texto, edítalo aquí en los dos idiomas.

export type Lang = "es" | "en";

const es = {
  meta: {
    home: "NetWorking TIC | Infraestructura IT, redes y ciberseguridad en Bogotá",
    services: "Servicios | NetWorking TIC",
    partners: "Partner Kaspersky | NetWorking TIC",
    about: "Nosotros | NetWorking TIC",
    contact: "Contacto | NetWorking TIC",
  },
  nav: {
    home: "Inicio",
    services: "Servicios",
    partners: "Kaspersky",
    about: "Nosotros",
    contact: "Contacto",
    cta: "Hablemos",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    language: "Idioma",
    switchToLight: "Cambiar a tema claro",
    switchToDark: "Cambiar a tema oscuro",
  },
  hero: {
    title: "Su infraestructura tecnológica, estable, segura y siempre en línea.",
    lead:
      "Diseñamos, implementamos y mantenemos la red, los servidores y la seguridad de su empresa, para que su equipo trabaje sin interrupciones y usted no tenga que pensar en ello.",
    primary: "Solicitar un diagnóstico",
    secondary: "Ver servicios",
    status: "Monitoreo y soporte 24/7",
    nodes: {
      internet: "Internet",
      firewall: "Firewall",
      core: "Red principal",
      servers: "Servidores",
      storage: "Almacenamiento",
      users: "Equipos",
    },
  },
  facts: [
    { title: "Partner oficial Kaspersky", text: "Licenciamiento y soporte certificado" },
    { title: "Soporte 24/7", text: "Atención remota y en sitio" },
    { title: "On-premise y nube", text: "Soluciones híbridas a la medida" },
    { title: "Bogotá, Colombia", text: "Cobertura nacional" },
  ],
  servicesSection: {
    title: "Servicios",
    lead:
      "Cubrimos toda la base tecnológica de una empresa: desde el cable que llega a cada puesto hasta la protección de sus datos.",
    more: "Ver detalle",
    all: "Ver todos los servicios",
    groups: {
      infra: "Infraestructura",
      network: "Redes",
      protection: "Protección y soporte",
    },
  },
  process: {
    title: "Cómo trabajamos",
    lead: "Un proceso claro, con un responsable desde el primer día.",
    steps: [
      {
        title: "Diagnóstico",
        text: "Visitamos su empresa, revisamos la red, los equipos y los riesgos actuales, y le entregamos un informe claro.",
      },
      {
        title: "Propuesta",
        text: "Le presentamos una solución con alcance, tiempos y costos definidos, priorizando lo que más impacta su operación.",
      },
      {
        title: "Implementación",
        text: "Ejecutamos el proyecto con mínima interrupción, documentando cada configuración y cada equipo instalado.",
      },
      {
        title: "Soporte continuo",
        text: "Monitoreamos, mantenemos y atendemos incidentes para que la infraestructura siga funcionando como el primer día.",
      },
    ],
  },
  partnerBand: {
    title: "Somos partner oficial de Kaspersky",
    text:
      "Implementamos y administramos las soluciones de seguridad de Kaspersky con respaldo directo del fabricante.",
    cta: "Conocer la alianza",
  },
  contactBand: {
    title: "¿Su red, sus servidores o su seguridad necesitan atención?",
    text: "Cuéntenos qué está pasando. Le respondemos el mismo día hábil.",
  },
  servicesPage: {
    title: "Servicios",
    lead:
      "Soluciones de infraestructura, redes y seguridad para empresas que necesitan que la tecnología simplemente funcione.",
    includes: "Qué incluye",
    cta: "Solicitar este servicio",
  },
  partnersPage: {
    title: "Partner oficial de Kaspersky",
    lead:
      "Como partner de uno de los referentes mundiales en ciberseguridad, llevamos a su empresa la protección de Kaspersky con implementación, administración y soporte locales.",
    benefitsTitle: "Lo que obtiene su empresa",
    benefits: [
      {
        title: "Protección avanzada",
        text: "Defensa contra malware, ransomware, phishing y amenazas de día cero en equipos, servidores y correo.",
      },
      {
        title: "Configuración a la medida",
        text: "Ajustamos las políticas de seguridad a su operación para proteger sin frenar a sus usuarios.",
      },
      {
        title: "Soporte especializado",
        text: "Atención directa de nuestro equipo, con escalamiento prioritario al fabricante cuando se necesita.",
      },
      {
        title: "Siempre actualizado",
        text: "Administramos licencias, versiones y actualizaciones para que su protección nunca quede atrás.",
      },
    ],
    closing: "Un equipo comprometido con la seguridad de su negocio, respaldado por la tecnología de Kaspersky.",
    cta: "Cotizar licencias Kaspersky",
  },
  aboutPage: {
    title: "Nosotros",
    lead:
      "NETWORKING TIC S.A.S es una empresa colombiana de servicios de tecnología. Acompañamos a las organizaciones en el diseño, la operación y la protección de su infraestructura.",
    missionTitle: "Misión",
    mission:
      "Facilitar, mejorar y optimizar los procesos y la gestión de nuestros clientes mediante la implementación de tecnologías seguras, protegiendo sus datos con sistemas confiables y ofreciendo soluciones integrales e inteligentes con altos estándares de calidad.",
    visionTitle: "Visión",
    vision:
      "Ser una empresa reconocida a nivel nacional e internacional, líder en soluciones innovadoras y en la implementación de tecnologías seguras.",
    valuesTitle: "Lo que nos define",
    values: [
      { title: "Responsabilidad", text: "Cada proyecto tiene un responsable que responde por él de principio a fin." },
      { title: "Seguridad primero", text: "La protección de la información guía cada decisión técnica que tomamos." },
      { title: "Claridad", text: "Explicamos qué hacemos y por qué, sin tecnicismos innecesarios." },
      { title: "Cercanía", text: "Conocemos a nuestros clientes y su operación; no somos un número de ticket." },
    ],
  },
  contactPage: {
    title: "Contacto",
    lead: "Escríbanos por el formulario o por el canal que prefiera. Le respondemos el mismo día hábil.",
    channels: "Canales directos",
    whatsapp: "WhatsApp",
    phone: "Teléfono",
    location: "Ubicación",
    locationValue: "Bogotá, Colombia",
  },
  form: {
    title: "Envíenos un mensaje",
    name: "Nombre",
    email: "Correo electrónico",
    company: "Empresa",
    phone: "Teléfono",
    city: "Ciudad",
    message: "¿En qué podemos ayudarle?",
    submit: "Enviar mensaje",
    sending: "Enviando...",
    success: "Mensaje enviado. Le contactaremos pronto.",
    error: "No se pudo enviar el mensaje. Revise su conexión o escríbanos por WhatsApp.",
    errors: {
      name: "Escriba su nombre",
      email: "Escriba su correo",
      emailInvalid: "Revise el correo, parece incompleto",
      phone: "Revise el número de teléfono",
      message: "Cuéntenos brevemente qué necesita",
    },
  },
  footer: {
    tagline: "Infraestructura IT, redes y ciberseguridad para empresas.",
    sitemap: "Mapa del sitio",
    contact: "Contacto",
    social: "Redes sociales",
    rights: "Todos los derechos reservados.",
  },
  whatsapp: {
    label: "Escríbanos por WhatsApp",
    message: "Hola NetWorking TIC, quisiera información sobre sus servicios.",
  },
  dialog: { close: "Cerrar" },
};

export type Dictionary = typeof es;

const en: Dictionary = {
  meta: {
    home: "NetWorking TIC | IT infrastructure, networking and cybersecurity in Bogotá",
    services: "Services | NetWorking TIC",
    partners: "Kaspersky Partner | NetWorking TIC",
    about: "About us | NetWorking TIC",
    contact: "Contact | NetWorking TIC",
  },
  nav: {
    home: "Home",
    services: "Services",
    partners: "Kaspersky",
    about: "About",
    contact: "Contact",
    cta: "Let's talk",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    language: "Language",
    switchToLight: "Switch to light theme",
    switchToDark: "Switch to dark theme",
  },
  hero: {
    title: "Your IT infrastructure, stable, secure and always online.",
    lead:
      "We design, deploy and maintain your company's network, servers and security, so your team works without interruptions and you don't have to think about it.",
    primary: "Request an assessment",
    secondary: "See services",
    status: "24/7 monitoring and support",
    nodes: {
      internet: "Internet",
      firewall: "Firewall",
      core: "Core network",
      servers: "Servers",
      storage: "Storage",
      users: "Workstations",
    },
  },
  facts: [
    { title: "Official Kaspersky partner", text: "Certified licensing and support" },
    { title: "24/7 support", text: "Remote and on-site service" },
    { title: "On-premise and cloud", text: "Tailored hybrid solutions" },
    { title: "Bogotá, Colombia", text: "Nationwide coverage" },
  ],
  servicesSection: {
    title: "Services",
    lead:
      "We cover a company's entire technology foundation: from the cable that reaches each desk to the protection of your data.",
    more: "View details",
    all: "See all services",
    groups: {
      infra: "Infrastructure",
      network: "Networking",
      protection: "Protection and support",
    },
  },
  process: {
    title: "How we work",
    lead: "A clear process, with one accountable lead from day one.",
    steps: [
      {
        title: "Assessment",
        text: "We visit your company, review the network, equipment and current risks, and hand you a clear report.",
      },
      {
        title: "Proposal",
        text: "We present a solution with defined scope, timeline and cost, prioritizing what most affects your operation.",
      },
      {
        title: "Implementation",
        text: "We carry out the project with minimal disruption, documenting every configuration and every device installed.",
      },
      {
        title: "Ongoing support",
        text: "We monitor, maintain and handle incidents so your infrastructure keeps running like it did on day one.",
      },
    ],
  },
  partnerBand: {
    title: "We are an official Kaspersky partner",
    text: "We deploy and manage Kaspersky security solutions with direct backing from the vendor.",
    cta: "About the partnership",
  },
  contactBand: {
    title: "Does your network, your servers or your security need attention?",
    text: "Tell us what's going on. We reply the same business day.",
  },
  servicesPage: {
    title: "Services",
    lead:
      "Infrastructure, networking and security solutions for companies that need technology to just work.",
    includes: "What's included",
    cta: "Request this service",
  },
  partnersPage: {
    title: "Official Kaspersky partner",
    lead:
      "As a partner of one of the world's leading cybersecurity companies, we bring Kaspersky protection to your business with local deployment, management and support.",
    benefitsTitle: "What your company gets",
    benefits: [
      {
        title: "Advanced protection",
        text: "Defense against malware, ransomware, phishing and zero-day threats on workstations, servers and email.",
      },
      {
        title: "Tailored configuration",
        text: "We tune security policies to your operation, protecting without slowing your users down.",
      },
      {
        title: "Specialized support",
        text: "Direct service from our team, with priority escalation to the vendor when needed.",
      },
      {
        title: "Always up to date",
        text: "We manage licenses, versions and updates so your protection never falls behind.",
      },
    ],
    closing: "A team committed to the security of your business, backed by Kaspersky technology.",
    cta: "Get a Kaspersky quote",
  },
  aboutPage: {
    title: "About us",
    lead:
      "NETWORKING TIC S.A.S is a Colombian technology services company. We help organizations design, run and protect their infrastructure.",
    missionTitle: "Mission",
    mission:
      "To facilitate, improve and optimize our clients' processes and management by implementing secure technologies, protecting their data with reliable systems and delivering comprehensive, intelligent solutions to high quality standards.",
    visionTitle: "Vision",
    vision:
      "To be a nationally and internationally recognized company, leading in innovative solutions and in the implementation of secure technologies.",
    valuesTitle: "What defines us",
    values: [
      { title: "Accountability", text: "Every project has one lead who owns it from start to finish." },
      { title: "Security first", text: "Protecting information guides every technical decision we make." },
      { title: "Clarity", text: "We explain what we do and why, without unnecessary jargon." },
      { title: "Closeness", text: "We know our clients and their operation; you are not a ticket number." },
    ],
  },
  contactPage: {
    title: "Contact",
    lead: "Write to us using the form or your preferred channel. We reply the same business day.",
    channels: "Direct channels",
    whatsapp: "WhatsApp",
    phone: "Phone",
    location: "Location",
    locationValue: "Bogotá, Colombia",
  },
  form: {
    title: "Send us a message",
    name: "Name",
    email: "Email",
    company: "Company",
    phone: "Phone",
    city: "City",
    message: "How can we help?",
    submit: "Send message",
    sending: "Sending...",
    success: "Message sent. We'll be in touch soon.",
    error: "The message could not be sent. Check your connection or reach us on WhatsApp.",
    errors: {
      name: "Enter your name",
      email: "Enter your email",
      emailInvalid: "Check the email, it looks incomplete",
      phone: "Check the phone number",
      message: "Briefly tell us what you need",
    },
  },
  footer: {
    tagline: "IT infrastructure, networking and cybersecurity for businesses.",
    sitemap: "Sitemap",
    contact: "Contact",
    social: "Social media",
    rights: "All rights reserved.",
  },
  whatsapp: {
    label: "Chat with us on WhatsApp",
    message: "Hello NetWorking TIC, I'd like information about your services.",
  },
  dialog: { close: "Close" },
};

export const dictionaries: Record<Lang, Dictionary> = { es, en };
