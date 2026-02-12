import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Droplets, Phone, Mail, MapPin, ChevronDown, Send, Shield, Leaf, Wrench, Waves, Menu, X, ArrowRight, CheckCircle2, Pipette, CloudRain, Filter, Zap, Search } from 'lucide-react'
import { saveLead } from '../store/leads'

const services = [
  { title: 'Irrigation Installation & Maintenance', icon: Droplets, img: '/images/irrigation.jpg', desc: 'Complete irrigation systems designed for farms, gardens, and commercial properties. Drip, sprinkler, and centre-pivot solutions with ongoing maintenance.' },
  { title: 'Borehole & Booster Pumps', icon: Pipette, img: '/images/borehole.jpg', desc: 'Professional borehole pump installation and booster pump systems to ensure consistent water pressure for residential and commercial applications.' },
  { title: 'Rainwater Harvesting', icon: CloudRain, img: '/images/rainwater.jpg', desc: 'Capture and store rainwater with our tank systems, guttering, and first-flush diverters. Reduce municipal dependence and your water bill.' },
  { title: 'Filtration Systems', icon: Filter, img: '/images/filtration.jpg', desc: 'Multi-stage water filtration for homes and industry. Remove iron, sediment, bacteria, and chemicals for clean, safe drinking water.' },
  { title: 'Dual Powered Borehole Pumps', icon: Zap, img: '/images/solar-pump.jpg', desc: 'Solar and electric hybrid pump systems that keep water flowing during load shedding. Energy-efficient and reliable.' },
  { title: 'Drainage Pumps', icon: Waves, img: '/images/drainage.jpg', desc: 'Submersible and surface drainage pumps for basements, construction sites, and flood-prone areas. Emergency installations available.' },
  { title: 'Borehole Survey & Drilling', icon: Search, img: '/images/drilling.jpg', desc: 'Geophysical surveys to locate optimal drilling points, followed by professional drilling services. Full permits and compliance handled.' },
]

const heroSlides = [
  { img: '/images/hero-1.jpg', alt: 'Water systems' },
  { img: '/images/hero-2.jpg', alt: 'Agricultural irrigation' },
  { img: '/images/hero-3.jpg', alt: 'Clean water' },
  { img: '/images/hero-4.jpg', alt: 'Water infrastructure' },
]

const reasons = [
  { title: 'Reliable Water Supply', desc: 'Ensure water availability even during shortages and load shedding.', icon: Shield },
  { title: 'Health & Safety', desc: 'Access to clean, safe drinking water for your family and community.', icon: CheckCircle2 },
  { title: 'Environmental Sustainability', desc: 'Reduce water wastage and promote recycling through smart systems.', icon: Leaf },
  { title: 'Custom Solutions', desc: 'Tailored systems designed to meet your specific needs and budget.', icon: Wrench },
]

const inputStyle = {
  width: '100%', padding: '10px 16px', borderRadius: '10px', border: '1px solid #e2e8f0',
  fontSize: '14px', fontFamily: 'inherit', outline: 'none', transition: 'border-color 0.2s',
}

function ServiceCard({ service }) {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const Icon = service.icon

  const handleSubmit = (e) => {
    e.preventDefault()
    saveLead({ ...form, service: service.title })
    setSubmitted(true)
    setTimeout(() => { setSubmitted(false); setOpen(false); setForm({ name: '', email: '', phone: '', message: '' }) }, 2500)
  }

  return (
    <div style={{ background: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)', border: '1px solid #e8f0fe', transition: 'box-shadow 0.3s, transform 0.3s' }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.08)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.06)'; e.currentTarget.style.transform = 'translateY(0)' }}>

      {/* Card image */}
      <div style={{ height: '180px', overflow: 'hidden', position: 'relative' }}>
        <img src={service.img} alt={service.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        <div style={{ position: 'absolute', bottom: '12px', left: '12px', width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon style={{ width: '20px', height: '20px', color: '#2474ea' }} />
        </div>
      </div>

      <div style={{ padding: '24px' }}>
        <h3 className="font-display" style={{ fontWeight: 700, fontSize: '17px', color: '#172a53', lineHeight: 1.3 }}>{service.title}</h3>
        <p style={{ fontSize: '13.5px', color: '#64748b', marginTop: '8px', lineHeight: 1.6 }}>{service.desc}</p>

        <button onClick={() => setOpen(!open)} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', fontWeight: 600, color: '#2474ea', background: 'none', border: 'none', cursor: 'pointer', marginTop: '14px', padding: 0 }}>
          Get a Quote
          <ChevronDown style={{ width: '16px', height: '16px', transition: 'transform 0.3s', transform: open ? 'rotate(180deg)' : 'rotate(0)' }} />
        </button>

        <div style={{ overflow: 'hidden', maxHeight: open ? '500px' : '0', opacity: open ? 1 : 0, transition: 'max-height 0.5s, opacity 0.3s', marginTop: open ? '16px' : '0' }}>
          {submitted ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', background: '#eefbf4', borderRadius: '12px', color: '#126b4b', fontWeight: 500, fontSize: '14px' }}>
              <CheckCircle2 style={{ width: '20px', height: '20px' }} />
              Thank you! We'll be in touch shortly.
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <input required placeholder="Your Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} style={inputStyle} />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <input required type="email" placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} style={inputStyle} />
                <input placeholder="Phone" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} style={inputStyle} />
              </div>
              <textarea placeholder="Tell us about your project..." rows={3} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} style={{ ...inputStyle, resize: 'none' }} />
              <button type="submit" style={{ width: '100%', padding: '10px', background: 'linear-gradient(90deg, #2474ea, #3a92f5)', color: 'white', borderRadius: '10px', fontSize: '14px', fontWeight: 600, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <Send style={{ width: '16px', height: '16px' }} /> Submit Inquiry
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

function HeroSlideshow() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setCurrent(c => (c + 1) % heroSlides.length), 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <>
      {heroSlides.map((slide, i) => (
        <img
          key={i}
          src={slide.img}
          alt={slide.alt}
          style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover',
            opacity: current === i ? 1 : 0,
            transition: 'opacity 1.2s ease-in-out',
            transform: current === i ? 'scale(1.05)' : 'scale(1)',
          }}
        />
      ))}
      {/* Slide indicators */}
      <div style={{ position: 'absolute', bottom: '100px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '8px', zIndex: 10 }}>
        {heroSlides.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} style={{
            width: current === i ? '32px' : '8px', height: '8px', borderRadius: '4px',
            background: current === i ? 'white' : 'rgba(255,255,255,0.4)',
            border: 'none', cursor: 'pointer', transition: 'all 0.3s', padding: 0,
          }} />
        ))}
      </div>
    </>
  )
}

export default function PublicSite() {
  const [mobileMenu, setMobileMenu] = useState(false)
  const [contactForm, setContactForm] = useState({ name: '', email: '', phone: '', service: '', message: '' })
  const [contactSubmitted, setContactSubmitted] = useState(false)

  const handleContact = (e) => {
    e.preventDefault()
    saveLead(contactForm)
    setContactSubmitted(true)
    setTimeout(() => { setContactSubmitted(false); setContactForm({ name: '', email: '', phone: '', service: '', message: '' }) }, 3000)
  }

  return (
    <div style={{ minHeight: '100vh', background: 'white', fontFamily: '"Plus Jakarta Sans", sans-serif' }}>

      {/* Floating Rounded-Rectangle Nav */}
      <nav style={{ position: 'fixed', top: '16px', left: '50%', transform: 'translateX(-50%)', zIndex: 50, width: '92%', maxWidth: '900px' }}>
        <div style={{ background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', borderRadius: '16px', padding: '10px 12px 10px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 4px 30px rgba(0,0,0,0.1), 0 1px 3px rgba(0,0,0,0.05)', border: '1px solid rgba(219,238,254,0.5)' }}>
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
            <div style={{ width: '34px', height: '34px', borderRadius: '10px', background: 'linear-gradient(135deg, #3a92f5, #1c5dd7)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Droplets style={{ width: '18px', height: '18px', color: 'white' }} />
            </div>
            <div style={{ lineHeight: 1 }}>
              <span className="font-display" style={{ fontWeight: 700, color: '#172a53', fontSize: '14px', display: 'block' }}>WITS Enterprise</span>
              <span style={{ fontSize: '9px', color: '#3a92f5', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Water Systems</span>
            </div>
          </a>

          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }} className="hidden-mobile">
            {[['#services', 'Services'], ['#why', 'Why Us'], ['#contact', 'Contact']].map(([href, text]) => (
              <a key={text} href={href} style={{ padding: '8px 16px', fontSize: '13px', fontWeight: 500, color: '#475569', textDecoration: 'none', borderRadius: '10px', transition: 'background 0.2s, color 0.2s' }}
                onMouseEnter={e => { e.target.style.background = '#f1f5f9'; e.target.style.color = '#1c5dd7' }}
                onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.color = '#475569' }}>
                {text}
              </a>
            ))}
            <Link to="/admin" style={{ padding: '8px 18px', fontSize: '13px', fontWeight: 600, color: 'white', textDecoration: 'none', borderRadius: '10px', background: 'linear-gradient(135deg, #2474ea, #1c5dd7)', marginLeft: '4px' }}>
              Admin
            </Link>
          </div>

          <button onClick={() => setMobileMenu(!mobileMenu)} className="show-mobile" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '6px', color: '#475569', display: 'none' }}>
            {mobileMenu ? <X style={{ width: '22px', height: '22px' }} /> : <Menu style={{ width: '22px', height: '22px' }} />}
          </button>
        </div>

        {mobileMenu && (
          <div style={{ marginTop: '8px', background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(20px)', borderRadius: '16px', padding: '16px 20px', boxShadow: '0 4px 30px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[['#services', 'Services'], ['#why', 'Why Us'], ['#contact', 'Contact']].map(([href, text]) => (
              <a key={text} href={href} onClick={() => setMobileMenu(false)} style={{ padding: '10px 16px', fontSize: '14px', fontWeight: 500, color: '#475569', textDecoration: 'none', borderRadius: '10px' }}>{text}</a>
            ))}
            <Link to="/admin" onClick={() => setMobileMenu(false)} style={{ padding: '10px 16px', fontSize: '14px', fontWeight: 600, color: '#2474ea', textDecoration: 'none' }}>Admin Portal</Link>
          </div>
        )}
      </nav>

      {/* Hero with Image Slideshow */}
      <section style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
        <HeroSlideshow />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(23,42,83,0.82) 0%, rgba(23,42,83,0.6) 40%, rgba(23,42,83,0.88) 100%)' }} />

        <div style={{ position: 'relative', maxWidth: '1200px', margin: '0 auto', padding: '200px 48px 140px' }}>
          <div style={{ maxWidth: '680px' }}>
            <div className="animate-fade-in-up" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '7px 18px', borderRadius: '10px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', color: '#93cdfd', fontSize: '13px', fontWeight: 500, marginBottom: '28px', backdropFilter: 'blur(8px)' }}>
              <Droplets style={{ width: '14px', height: '14px' }} />
              Trusted Water Solutions Since Day One
            </div>
            <h1 className="font-display animate-fade-in-up" style={{ fontWeight: 800, fontSize: 'clamp(2.8rem, 5vw, 4.2rem)', color: 'white', lineHeight: 1.08, letterSpacing: '-0.025em', animationDelay: '100ms' }}>
              Water Systems<br />
              <span style={{ background: 'linear-gradient(90deg, #93cdfd, #7cd9ae)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>You Can Rely On</span>
            </h1>
            <p className="font-body animate-fade-in-up" style={{ marginTop: '28px', fontSize: '17px', color: 'rgba(191,224,254,0.85)', maxWidth: '520px', lineHeight: 1.75, animationDelay: '200ms' }}>
              From borehole drilling to rainwater harvesting, WITS Enterprise delivers complete water solutions for homes, farms, and businesses across South Africa.
            </p>
            <div className="animate-fade-in-up" style={{ marginTop: '36px', display: 'flex', flexWrap: 'wrap', gap: '14px', animationDelay: '300ms' }}>
              <a href="#contact" className="font-display" style={{ padding: '15px 30px', background: 'white', color: '#1c5dd7', borderRadius: '14px', fontWeight: 700, fontSize: '14px', display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}>
                Get Free Quote <ArrowRight style={{ width: '16px', height: '16px' }} />
              </a>
              <a href="#services" className="font-display" style={{ padding: '15px 30px', background: 'rgba(255,255,255,0.1)', color: 'white', borderRadius: '14px', fontWeight: 600, fontSize: '14px', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.18)', backdropFilter: 'blur(8px)' }}>
                Our Services
              </a>
            </div>
          </div>

          <div className="animate-fade-in-up" style={{ marginTop: '72px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '32px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '36px', animationDelay: '400ms' }}>
            {[['500+', 'Projects Completed'], ['15+', 'Years Experience'], ['98%', 'Client Satisfaction'], ['24/7', 'Emergency Service']].map(([num, label]) => (
              <div key={label}>
                <div className="font-display" style={{ fontWeight: 800, fontSize: '2rem', color: 'white' }}>{num}</div>
                <div style={{ color: 'rgba(147,205,253,0.55)', fontSize: '13px', marginTop: '4px' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
          <svg viewBox="0 0 1440 80" fill="none" style={{ width: '100%', display: 'block' }}>
            <path d="M0 40 Q360 0 720 40 T1440 40 V80 H0Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Services */}
      <section id="services" style={{ padding: '100px 48px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span style={{ display: 'inline-block', padding: '4px 14px', borderRadius: '10px', background: '#eff8ff', color: '#2474ea', fontSize: '12px', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '12px' }}>What We Do</span>
            <h2 className="font-display" style={{ fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 2.8rem)', color: '#172a53', letterSpacing: '-0.02em' }}>Our Services</h2>
            <p style={{ marginTop: '12px', color: '#64748b', maxWidth: '480px', marginLeft: 'auto', marginRight: 'auto', fontSize: '15px', lineHeight: 1.6 }}>Complete water system solutions — from survey to installation and maintenance.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '20px' }}>
            {services.map((s, i) => <ServiceCard key={s.title} service={s} index={i} />)}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="why" style={{ padding: '100px 48px', background: 'linear-gradient(180deg, #f8fbff 0%, white 100%)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span style={{ display: 'inline-block', padding: '4px 14px', borderRadius: '10px', background: '#dbeefe', color: '#1c5dd7', fontSize: '12px', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '12px' }}>Our Promise</span>
            <h2 className="font-display" style={{ fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 2.8rem)', color: '#172a53', letterSpacing: '-0.02em' }}>Why Choose WITS?</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
            {reasons.map((r) => {
              const Icon = r.icon
              return (
                <div key={r.title} style={{ background: 'white', borderRadius: '20px', padding: '32px 24px', textAlign: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.04)', border: '1px solid #e8f0fe', transition: 'box-shadow 0.3s, transform 0.3s' }}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 12px 32px rgba(36,116,234,0.1)'; e.currentTarget.style.transform = 'translateY(-4px)' }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.04)'; e.currentTarget.style.transform = 'translateY(0)' }}>
                  <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'linear-gradient(135deg, #3a92f5, #2474ea)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', boxShadow: '0 8px 20px rgba(36,116,234,0.25)' }}>
                    <Icon style={{ width: '26px', height: '26px', color: 'white' }} />
                  </div>
                  <h3 className="font-display" style={{ fontWeight: 700, fontSize: '17px', color: '#172a53', marginBottom: '8px' }}>{r.title}</h3>
                  <p style={{ fontSize: '13.5px', color: '#64748b', lineHeight: 1.6 }}>{r.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" style={{ padding: '100px 48px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'start' }}>
          <div>
            <span style={{ display: 'inline-block', padding: '4px 14px', borderRadius: '10px', background: '#eff8ff', color: '#2474ea', fontSize: '12px', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '12px' }}>Get In Touch</span>
            <h2 className="font-display" style={{ fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 2.8rem)', color: '#172a53', letterSpacing: '-0.02em', lineHeight: 1.15 }}>Let's Discuss Your<br />Water Needs</h2>
            <p style={{ marginTop: '20px', color: '#64748b', lineHeight: 1.7, maxWidth: '440px', fontSize: '15px' }}>
              Whether it's a new borehole, irrigation system, or water filtration — we're here to help. Reach out and we'll get back to you within 24 hours.
            </p>
            <div style={{ marginTop: '36px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { icon: Phone, label: '+27 (0) 11 234 5678' },
                { icon: Mail, label: 'info@witswater.co.za' },
                { icon: MapPin, label: 'Johannesburg, Gauteng, South Africa' },
              ].map(({ icon: I, label }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '14px', color: '#475569' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: '#eff8ff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <I style={{ width: '20px', height: '20px', color: '#2474ea' }} />
                  </div>
                  <span style={{ fontSize: '14px', fontWeight: 500 }}>{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: 'white', borderRadius: '20px', padding: '36px', boxShadow: '0 8px 32px rgba(0,0,0,0.06)', border: '1px solid #e8f0fe' }}>
            {contactSubmitted ? (
              <div style={{ textAlign: 'center', padding: '48px 0' }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '9999px', background: '#eefbf4', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                  <CheckCircle2 style={{ width: '32px', height: '32px', color: '#24a572' }} />
                </div>
                <h3 className="font-display" style={{ fontWeight: 700, fontSize: '20px', color: '#172a53' }}>Message Sent!</h3>
                <p style={{ color: '#64748b', marginTop: '8px', fontSize: '14px' }}>We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleContact} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>Full Name</label>
                    <input required value={contactForm.name} onChange={e => setContactForm({ ...contactForm, name: e.target.value })} style={inputStyle} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>Email</label>
                    <input required type="email" value={contactForm.email} onChange={e => setContactForm({ ...contactForm, email: e.target.value })} style={inputStyle} />
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>Phone</label>
                    <input value={contactForm.phone} onChange={e => setContactForm({ ...contactForm, phone: e.target.value })} style={inputStyle} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>Service Needed</label>
                    <select value={contactForm.service} onChange={e => setContactForm({ ...contactForm, service: e.target.value })} style={{ ...inputStyle, background: 'white', cursor: 'pointer' }}>
                      <option value="">Select a service</option>
                      {services.map(s => <option key={s.title} value={s.title}>{s.title}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>Message</label>
                  <textarea required rows={4} value={contactForm.message} onChange={e => setContactForm({ ...contactForm, message: e.target.value })} style={{ ...inputStyle, resize: 'none' }} />
                </div>
                <button type="submit" className="font-display" style={{ width: '100%', padding: '14px', background: 'linear-gradient(90deg, #2474ea, #3a92f5)', color: 'white', borderRadius: '14px', fontWeight: 700, fontSize: '14px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', boxShadow: '0 6px 20px rgba(36,116,234,0.25)' }}>
                  <Send style={{ width: '16px', height: '16px' }} /> Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: '#172a53', padding: '48px', color: 'rgba(147,205,253,0.55)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#1e4289', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Droplets style={{ width: '16px', height: '16px', color: '#5fb1fa' }} />
            </div>
            <span className="font-display" style={{ fontWeight: 700, color: 'white', fontSize: '14px' }}>WITS Enterprise Pty Ltd</span>
          </div>
          <p style={{ fontSize: '12px' }}>&copy; 2026 WITS Enterprise Pty Ltd. All rights reserved.</p>
          <div style={{ display: 'flex', gap: '24px', fontSize: '12px' }}>
            <a href="#services" style={{ color: 'inherit', textDecoration: 'none' }}>Services</a>
            <a href="#contact" style={{ color: 'inherit', textDecoration: 'none' }}>Contact</a>
            <Link to="/admin" style={{ color: 'inherit', textDecoration: 'none' }}>Admin</Link>
          </div>
        </div>
      </footer>

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: block !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
        }
      `}</style>
    </div>
  )
}
