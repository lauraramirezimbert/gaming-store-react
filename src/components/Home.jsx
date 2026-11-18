
import { Link } from 'react-router-dom';
import PageMeta from './PageMeta';
import {
  ShieldCheck,
  Headphones,
  Zap,
  Cpu,
  MessageSquare,
  ArrowRight,
  Gamepad2,
  CheckCircle2
} from 'lucide-react';

const benefits = [
  {
    icon: <Zap size={34} />,
    title: 'Envío Express',
    description: 'Recibí tus componentes con máxima seguridad y rapidez.'
  },
  {
    icon: <ShieldCheck size={34} />,
    title: 'Garantía Oficial',
    description: 'Respaldo de fábrica y soporte técnico especializado.'
  },
  {
    icon: <Headphones size={34} />,
    title: 'Atención Gamer',
    description: 'Te asesoramos para encontrar el equipo ideal para vos.'
  }
];

const testimonials = [
  {
    text: 'La atención y el envío fueron impecables. El teclado mecánico vuela y los RGB se ven increíbles en el setup.',
    name: 'Lucas Gómez'
  },
  {
    text: 'Excelente variedad de componentes. Conseguí la gráfica que buscaba y llegó en perfecto estado.',
    name: 'Sofía Martínez'
  },
  {
    text: 'Muy buena asesoría técnica. Me ayudaron a elegir los componentes ideales para armar mi PC desde cero.',
    name: 'Joaquín Pérez'
  }
];

const Home = () => {
  return (
    <div className="home-page">
      <PageMeta
        title="Inicio"
        description="Gaming Store: descubrí hardware de alta gama, componentes y periféricos diseñados para llevar tu experiencia gamer al máximo."
      />

      <style>{`
        .home-page {
          background: #0d0d0d;
          color: #fff;
          min-height: 90vh;
          padding-bottom: 70px;
          overflow: hidden;
        }

        .home-hero {
          position: relative;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: center;
          gap: 45px;
          padding: 90px max(calc((100% - 1150px) / 2), 6%);
          background:
            radial-gradient(circle at 80% 50%, rgba(0,255,204,.13), transparent 32%),
            linear-gradient(135deg, #101014, #191923 65%, #101b1c);
          border-bottom: 1px solid #252b2b;
        }

        .hero-content {
          flex: 1 1 430px;
          max-width: 590px;
          position: relative;
          z-index: 1;
        }

        .hero-tag {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          padding: 9px 15px;
          margin-bottom: 22px;
          border: 1px solid rgba(0,255,204,.3);
          border-radius: 30px;
          background: rgba(0,255,204,.07);
          color: #00ffcc;
          font-size: .82rem;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
        }

        .hero-title {
          font-size: clamp(2.5rem, 5vw, 4.3rem);
          font-weight: 900;
          line-height: 1.08;
          letter-spacing: -2px;
          margin-bottom: 24px;
        }

        .hero-title span {
          color: #00ffcc;
          text-shadow: 0 0 25px rgba(0,255,204,.3);
        }

        .hero-description {
          max-width: 520px;
          color: #b5b5c0;
          font-size: 1.1rem;
          line-height: 1.8;
          margin-bottom: 32px;
        }

        .hero-button {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 15px 25px;
          border-radius: 8px;
          background: #00ffcc;
          color: #101414;
          font-size: 1rem;
          font-weight: 800;
          text-decoration: none;
          box-shadow: 0 0 25px rgba(0,255,204,.2);
          transition: all .25s ease;
        }

        .hero-button:hover {
          background: #fff;
          color: #101414;
          transform: translateY(-4px);
          box-shadow: 0 8px 30px rgba(0,255,204,.25);
        }

        .hero-visual {
          flex: 1 1 300px;
          max-width: 440px;
          margin: auto;
        }

        .tech-card {
          position: relative;
          padding: 40px 30px;
          text-align: center;
          border: 1px solid rgba(0,255,204,.25);
          border-radius: 22px;
          background: linear-gradient(145deg, #1c1c25, #111b1b);
          box-shadow: 0 15px 60px rgba(0,0,0,.35), 0 0 35px rgba(0,255,204,.08);
          transition: transform .3s ease, border-color .3s ease;
        }

        .tech-card:hover {
          transform: translateY(-8px);
          border-color: #00ffcc;
        }

        .tech-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 125px;
          height: 125px;
          margin-bottom: 25px;
          border-radius: 28px;
          color: #00ffcc;
          background: rgba(0,255,204,.08);
          box-shadow: inset 0 0 25px rgba(0,255,204,.08), 0 0 30px rgba(0,255,204,.1);
        }

        .tech-card h2 {
          font-size: 1.5rem;
          font-weight: 800;
          margin-bottom: 12px;
        }

        .tech-card p {
          color: #aaa;
          line-height: 1.7;
          margin-bottom: 25px;
        }

        .tech-status {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 8px;
          color: #00ffcc;
          font-size: .8rem;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .home-section {
          max-width: 1150px;
          margin: 85px auto;
          padding: 0 22px;
        }

        .section-heading {
          text-align: center;
          margin-bottom: 42px;
        }

        .section-heading span {
          display: block;
          margin-bottom: 10px;
          color: #00ffcc;
          font-size: .8rem;
          font-weight: 800;
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        .section-heading h2 {
          font-size: clamp(1.8rem, 4vw, 2.5rem);
          font-weight: 850;
          margin: 0;
        }

        .section-heading p {
          color: #999;
          margin-top: 12px;
        }

        .benefit-grid,
        .testimonial-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 22px;
        }

        .benefit-card {
          padding: 32px 27px;
          border: 1px solid #292931;
          border-radius: 15px;
          background: linear-gradient(145deg, #191920, #121216);
          transition: all .3s ease;
        }

        .benefit-card:hover {
          transform: translateY(-7px);
          border-color: rgba(0,255,204,.55);
          box-shadow: 0 12px 30px rgba(0,0,0,.25);
        }

        .benefit-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 62px;
          height: 62px;
          margin-bottom: 22px;
          border-radius: 13px;
          background: rgba(0,255,204,.09);
          color: #00ffcc;
        }

        .benefit-card h3 {
          font-size: 1.2rem;
          font-weight: 800;
          margin-bottom: 12px;
        }

        .benefit-card p {
          color: #aaa;
          line-height: 1.7;
          margin: 0;
        }

        .testimonial-card {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 27px;
          border: 1px solid #292931;
          border-radius: 15px;
          background: #17171e;
          transition: all .3s ease;
        }

        .testimonial-card:hover {
          border-color: rgba(0,255,204,.45);
          transform: translateY(-5px);
        }

        .testimonial-quote {
          color: #c5c5ce;
          font-style: italic;
          line-height: 1.8;
          margin-bottom: 25px;
        }

        .testimonial-author {
          display: flex;
          align-items: center;
          gap: 11px;
          color: #00ffcc;
          font-weight: 800;
        }

        .testimonial-check {
          display: inline-flex;
          color: #00ffcc;
        }

        .home-cta {
          max-width: 1105px;
          margin: 0 auto;
          padding: 38px 25px;
          border: 1px solid rgba(0,255,204,.25);
          border-radius: 18px;
          background: linear-gradient(110deg, #172322, #171720);
          text-align: center;
        }

        .home-cta h2 {
          font-size: clamp(1.5rem, 4vw, 2rem);
          font-weight: 850;
          margin-bottom: 12px;
        }

        .home-cta p {
          color: #aaa;
          margin-bottom: 24px;
        }

        @media (max-width: 650px) {
          .home-hero {
            padding: 65px 22px;
            gap: 35px;
          }

          .hero-title {
            letter-spacing: -1px;
          }

          .hero-description {
            font-size: 1rem;
          }

          .tech-card {
            padding: 32px 22px;
          }

          .home-section {
            margin: 65px auto;
          }

          .section-heading {
            margin-bottom: 30px;
          }

          .home-cta {
            margin: 0 18px;
          }
        }
      `}</style>

      <section className="home-hero">
        <div className="hero-content">
          <div className="hero-tag">
            <Gamepad2 size={17} />
            Gaming Store
          </div>

          <h1 className="hero-title">
            Elevá tu <span>Rendimiento</span> al Máximo
          </h1>

          <p className="hero-description">
            Hardware de alta gama, componentes optimizados y periféricos
            diseñados para gamers que no aceptan perder.
          </p>

          <Link to="/productos" className="hero-button">
            Explorar Catálogo
            <ArrowRight size={20} />
          </Link>
        </div>

        <div className="hero-visual">
          <div className="tech-card">
            <div className="tech-icon">
              <Cpu size={76} />
            </div>

            <h2>Tecnología de Vanguardia</h2>

            <p>
              Stock permanente en placas de video, procesadores y
              periféricos RGB certificados.
            </p>

            <div className="tech-status">
              <CheckCircle2 size={17} />
              Potencia para tu setup
            </div>
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="section-heading">
          <span>Tu experiencia, nuestra prioridad</span>
          <h2>¿Por qué elegirnos?</h2>
          <p>Todo lo que necesitás para llevar tu setup al siguiente nivel.</p>
        </div>

        <div className="benefit-grid">
          {benefits.map((benefit) => (
            <div className="benefit-card" key={benefit.title}>
              <div className="benefit-icon">
                {benefit.icon}
              </div>
              <h3>{benefit.title}</h3>
              <p>{benefit.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="home-section">
        <div className="section-heading">
          <span>Experiencias reales</span>
          <h2>
            <MessageSquare
              size={27}
              color="#00ffcc"
              style={{ verticalAlign: 'middle', marginRight: '10px' }}
            />
            Lo que dicen nuestros gamers
          </h2>
          <p>La experiencia de quienes ya confían en Gaming Store.</p>
        </div>

        <div className="testimonial-grid">
          {testimonials.map((testimonial) => (
            <div className="testimonial-card" key={testimonial.name}>
              <p className="testimonial-quote">
                "{testimonial.text}"
              </p>

              <div className="testimonial-author">
                <CheckCircle2 className="testimonial-check" size={18} />
                {testimonial.name}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="home-cta">
        <h2>¿Listo para mejorar tu setup?</h2>
        <p>Encontrá los componentes ideales para tu próxima partida.</p>
        <Link to="/productos" className="hero-button">
          Ver productos
          <ArrowRight size={19} />
        </Link>
      </section>
    </div>
  );
};

export default Home;
