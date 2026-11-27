// Textos del módulo PARTNER (Kaspersky), en español e inglés.
// Las funciones de cada solución corresponden a la línea empresarial oficial Kaspersky Next.
import { Lang } from "./translations";

export type SolutionId = "foundations" | "edr-optimum" | "xdr-optimum" | "xdr-expert" | "security-center";
export type ThreatId = "ransomware" | "malware" | "phishing" | "network" | "apt";
export type AssetId = "workstations" | "servers" | "mobile" | "data";
export type NodeId = "endpoints" | "servers" | "mobile" | "cloud" | "mail" | "network";

type Solution = { id: SolutionId; tier: string; name: string; tagline: string; problem: string; how: string; benefit: string; features: string[] };

const es = {
  hero: {
    badge: "Partner oficial Kaspersky",
    title: "Detenga las amenazas antes de que toquen su negocio",
    lead:
      "Como partner oficial de Kaspersky, en NETWORKING TIC instalamos, configuramos y administramos la protección de sus equipos, servidores y datos. Usted se enfoca en su empresa; nosotros, en mantenerla segura.",
    primary: "Solicitar asesoría",
    secondary: "Ver soluciones",
    radarTitle: "Simulación de protección en tiempo real",
    blocked: "amenazas bloqueadas",
    simulation: "Simulación ilustrativa",
    status: "Sistema protegido",
  },
  flow: {
    title: "Protección inteligente, en tres movimientos",
    lead: "Así actúa la tecnología de Kaspersky cada vez que algo sospechoso intenta entrar a su red.",
    steps: [
      { title: "Detectar", text: "Analiza archivos, correos, sitios web y comportamientos con aprendizaje automático para reconocer amenazas conocidas y nuevas." },
      { title: "Bloquear", text: "Detiene el ataque en el instante, aísla el equipo afectado y revierte los cambios maliciosos antes de que se propaguen." },
      { title: "Prevenir", text: "Aprende de cada incidente, cierra la puerta con parches y políticas, y le muestra qué pasó para que no se repita." },
    ],
  },
  solutions: {
    title: "Soluciones Kaspersky Next para cada etapa de su empresa",
    lead: "Desde la protección esencial de cada equipo hasta la detección avanzada para grandes infraestructuras. Le ayudamos a elegir y la dejamos funcionando.",
    problem: "El problema",
    how: "Cómo le ayuda",
    benefit: "Lo que gana su empresa",
    features: "Incluye",
    select: "Ver detalle",
    items: [
      {
        id: "foundations",
        tier: "Esencial",
        name: "Kaspersky Next EDR Foundations",
        tagline: "La base sólida que todo equipo necesita",
        problem: "Un solo correo infectado o una memoria USB pueden paralizar a toda la oficina.",
        how: "Protege cada computador con detección basada en aprendizaje automático, anti-ransomware y análisis de la causa de cada ataque.",
        benefit: "Equipos protegidos desde el primer día, administrados desde una consola en la nube o local.",
        features: ["Protección de endpoints con aprendizaje automático", "Anti-ransomware", "Análisis de causa raíz", "Consola en la nube o local"],
      },
      {
        id: "edr-optimum",
        tier: "Intermedio",
        name: "Kaspersky Next EDR Optimum",
        tagline: "Vea, entienda y responda a los ataques",
        problem: "Los ataques modernos se esconden; un antivirus tradicional no le dice cómo entraron ni qué tocaron.",
        how: "Suma detección y respuesta (EDR): visibilidad de lo que ocurre en cada equipo, respuesta automatizada, controles avanzados y gestión de parches.",
        benefit: "Menos tiempo resolviendo incidentes y menos huecos de seguridad por actualizaciones pendientes.",
        features: ["Detección y respuesta (EDR) esencial", "Respuesta automatizada", "Gestión de parches", "Controles avanzados y seguridad en la nube"],
      },
      {
        id: "xdr-optimum",
        tier: "Avanzado",
        name: "Kaspersky Next XDR Optimum",
        tagline: "Protección que va más allá de los equipos",
        problem: "Las señales de un ataque quedan dispersas entre equipos, correo, usuarios y nube.",
        how: "Une esas señales en alertas centralizadas, con visibilidad de Active Directory y análisis de archivos sospechosos en un entorno aislado en la nube (Cloud Sandbox).",
        benefit: "Detecta antes los ataques complejos y su equipo de TI trabaja con una imagen clara, no con cientos de avisos sueltos.",
        features: ["Alertas centralizadas", "Visibilidad de Active Directory", "Cloud Sandbox", "Detección extendida (XDR)"],
      },
      {
        id: "xdr-expert",
        tier: "Corporativo",
        name: "Kaspersky Next XDR Expert",
        tagline: "Inteligencia de amenazas para grandes infraestructuras",
        problem: "En organizaciones grandes, el volumen de eventos supera la capacidad de cualquier equipo humano.",
        how: "Plataforma XDR abierta que reúne, analiza y correlaciona datos de múltiples fuentes, con EDR, XDR y SIEM en una sola consola.",
        benefit: "Visibilidad total y respuesta coordinada a ataques dirigidos, con la tecnología que usan los centros de operaciones de seguridad.",
        features: ["Plataforma XDR abierta", "Correlación de datos de múltiples fuentes", "EDR, XDR y SIEM en una consola", "Funciones con inteligencia artificial"],
      },
      {
        id: "security-center",
        tier: "Administración",
        name: "Kaspersky Security Center",
        tagline: "Toda su seguridad, desde un solo lugar",
        problem: "Revisar equipo por equipo es lento, costoso y deja puntos ciegos.",
        how: "Consola centralizada para desplegar la protección, aplicar políticas, revisar el estado de cada dispositivo y generar informes.",
        benefit: "Control total de la seguridad de su empresa con menos trabajo manual. Nosotros podemos administrarla por usted.",
        features: ["Despliegue centralizado", "Políticas por grupos de equipos", "Estado de cada dispositivo", "Informes de seguridad"],
      },
    ] as Solution[],
  },
  threats: {
    title: "Amenazas que detenemos",
    lead: "Estas son las formas más comunes en que una empresa pierde información, dinero o días de trabajo. Cada una tiene su defensa.",
    detected: "Detectado",
    blocked: "Bloqueado",
    items: [
      { id: "ransomware", name: "Ransomware", text: "Secuestra sus archivos y pide un rescate. Lo bloqueamos antes de que cifre y revertimos los cambios." },
      { id: "malware", name: "Malware", text: "Virus, troyanos y programas espía que roban datos o dañan equipos. Se detectan incluso los nuevos." },
      { id: "phishing", name: "Phishing", text: "Correos y páginas falsas que engañan a su equipo para robar claves. Se detectan y bloquean antes de que hagan daño." },
      { id: "network", name: "Ataques de red", text: "Intentos de entrar por puertos abiertos o equipos sin actualizar. El firewall y los parches los cierran." },
      { id: "apt", name: "Amenazas avanzadas", text: "Ataques dirigidos y silenciosos que buscan quedarse meses. La detección y respuesta los saca a la luz." },
    ] as { id: ThreatId; name: string; text: string }[],
  },
  assets: {
    title: "Seguridad para toda su empresa",
    lead: "Cada punto de su infraestructura queda cubierto, con la misma consola y el mismo equipo de soporte.",
    active: "Protección activa",
    items: [
      { id: "workstations", name: "Estaciones de trabajo", text: "Computadores Windows y macOS protegidos frente a malware, ransomware y sitios peligrosos.", points: ["Antimalware", "Control web", "Cifrado"] },
      { id: "servers", name: "Servidores", text: "Protección para sus servidores sin frenar el rendimiento de los servicios críticos.", points: ["Antiransomware", "Firewall", "Parches"] },
      { id: "mobile", name: "Dispositivos móviles", text: "Celulares Android e iOS de la empresa con protección y control en caso de pérdida.", points: ["Antirrobo", "Control de apps", "Políticas"] },
      { id: "data", name: "Datos corporativos", text: "La información de su empresa resguardada frente a robo y secuestro, con cifrado y control de lo que se conecta.", points: ["Cifrado", "Antirransomware", "Control de dispositivos"] },
    ] as { id: AssetId; name: string; text: string; points: string[] }[],
  },
  center: {
    title: "Centro de protección",
    lead: "Así se ve su empresa protegida: cada componente conectado a una consola central que vigila, alerta y responde. Toque un punto para explorarlo.",
    console: "Consola central",
    status: "Protegido",
    hint: "Seleccione un componente",
    nodes: [
      { id: "endpoints", name: "Equipos", text: "Cada computador reporta su estado y recibe políticas y actualizaciones automáticamente." },
      { id: "servers", name: "Servidores", text: "Monitoreo continuo de los servidores, con respuesta inmediata ante comportamientos extraños." },
      { id: "mobile", name: "Móviles", text: "Los celulares corporativos siguen las mismas reglas de seguridad que la oficina." },
      { id: "cloud", name: "Nube", text: "Visibilidad y protección de los servicios en la nube que usa su equipo." },
      { id: "mail", name: "Correo", text: "Filtrado de adjuntos y enlaces maliciosos antes de que alguien haga clic." },
      { id: "network", name: "Red", text: "Firewall y protección contra ataques de red en cada punto de conexión." },
    ] as { id: NodeId; name: string; text: string }[],
  },
  cta: {
    title: "¿Qué tan protegida está su empresa hoy?",
    text: "Cuéntenos cuántos equipos y servidores tiene. Le recomendamos el nivel de Kaspersky Next adecuado y nos encargamos de la implementación.",
    primary: "Cotizar licencias Kaspersky",
    secondary: "Escribir por WhatsApp",
    whatsapp: "Hola NetWorking TIC, quiero información sobre las soluciones Kaspersky para mi empresa.",
  },
};

export type PartnerContent = typeof es;

const en: PartnerContent = {
  hero: {
    badge: "Official Kaspersky partner",
    title: "Stop threats before they reach your business",
    lead:
      "As an official Kaspersky partner, NETWORKING TIC deploys, configures and manages the protection of your devices, servers and data. You focus on your company; we keep it safe.",
    primary: "Request a consultation",
    secondary: "See solutions",
    radarTitle: "Real-time protection simulation",
    blocked: "threats blocked",
    simulation: "Illustrative simulation",
    status: "System protected",
  },
  flow: {
    title: "Intelligent protection, in three moves",
    lead: "This is how Kaspersky technology acts every time something suspicious tries to get into your network.",
    steps: [
      { title: "Detect", text: "Analyzes files, email, websites and behavior with machine learning to recognize known and new threats." },
      { title: "Block", text: "Stops the attack instantly, isolates the affected device and rolls back malicious changes before they spread." },
      { title: "Prevent", text: "Learns from every incident, closes the gap with patches and policies, and shows you what happened so it doesn't repeat." },
    ],
  },
  solutions: {
    title: "Kaspersky Next solutions for every stage of your business",
    lead: "From essential protection on every device to advanced detection for large infrastructures. We help you choose and leave it running.",
    problem: "The problem",
    how: "How it helps",
    benefit: "What your company gains",
    features: "Includes",
    select: "View details",
    items: [
      {
        id: "foundations",
        tier: "Essential",
        name: "Kaspersky Next EDR Foundations",
        tagline: "The solid foundation every device needs",
        problem: "A single infected email or USB drive can bring the whole office to a halt.",
        how: "Protects every computer with machine-learning detection, anti-ransomware and root cause analysis of each attack.",
        benefit: "Devices protected from day one, managed from a cloud or on-premises console.",
        features: ["Machine-learning endpoint protection", "Anti-ransomware", "Root cause analysis", "Cloud or on-premises console"],
      },
      {
        id: "edr-optimum",
        tier: "Intermediate",
        name: "Kaspersky Next EDR Optimum",
        tagline: "See, understand and respond to attacks",
        problem: "Modern attacks hide; a traditional antivirus won't tell you how they got in or what they touched.",
        how: "Adds detection and response (EDR): visibility into each device, automated response, advanced controls and patch management.",
        benefit: "Less time resolving incidents and fewer security gaps from pending updates.",
        features: ["Essential EDR", "Automated response", "Patch management", "Advanced controls and cloud security"],
      },
      {
        id: "xdr-optimum",
        tier: "Advanced",
        name: "Kaspersky Next XDR Optimum",
        tagline: "Protection beyond the endpoint",
        problem: "Signs of an attack are scattered across devices, email, users and the cloud.",
        how: "Brings those signals together in centralized alerts, with Active Directory visibility and analysis of suspicious files in an isolated cloud environment (Cloud Sandbox).",
        benefit: "Complex attacks are detected sooner and your IT team works from a clear picture, not hundreds of loose alerts.",
        features: ["Centralized alerts", "Active Directory visibility", "Cloud Sandbox", "Extended detection (XDR)"],
      },
      {
        id: "xdr-expert",
        tier: "Enterprise",
        name: "Kaspersky Next XDR Expert",
        tagline: "Threat intelligence for large infrastructures",
        problem: "In large organizations, the volume of events exceeds what any human team can handle.",
        how: "An open XDR platform that gathers, analyzes and correlates data from multiple sources, with EDR, XDR and SIEM in a single console.",
        benefit: "Full visibility and coordinated response to targeted attacks, with the technology used by security operations centers.",
        features: ["Open XDR platform", "Multi-source data correlation", "EDR, XDR and SIEM in one console", "AI-powered features"],
      },
      {
        id: "security-center",
        tier: "Management",
        name: "Kaspersky Security Center",
        tagline: "All your security, from one place",
        problem: "Checking device by device is slow, costly and leaves blind spots.",
        how: "A centralized console to deploy protection, apply policies, review the status of every device and generate reports.",
        benefit: "Full control of your company's security with less manual work. We can manage it for you.",
        features: ["Centralized deployment", "Policies by device group", "Status of every device", "Security reports"],
      },
    ] as Solution[],
  },
  threats: {
    title: "Threats we stop",
    lead: "These are the most common ways a company loses information, money or working days. Each one has its defense.",
    detected: "Detected",
    blocked: "Blocked",
    items: [
      { id: "ransomware", name: "Ransomware", text: "Locks your files and demands a ransom. We block it before it encrypts and roll back the changes." },
      { id: "malware", name: "Malware", text: "Viruses, trojans and spyware that steal data or damage devices. Even new ones are detected." },
      { id: "phishing", name: "Phishing", text: "Fake emails and pages that trick your team into giving away passwords. Detected and blocked before they do harm." },
      { id: "network", name: "Network attacks", text: "Attempts to get in through open ports or outdated devices. The firewall and patches close them off." },
      { id: "apt", name: "Advanced threats", text: "Targeted, silent attacks that try to stay for months. Detection and response bring them to light." },
    ] as { id: ThreatId; name: string; text: string }[],
  },
  assets: {
    title: "Security for your whole company",
    lead: "Every point of your infrastructure is covered, with the same console and the same support team.",
    active: "Protection active",
    items: [
      { id: "workstations", name: "Workstations", text: "Windows and macOS computers protected against malware, ransomware and dangerous websites.", points: ["Anti-malware", "Web control", "Encryption"] },
      { id: "servers", name: "Servers", text: "Protection for your servers without slowing down critical services.", points: ["Anti-ransomware", "Firewall", "Patches"] },
      { id: "mobile", name: "Mobile devices", text: "Company Android and iOS phones protected and under control if lost.", points: ["Anti-theft", "App control", "Policies"] },
      { id: "data", name: "Corporate data", text: "Your company's information safeguarded against theft and ransom, with encryption and control over what connects.", points: ["Encryption", "Anti-ransomware", "Device control"] },
    ] as { id: AssetId; name: string; text: string; points: string[] }[],
  },
  center: {
    title: "Protection center",
    lead: "This is your company, protected: every component connected to a central console that watches, alerts and responds. Tap a point to explore it.",
    console: "Central console",
    status: "Protected",
    hint: "Select a component",
    nodes: [
      { id: "endpoints", name: "Devices", text: "Every computer reports its status and receives policies and updates automatically." },
      { id: "servers", name: "Servers", text: "Continuous server monitoring, with immediate response to unusual behavior." },
      { id: "mobile", name: "Mobile", text: "Company phones follow the same security rules as the office." },
      { id: "cloud", name: "Cloud", text: "Visibility and protection for the cloud services your team uses." },
      { id: "mail", name: "Email", text: "Malicious attachments and links filtered before anyone clicks." },
      { id: "network", name: "Network", text: "Firewall and protection against network attacks at every connection point." },
    ] as { id: NodeId; name: string; text: string }[],
  },
  cta: {
    title: "How protected is your company today?",
    text: "Tell us how many devices and servers you have. We'll recommend the right Kaspersky Next level and take care of the implementation.",
    primary: "Get a Kaspersky quote",
    secondary: "Message us on WhatsApp",
    whatsapp: "Hello NetWorking TIC, I'd like information about Kaspersky solutions for my company.",
  },
};

export const partnerContent: Record<Lang, PartnerContent> = { es, en };
