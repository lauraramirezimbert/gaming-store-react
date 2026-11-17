import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ShieldCheck, Truck, Headphones, Zap, Cpu, Terminal, MessageSquare } from 'lucide-react';

const Home = () => {
  return (
    <div style={{ background: '#0d0d0d', color: '#fff', minHeight: '90vh', paddingBottom: '60px' }}>
      <Helmet>
        <title>Inicio | Gaming Store</title>
        <meta name="description" content="El mejor hardware y periféricos gaming de alta gama." />
      </Helmet>

      {/* HERO SECTION */}
      <section style={{ 
        display: 'flex', 
        flexDirection: 'row', 
        flexWrap: 'wrap', 
        justifyContent: 'space-around', 
        alignItems: 'center', 
        padding: '60px 20px', 
        background: 'linear-gradient(135deg, #121212 0%, #1a1a24 100%)',
        borderBottom: '1px solid #222'
      }}>
        <div style={{ maxWidth: '550px', marginBottom: '30px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#00ffcc', marginBottom: '15px', fontWeight: 'bold' }}>
            <Terminal size={20} /> NEXT-GEN GAMING GEAR
          </div>
          <h1 style={{ fontSize: '3rem', margin: '0 0 20px 0', lineHeight: '1.2', fontWeight: '800', letterSpacing: '1px' }}>
            Elevá tu <span style={{ color: '#00ffcc', textShadow: '0 0 10px rgba(0,255,204,0.4)' }}>Rendimiento</span> al Máximo
          </h1>
          <p style={{ color: '#bbb', fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '30px' }}>
            Hardware de alta gama, componentes optimizados para e-sports y periféricos diseñados para gamers que no aceptan perder.
          </p>
          <Link 
            to="/productos" 
            style={{ 
              background: '#00ffcc', 
              color: '#121212', 
              padding: '14px 28px', 
              borderRadius: '6px', 
              textDecoration: 'none', 
              fontWeight: 'bold', 
              fontSize: '1.1rem',
              boxShadow: '0 0 15px rgba(0,255,204,0.3)',
              display: 'inline-block'
            }}
          >
            Explorar Catálogo 🚀
          </Link>
        </div>
        
        <div style={{ maxWidth: '450px', width: '100%' }}>
          <div style={{ 
            background: '#16161a', 
            padding: '20px', 
            borderRadius: '12px', 
            border: '1px solid #333', 
            boxShadow: '0 0 30px rgba(0,255,204,0.15)',
            textAlign: 'center'
          }}>
            <Cpu size={80} color="#00ffcc" style={{ margin: '20px 0' }} />
            <h3 style={{ margin: '10px 0', fontSize: '1.4rem' }}>Tecnología de Vanguardia</h3>
            <p style={{ color: '#aaa', fontSize: '0.95rem' }}>Stock permanente en placas de video, procesadores y periféricos RGB certificados.</p>
          </div>
        </div>
      </section>

      {/* SECCIÓN BENEFICIOS */}
      <section style={{ maxWidth: '1100px', margin: '60px auto', padding: '0 20px' }}>
        <h2 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '40px', color: '#fff' }}>¿Por qué elegirnos?</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
          
          <div style={{ background: '#16161a', padding: '30px', borderRadius: '10px', border: '1px solid #2a2a2a' }}>
            <Zap size={36} color="#00ffcc" style={{ marginBottom: '15px' }} />
            <h3 style={{ marginBottom: '10px' }}>Envío Express</h3>
            <p style={{ color: '#aaa', lineHeight: '1.5' }}>Recibí tus componentes con máxima seguridad en tiempo récord.</p>
          </div>

          <div style={{ background: '#16161a', padding: '30px', borderRadius: '10px', border: '1px solid #2a2a2a' }}>
            <ShieldCheck size={36} color="#00ffcc" style={{ marginBottom: '15px' }} />
            <h3 style={{ marginBottom: '10px' }}>Garantía Oficial</h3>
            <p style={{ color: '#aaa', lineHeight: '1.5' }}>Respaldo directo de fábrica y soporte técnico especializado.</p>
          </div>

          <div style={{ background: '#16161a', padding: '30px', borderRadius: '10px', border: '1px solid #2a2a2a' }}>
            <Headphones size={36} color="#00ffcc" style={{ marginBottom: '15px' }} />
            <h3 style={{ marginBottom: '10px' }}>Atención Gamer 24/7</h3>
            <p style={{ color: '#aaa', lineHeight: '1.5' }}>Expertos listos para armar tu presupuesto y resolver tus dudas.</p>
          </div>

        </div>
      </section>

      {/* SECCIÓN RESEÑAS */}
      <section style={{ maxWidth: '1100px', margin: '60px auto', padding: '0 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '40px' }}>
          <MessageSquare size={28} color="#00ffcc" />
          <h2 style={{ fontSize: '2rem', color: '#fff', margin: 0 }}>Lo que dicen nuestros gamers</h2>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px' }}>
          
          <div style={{ background: '#16161a', padding: '25px', borderRadius: '10px', border: '1px solid #2a2a2a', position: 'relative' }}>
            <p style={{ color: '#ccc', fontStyle: 'italic', marginBottom: '20px', lineHeight: '1.6' }}>
              &quot;La atención y el envío fueron impecables. El teclado mecánico vuela y los RGB se ven increíbles en el setup.&quot;
            </p>
            <span style={{ color: '#00ffcc', fontWeight: 'bold', display: 'block' }}>- Lucas Gómez</span>
          </div>

          <div style={{ background: '#16161a', padding: '25px', borderRadius: '10px', border: '1px solid #2a2a2a', position: 'relative' }}>
            <p style={{ color: '#ccc', fontStyle: 'italic', marginBottom: '20px', lineHeight: '1.6' }}>
              &quot;Excelente variedad de componentes. Conseguí la gráfica que buscaba al mejor precio del mercado y llegó en perfecto estado.&quot;
            </p>
            <span style={{ color: '#00ffcc', fontWeight: 'bold', display: 'block' }}>- Sofía Martínez</span>
          </div>

          <div style={{ background: '#16161a', padding: '25px', borderRadius: '10px', border: '1px solid #2a2a2a', position: 'relative' }}>
            <p style={{ color: '#ccc', fontStyle: 'italic', marginBottom: '20px', lineHeight: '1.6' }}>
              &quot;Muy buena asesoría técnica. Me ayudaron a elegir los componentes ideales compatibles para armar mi PC desde cero.&quot;
            </p>
            <span style={{ color: '#00ffcc', fontWeight: 'bold', display: 'block' }}>- Joaquín Pérez</span>
          </div>

        </div>
      </section>

    </div>
  );
};

export default Home;