import { useState } from "react";
import type { FormEvent } from "react";
import "./App.css";

const services = [
  {
    title: "Servicio tecnico para PCs",
    description:
      "Diagnostico, mantenimiento preventivo y correctivo para computadores de escritorio. Revisamos hardware, limpieza interna, cambio de piezas y optimizacion general para mejorar rendimiento y estabilidad.",
    icon: "desktop",
  },
  {
    title: "Servicio tecnico para portatiles",
    description:
      "Atencion especializada en laptops: mejoras de velocidad, reparacion de fallas comunes, reemplazo de componentes y puesta a punto para trabajo, estudio o uso personal.",
    icon: "laptop",
  },
  {
    title: "Instalacion de programas",
    description:
      "Instalamos y configuramos software esencial: ofimatica, navegadores, antivirus, herramientas de diseño, utilidades empresariales y programas a medida de tus necesidades.",
    icon: "software",
  },
  {
    title: "Diseno de paginas web",
    description:
      "Creamos sitios web modernos, responsivos y enfocados en tu marca. Desde paginas informativas hasta landing pages profesionales para captar clientes.",
    icon: "web",
  },
  {
    title: "Desarrollo de aplicativos web",
    description:
      "Construimos aplicaciones web personalizadas para automatizar procesos, gestionar informacion y mejorar la operacion de tu negocio con soluciones escalables.",
    icon: "app",
  },
];

const steps = [
  {
    title: "1. Contacto y diagnostico",
    description:
      "Cuentame tu necesidad y te doy una orientacion inicial para definir la mejor solucion.",
  },
  {
    title: "2. Soporte en sitio o recojo",
    description:
      "Coordino visita a domicilio o recojo del equipo para una revision completa y segura.",
  },
  {
    title: "3. Entrega y seguimiento",
    description:
      "Te entrego el equipo funcionando y recomendaciones para mantener buen rendimiento.",
  },
];

const contactEmail = "carlitosojeda59@gmail.com";
const whatsappNumber = "573001112233";

function ServiceIcon({ name }: { name: string }) {
  switch (name) {
    case "desktop":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="3" y="4" width="18" height="12" rx="2" />
          <path d="M8 20h8M12 16v4" />
        </svg>
      );
    case "laptop":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="5" y="5" width="14" height="10" rx="2" />
          <path d="M3 18h18" />
        </svg>
      );
    case "software":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M8 3h8l5 5v8l-5 5H8l-5-5V8z" />
          <path d="M9 12h6M12 9v6" />
        </svg>
      );
    case "web":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="M3 9h18M8 5v14M16 5v14" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="4" y="4" width="16" height="16" rx="3" />
          <path d="M8 12h8M12 8v8" />
        </svg>
      );
  }
}

export default function App() {
  const [isSending, setIsSending] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatusMessage("");
    setIsSending(true);

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch(
        `https://formsubmit.co/ajax/${contactEmail}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
          },
          body: formData,
        },
      );

      if (!response.ok) {
        throw new Error("No fue posible enviar el formulario.");
      }

      form.reset();
      setStatusMessage(
        "Mensaje enviado correctamente. Revisa tu correo para confirmar la recepcion.",
      );
    } catch (_error) {
      setStatusMessage(
        "No se pudo enviar por el momento. Intenta de nuevo en unos minutos.",
      );
    } finally {
      setIsSending(false);
    }
  }

  return (
    <div className="page">
      <nav className="topbar">
        <strong>WebServicioTecnico</strong>
        <div className="top-actions">
          <a className="mini-btn mini-btn--primary" href="#formulario">
            Ir al formulario
          </a>
        </div>
      </nav>

      <header className="hero">
        <div className="hero-panel">
          <p className="badge">Servicio tecnico confiable y rapido</p>
          <h1>Soluciones integrales para equipos y servicios web</h1>
          <p className="hero-text">
            Brindo atencion para PCs y portatiles, instalacion de programas,
            diseno de paginas web y desarrollo de aplicativos web para personas
            y negocios.
          </p>
          <div className="hero-actions">
            <span className="hero-chip">Atencion a domicilio</span>
            <span className="hero-chip">Recojo de equipos</span>
          </div>
          <div className="cta-row">
            <a className="btn btn-primary" href="#formulario">
              Solicitar soporte
            </a>
            <a className="btn btn-secondary" href="#pagos">
              Cotizar servicio
            </a>
          </div>
        </div>
      </header>

      <main className="services" id="servicios">
        {services.map((service) => (
          <article className="card" key={service.title}>
            <span className="service-icon" aria-hidden="true">
              <ServiceIcon name={service.icon} />
            </span>
            <h2>{service.title}</h2>
            <p>{service.description}</p>
          </article>
        ))}
      </main>

      <section className="process" id="proceso">
        <h2>Como trabajamos</h2>
        <div className="steps">
          {steps.map((step) => (
            <article className="step" key={step.title}>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="info-grid">
        <article className="support panel">
          <h2>Modalidades de soporte</h2>
          <p>
            El soporte puede realizarse <strong>a domicilio</strong> para mayor
            comodidad, o tambien puedo <strong>ir a recoger los equipos</strong>{" "}
            para su revision y posterior entrega.
          </p>
        </article>


        <article className="payments panel" id="pagos">
          <h2>Metodos de pago</h2>
          <p>
            Opciones de pago habilitadas para una atencion segura y rapida.
          </p>
          <ul>
            <li>Bancolombia (cuenta de ahorros)</li>
            <li>Nu (billetera digital)</li>
            <li>Dale (billetera digital)</li>
            <li>Efectivo</li>
            <li>Cuenta de cobro por transferencia</li>
          </ul>
        </article>
      </section>

      <section className="lead-box">
        <p>Listo para empezar con tu servicio tecnico o proyecto web?</p>
        <a className="btn btn-primary" href="#formulario">
          Quiero agendar ahora
        </a>
      </section>

      <section className="contact-wrapper" id="formulario">
        <header className="contact-header">
          <h2>Formulario de contacto</h2>
          <p>
            Esta seccion esta separada para que el cliente llegue directo por
            boton y complete la solicitud sin distracciones.
          </p>
        </header>

        <article className="contact-card">
          <form className="contact-form" onSubmit={handleSubmit}>
            <input type="hidden" name="_subject" value="Nuevo contacto web" />
            <input type="hidden" name="_captcha" value="false" />
            <input
              type="hidden"
              name="_template"
              value="table"
            />

            <label>
              Nombre completo
              <input
                type="text"
                name="nombre"
                placeholder="Tu nombre"
                required
              />
            </label>

            <label>
              Correo electronico
              <input
                type="email"
                name="email"
                placeholder="tucorreo@ejemplo.com"
                required
              />
            </label>

            <label>
              Telefono o WhatsApp
              <input
                type="tel"
                name="telefono"
                placeholder="300 123 4567"
                required
              />
            </label>

            <label>
              Servicio de interes
              <select name="servicio" required defaultValue="">
                <option value="" disabled>
                  Selecciona un servicio
                </option>
                <option value="Servicio tecnico PCs">
                  Servicio tecnico para PCs
                </option>
                <option value="Servicio tecnico portatiles">
                  Servicio tecnico para portatiles
                </option>
                <option value="Instalacion de programas">
                  Instalacion de programas
                </option>
                <option value="Diseno de paginas web">
                  Diseno de paginas web
                </option>
                <option value="Aplicativos web">Aplicativos web</option>
              </select>
            </label>

            <label>
              Mensaje
              <textarea
                name="mensaje"
                rows={4}
                placeholder="Describe lo que necesitas"
                required
              />
            </label>

            <button className="btn btn-primary submit-btn" type="submit" disabled={isSending}>
              {isSending ? "Enviando..." : "Enviar solicitud"}
            </button>
          </form>
          {statusMessage && <p className="form-status">{statusMessage}</p>}
          <p className="helper-note">Los mensajes se enviaran a {contactEmail}.</p>
        </article>
      </section>

      <footer className="footer">
        <p>Atencion personalizada para hogares, emprendedores y empresas.</p>
        <p className="footer-copy">
          Copyright © 2026 WebServicioTecnico. Todos los derechos reservados.
        </p>
        <p className="footer-security">
          Tratamiento de seguridad: la informacion enviada en el formulario se
          usa solo para contacto comercial y no se comparte con terceros.{" "}
        </p>
      </footer>

      <a
        className="whatsapp-float"
        href={`https://wa.me/${whatsappNumber}?text=Hola%2C%20quiero%20solicitar%20un%20servicio`}
        target="_blank"
        rel="noreferrer"
        aria-label="Contactar por WhatsApp"
      >
        WhatsApp
      </a>
    </div>
  );
}
