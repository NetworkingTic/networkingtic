import { CardPropsWithId } from "../Components/Card/CardModel";
import { v4 as uuidv4 } from "uuid";
import security from '@assets/sheel.jpg'
import network from '@assets/redes.jpg'
import virtualization from '@assets/virtualizacion.jpg'
import maintanence from '@assets/maintanence.jpg'
import virtualizacion_modal from '@assets/virtualizacion_popup.jpg'
import seguridad_it from '@assets/seguridadIT_popup.jpg'
import redes_popup from '@assets/redes_popup.jpg'
import mantenimiento_popup from'@assets/mantenimiento_2_popup.jpg'
import almacenamiento from '@assets/sistemasAlmacenamiento.webp'
import almacenamiento_carousel from '@assets/alamacenamiento.jpg'
import soporte_carousel from '@assets/soporte_2.jpg'
import soporte_popup from '@assets/soporte.jpg'
import cableado_carousel from '@assets/cableado.jpg'
import cableado_popup from '@assets/cableadoEstructurado.jpg'
import windows_carousel from '@assets/windowsServer.jpg'
import windows_popup from '@assets/windowsServerPopup.jpg'


export const cardsData: CardPropsWithId[] = [
    {
        id: uuidv4(),
        imageSrc: virtualization,
        text: "Sistemas de Virtualización",
        modalTitle: "Sistemas de Virtualización",
        modalText: "Transforma tu infraestructura IT con nuestros servicios de virtualización, diseñados para maximizar la eficiencia, reducir costos y ofrecerte la flexibilidad que tu negocio necesita. Enfocados en la responsabilidad y seguridad, nuestros expertos en virtualización aseguran que tus recursos estén siempre optimizados y protegidos, permitiéndote escalar sin límites.",
        modalImage: virtualizacion_modal,
        altImage: "Sistemas de Virtualización"
      },
      {
        id: uuidv4(),
        imageSrc: network,
        text: "Redes de Datos y Seguridad en Redes",
        modalTitle: "Redes de Datos y Seguridad en Redes",
        modalImage: redes_popup,
        modalText: "Optimiza y protege tu infraestructura con nuestros servicios avanzados de Redes de Datos y Seguridad en Redes, diseñados para adaptarse a las necesidades dinámicas de tu negocio. Nuestra solución combina lo mejor de la virtualización con las mejores prácticas de seguridad, asegurando una conectividad eficiente, escalable y segura.",
        altImage: "Redes de Datos y Seguridad en Redes"
      },
      {
        id: uuidv4(),
        imageSrc: maintanence,
        text: "Mantenimiento Hardware",
        modalTitle: "Mantenimiento Hardware",
        modalImage: mantenimiento_popup,
        modalText: "Asegura el rendimiento óptimo y la durabilidad de tus equipos con nuestro servicio de Mantenimiento de Hardware, diseñado para proteger tus activos físicos y potenciar tu infraestructura virtualizada. Nuestro equipo experto cuida cada detalle, garantizando que tus dispositivos y sistemas funcionen de manera ininterrumpida y eficiente.",
        altImage: "Mantenimiento Hardware"
      },
      {
        id: uuidv4(),
        imageSrc: security,
        text: "Seguridad IT",
        modalTitle: "Seguridad IT",
        modalText: "En un mundo digital en constante evolución, proteger la infraestructura y los datos de tu empresa es fundamental. Nuestro servicio de Seguridad IT ofrece una combinación de tecnologías avanzadas y prácticas responsables para crear un entorno seguro y escalable. Aprovechamos los beneficios de la virtualización para brindarte una solución flexible, eficiente y preparada para las amenazas modernas.",
        modalImage: seguridad_it,
        altImage: "Seguridad IT"
      },
      {
        id: uuidv4(),
        imageSrc: almacenamiento_carousel,
        text: "Sistemas de Almacenamiento",
        modalTitle: "Sistemas de Almacenamiento",
        modalText: "¿Tu información es tu activo más valioso? Protege tu negocio con nuestros sistemas de almacenamiento seguros. Imagina tener un refugio digital a prueba de incendios, inundaciones y ciberataques. Nuestros sistemas, que combinan lo mejor de la tecnología en la nube y el almacenamiento local, garantizan la seguridad, disponibilidad y recuperación de tus datos en todo momento. No importa si eres una startup o una gran empresa, tenemos la solución a medida para ti. ¡Deja de preocuparte por la pérdida de datos y enfócate en hacer crecer tu negocio!.",
        modalImage: almacenamiento,
        altImage: "Sistemas de Almacenamiento"
      },
      {
        id: uuidv4(),
        imageSrc: soporte_carousel,
        text: "Soporte Técnico y Especializado",
        modalTitle: "Soporte Técnico y Especializado",
        modalText: "Nuestro soporte técnico anticipa tus necesidades y resuelve problemas antes de que afecten tu negocio. Con sistemas inteligentes y un equipo dedicado, garantizamos una operación continua. Además, ofrecemos un servicio accesible y personalizado, disponible cuando lo necesites. Con nuestra garantía de satisfacción, puedes estar tranquilo sabiendo que tu inversión está protegida y que recibirás la mejor solución posible.",
        modalImage: soporte_popup,
        altImage: "Soporte Técnico y Especializado"
      },
      {
        id: uuidv4(),
        imageSrc: cableado_carousel,
        text: "Cableado estructurado de redes",
        modalTitle: "Cableado estructurado de redes",
        modalText: "Eleve su negocio al siguiente nivel con un sistema de cableado estructurado. Maximice la eficiencia, reduzca costos y asegure la continuidad de sus operaciones. Nuestra solución personalizada le brinda una infraestructura de telecomunicaciones sólida y adaptable, preparada para enfrentar los desafíos tecnológicos del futuro. No se quede atrás, invierta en una red que impulse su éxito.",
        modalImage: cableado_popup,
        altImage: "Cableado estructurado de redes"
      },
      {
        id: uuidv4(),
        imageSrc: windows_carousel,
        text: "Windows Server y Active Directory",
        modalTitle: "Windows Server y Active Directory",
        modalText: "¿Tu empresa aún lucha con la gestión de usuarios, dispositivos y permisos? Imagina un mundo donde tus empleados accedan a los recursos que necesitan de forma segura y eficiente, y donde la administración de tu infraestructura informática sea sencilla y centralizada. Windows Server y Active Directory son la llave para desbloquear este potencial. Con Active Directory, obtendrás una visión unificada de tu entorno de TI, simplificando la gestión de usuarios, grupos y políticas. Además, fortalecerás la seguridad de tu red, protegiendo tus datos más valiosos de amenazas externas. No pierdas más tiempo con soluciones obsoletas. Moderniza tu infraestructura con Windows Server y Active Directory y experimenta un aumento en la productividad y la eficiencia de tu negocio. ¡Contáctanos hoy mismo y descubre cómo podemos ayudarte a alcanzar tus objetivos!.",
        modalImage: windows_popup,
        altImage: "Windows Server y Active Directory"
      }
];