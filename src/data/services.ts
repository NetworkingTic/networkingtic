// Los 8 servicios del sitio, con sus textos en español e inglés.
import { Lang } from "../i18n/translations";

import imgVirtualizacion from "@assets/virtualizacion_popup.jpg";
import imgRedes from "@assets/redes_popup.jpg";
import imgMantenimiento from "@assets/mantenimiento_2_popup.jpg";
import imgSeguridad from "@assets/seguridadIT_popup.jpg";
import imgAlmacenamiento from "@assets/sistemasAlmacenamiento.webp";
import imgSoporte from "@assets/soporte.jpg";
import imgCableado from "@assets/cableadoEstructurado.jpg";
import imgWindows from "@assets/windowsServerPopup.jpg";

export type ServiceGroup = "infra" | "network" | "protection";

type ServiceText = {
  name: string;
  summary: string;
  description: string;
  includes: string[];
};

export type Service = {
  id: string;
  group: ServiceGroup;
  image: string;
  text: Record<Lang, ServiceText>;
};

export const services: Service[] = [
  {
    id: "virtualizacion",
    group: "infra",
    image: imgVirtualizacion,
    text: {
      es: {
        name: "Virtualización",
        summary: "Más servidores en menos hardware, con alta disponibilidad.",
        description:
          "Consolidamos sus servidores físicos en plataformas virtuales con VMware o Hyper-V. Reduce costos de hardware y energía, acelera la puesta en marcha de nuevos sistemas y permite recuperar un servicio en minutos ante una falla.",
        includes: [
          "Diseño y dimensionamiento de la plataforma",
          "Migración de servidores físicos a virtuales",
          "Alta disponibilidad y respaldos de máquinas virtuales",
          "Monitoreo de rendimiento y capacidad",
        ],
      },
      en: {
        name: "Virtualization",
        summary: "More servers on less hardware, with high availability.",
        description:
          "We consolidate your physical servers onto virtual platforms with VMware or Hyper-V. It cuts hardware and energy costs, speeds up the rollout of new systems and lets you restore a service within minutes after a failure.",
        includes: [
          "Platform design and sizing",
          "Physical-to-virtual server migration",
          "High availability and virtual machine backups",
          "Performance and capacity monitoring",
        ],
      },
    },
  },
  {
    id: "windows-server",
    group: "infra",
    image: imgWindows,
    text: {
      es: {
        name: "Windows Server y Active Directory",
        summary: "Usuarios, equipos y permisos administrados desde un solo lugar.",
        description:
          "Implementamos y administramos Windows Server y Active Directory para centralizar el acceso de su empresa: cada persona entra con una sola cuenta, los permisos se controlan por área y los equipos reciben políticas de seguridad automáticamente.",
        includes: [
          "Instalación y migración de controladores de dominio",
          "Diseño de unidades organizativas, grupos y permisos",
          "Políticas de grupo (GPO) de seguridad y configuración",
          "Servidores de archivos, DNS y DHCP",
        ],
      },
      en: {
        name: "Windows Server and Active Directory",
        summary: "Users, devices and permissions managed from one place.",
        description:
          "We deploy and manage Windows Server and Active Directory to centralize access across your company: each person signs in with one account, permissions are controlled by department and devices receive security policies automatically.",
        includes: [
          "Domain controller installation and migration",
          "Organizational unit, group and permission design",
          "Security and configuration Group Policies (GPO)",
          "File, DNS and DHCP servers",
        ],
      },
    },
  },
  {
    id: "almacenamiento",
    group: "infra",
    image: imgAlmacenamiento,
    text: {
      es: {
        name: "Almacenamiento y respaldo",
        summary: "Su información disponible, protegida y recuperable.",
        description:
          "Diseñamos sistemas de almacenamiento (NAS y SAN) y esquemas de respaldo que combinan copias locales y en la nube. Si un equipo falla, ocurre un error humano o un ataque de ransomware, su información se puede recuperar.",
        includes: [
          "Implementación de NAS y SAN",
          "Políticas de respaldo local y en la nube",
          "Pruebas periódicas de restauración",
          "Planes de recuperación ante desastres",
        ],
      },
      en: {
        name: "Storage and backup",
        summary: "Your information available, protected and recoverable.",
        description:
          "We design storage systems (NAS and SAN) and backup schemes that combine local and cloud copies. If a device fails, someone makes a mistake or ransomware strikes, your information can be recovered.",
        includes: [
          "NAS and SAN deployment",
          "Local and cloud backup policies",
          "Regular restore testing",
          "Disaster recovery plans",
        ],
      },
    },
  },
  {
    id: "redes",
    group: "network",
    image: imgRedes,
    text: {
      es: {
        name: "Redes de datos y seguridad perimetral",
        summary: "Una red rápida, segmentada y protegida desde el borde.",
        description:
          "Diseñamos y configuramos la red de su empresa: switches, Wi-Fi corporativo, firewalls y VPN para trabajo remoto. Separamos el tráfico por áreas y controlamos lo que entra y sale para reducir el riesgo de intrusiones.",
        includes: [
          "Diseño de red LAN, WAN y Wi-Fi corporativo",
          "Configuración de firewalls y VPN",
          "Segmentación por VLAN",
          "Diagnóstico y solución de lentitud o caídas",
        ],
      },
      en: {
        name: "Data networks and perimeter security",
        summary: "A fast, segmented network protected at the edge.",
        description:
          "We design and configure your company network: switches, corporate Wi-Fi, firewalls and VPN for remote work. We separate traffic by department and control what comes in and goes out to reduce the risk of intrusion.",
        includes: [
          "LAN, WAN and corporate Wi-Fi design",
          "Firewall and VPN configuration",
          "VLAN segmentation",
          "Troubleshooting slowdowns and outages",
        ],
      },
    },
  },
  {
    id: "cableado",
    group: "network",
    image: imgCableado,
    text: {
      es: {
        name: "Cableado estructurado",
        summary: "La base física de su red, ordenada y certificada.",
        description:
          "Instalamos cableado estructurado de cobre y fibra óptica bajo estándares de la industria, con racks organizados, puntos marcados y certificación de cada enlace. Una base física ordenada evita fallas y facilita cualquier cambio futuro.",
        includes: [
          "Diseño e instalación de puntos de red",
          "Fibra óptica y cableado de categoría 6 / 6A",
          "Organización de racks y centros de cableado",
          "Certificación y documentación de enlaces",
        ],
      },
      en: {
        name: "Structured cabling",
        summary: "The physical foundation of your network, tidy and certified.",
        description:
          "We install copper and fiber-optic structured cabling to industry standards, with organized racks, labeled outlets and certification of every link. A tidy physical foundation prevents failures and makes any future change easier.",
        includes: [
          "Network outlet design and installation",
          "Fiber optics and Category 6 / 6A cabling",
          "Rack and wiring closet organization",
          "Link certification and documentation",
        ],
      },
    },
  },
  {
    id: "seguridad",
    group: "protection",
    image: imgSeguridad,
    text: {
      es: {
        name: "Ciberseguridad",
        summary: "Protección de equipos, servidores y datos frente a amenazas.",
        description:
          "Evaluamos los riesgos de su empresa e implementamos las defensas adecuadas: protección de equipos y servidores, control de accesos, actualizaciones y concientización del personal. Como partners de Kaspersky, contamos con tecnología de primer nivel.",
        includes: [
          "Evaluación de vulnerabilidades y riesgos",
          "Antivirus y EDR corporativo Kaspersky",
          "Gestión de parches y actualizaciones",
          "Capacitación del personal en seguridad",
        ],
      },
      en: {
        name: "Cybersecurity",
        summary: "Protecting devices, servers and data against threats.",
        description:
          "We assess your company's risks and put the right defenses in place: endpoint and server protection, access control, updates and staff awareness. As Kaspersky partners, we work with first-class technology.",
        includes: [
          "Vulnerability and risk assessment",
          "Kaspersky corporate antivirus and EDR",
          "Patch and update management",
          "Staff security awareness training",
        ],
      },
    },
  },
  {
    id: "mantenimiento",
    group: "protection",
    image: imgMantenimiento,
    text: {
      es: {
        name: "Mantenimiento de hardware",
        summary: "Equipos que duran más y fallan menos.",
        description:
          "Realizamos mantenimiento preventivo y correctivo a computadores, servidores e impresoras. Detectamos desgaste antes de que cause una falla y prolongamos la vida útil de sus equipos.",
        includes: [
          "Mantenimiento preventivo programado",
          "Diagnóstico y reparación de fallas",
          "Actualización de componentes",
          "Inventario y hoja de vida de equipos",
        ],
      },
      en: {
        name: "Hardware maintenance",
        summary: "Equipment that lasts longer and fails less.",
        description:
          "We carry out preventive and corrective maintenance on computers, servers and printers. We catch wear before it causes a failure and extend the useful life of your equipment.",
        includes: [
          "Scheduled preventive maintenance",
          "Fault diagnosis and repair",
          "Component upgrades",
          "Equipment inventory and service history",
        ],
      },
    },
  },
  {
    id: "soporte",
    group: "protection",
    image: imgSoporte,
    text: {
      es: {
        name: "Soporte técnico especializado",
        summary: "Un equipo que responde cuando lo necesita, 24/7.",
        description:
          "Atendemos a sus usuarios y a su infraestructura de forma remota y en sitio. Monitoreamos los sistemas para anticipar problemas y resolverlos antes de que afecten su operación.",
        includes: [
          "Mesa de ayuda remota y en sitio",
          "Monitoreo proactivo de servidores y red",
          "Atención de incidentes 24/7",
          "Informes periódicos de estado",
        ],
      },
      en: {
        name: "Specialized technical support",
        summary: "A team that responds when you need it, 24/7.",
        description:
          "We support your users and your infrastructure remotely and on site. We monitor your systems to anticipate problems and fix them before they affect your operation.",
        includes: [
          "Remote and on-site help desk",
          "Proactive server and network monitoring",
          "24/7 incident response",
          "Regular status reports",
        ],
      },
    },
  },
];

export const serviceGroups: ServiceGroup[] = ["infra", "network", "protection"];
