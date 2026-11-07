import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Navigation, Send, CheckCircle2 } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import Button from '../components/Button';
import { useSiteContent } from '../context/SiteContentContext';

export default function Contact() {
  const { content } = useSiteContent();
  const contact = content?.contact || {};

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    guests: '2',
    date: '',
    notes: ''
  });

  if (contact.visible === false) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: '', email: '', phone: '', guests: '2', date: '', notes: '' });
    }, 4500);
  };

  return (
    <section id="contact" className="section section-burgundy" style={{ position: 'relative' }}>
      <div className="container">
        <SectionHeading
          badge={contact.badge || 'PLAN YOUR VISIT'}
          title={contact.title || 'Your Table. Your Moments. Your Cafeana.'}
          description={contact.description || 'Whether you are reserving an intimate evening table, planning a celebration with dear friends, or seeking a quiet corner with artisanal coffee, we look forward to welcoming you.'}
          align="center"
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3.5rem',
            alignItems: 'start'
          }}
        >
          {/* Left Column: Essential Visit Details Placeholders */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div
              className="luxury-card"
              style={{
                padding: '2.5rem',
                backgroundColor: 'rgba(33, 24, 23, 0.6)',
                marginBottom: '2rem'
              }}
            >
              <h3
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.9rem',
                  color: 'var(--color-warm-cream)',
                  marginBottom: '1.8rem',
                  letterSpacing: '0.02em'
                }}
              >
                Visit &amp; Contact
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem' }}>
                {/* Address */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.2rem' }}>
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '50%',
                      background: 'rgba(101, 30, 50, 0.4)',
                      border: '1px solid var(--color-champagne-gold)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--color-champagne-gold)',
                      flexShrink: 0
                    }}
                  >
                    <MapPin size={18} />
                  </div>
                  <div>
                    <span
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.75rem',
                        letterSpacing: '0.18em',
                        textTransform: 'uppercase',
                        color: 'var(--color-champagne-gold)',
                        display: 'block',
                        marginBottom: '0.2rem'
                      }}
                    >
                      Restaurant Location
                    </span>
                    <p style={{ color: 'var(--color-warm-cream)', fontSize: '0.98rem', margin: 0, fontWeight: 500 }}>
                      {contact.address || '[Restaurant Address Placeholder]'}
                    </p>
                    <span style={{ color: 'var(--color-soft-beige)', fontSize: '0.88rem' }}>
                      {contact.cityStateZip || '[City, State, Postal Code Placeholder]'}
                    </span>
                  </div>
                </div>

                {/* Contact Phone & Email */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.2rem' }}>
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '50%',
                      background: 'rgba(101, 30, 50, 0.4)',
                      border: '1px solid var(--color-champagne-gold)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--color-champagne-gold)',
                      flexShrink: 0
                    }}
                  >
                    <Phone size={18} />
                  </div>
                  <div>
                    <span
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.75rem',
                        letterSpacing: '0.18em',
                        textTransform: 'uppercase',
                        color: 'var(--color-champagne-gold)',
                        display: 'block',
                        marginBottom: '0.2rem'
                      }}
                    >
                      Reservations &amp; Enquiries
                    </span>
                    <p style={{ color: 'var(--color-warm-cream)', fontSize: '0.98rem', margin: 0, fontWeight: 500 }}>
                      {contact.phone || '[+XX XXXXX XXXXX / Contact Number Placeholder]'}
                    </p>
                    <span style={{ color: 'var(--color-soft-beige)', fontSize: '0.88rem' }}>
                      {contact.email || '[email@cafeana-placeholder.com]'}
                    </span>
                  </div>
                </div>

                {/* Operating Hours */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.2rem' }}>
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '50%',
                      background: 'rgba(101, 30, 50, 0.4)',
                      border: '1px solid var(--color-champagne-gold)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--color-champagne-gold)',
                      flexShrink: 0
                    }}
                  >
                    <Clock size={18} />
                  </div>
                  <div>
                    <span
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.75rem',
                        letterSpacing: '0.18em',
                        textTransform: 'uppercase',
                        color: 'var(--color-champagne-gold)',
                        display: 'block',
                        marginBottom: '0.2rem'
                      }}
                    >
                      Opening Hours
                    </span>
                    <p style={{ color: 'var(--color-warm-cream)', fontSize: '0.92rem', margin: 0 }}>
                      Mon – Thu: {contact.hoursWeekday || '11:00 AM – 11:00 PM'}
                    </p>
                    <p style={{ color: 'var(--color-warm-cream)', fontSize: '0.92rem', margin: 0 }}>
                      Fri – Sat: {contact.hoursWeekend || '11:00 AM – 12:30 AM'}
                    </p>
                    <p style={{ color: 'var(--color-warm-cream)', fontSize: '0.92rem', margin: 0 }}>
                      Sunday: {contact.hoursSunday || '10:30 AM – 11:30 PM'}
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA Get Directions */}
              <div style={{ marginTop: '2.5rem', paddingTop: '1.8rem', borderTop: '1px solid rgba(198, 163, 106, 0.2)' }}>
                <Button
                  href={contact.googleMapsEmbedUrl || 'https://maps.google.com'}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="gold"
                  size="md"
                  icon={Navigation}
                  iconPosition="left"
                  className="w-full"
                >
                  {contact.ctaText || 'Get Directions'}
                </Button>
              </div>
            </div>

            {/* Google Maps Embed / Map Card */}
            <div
              className="luxury-card"
              style={{
                position: 'relative',
                height: '240px',
                borderRadius: '4px',
                overflow: 'hidden',
                backgroundColor: 'rgba(33, 24, 23, 0.8)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: '2rem',
                border: '1px dashed rgba(198, 163, 106, 0.4)'
              }}
            >
              <div
                style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: '50%',
                  background: 'rgba(101, 30, 50, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-champagne-gold)',
                  marginBottom: '1rem'
                }}
              >
                <MapPin size={26} />
              </div>
              <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', color: 'var(--color-warm-cream)', margin: 0 }}>
                {contact.restaurantName || 'Cafeana Restaurant & Café'}
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-soft-beige)', marginTop: '0.35rem', maxWidth: '320px' }}>
                {contact.address || '[Restaurant Address Placeholder]'}
              </p>
            </div>
          </motion.div>

          {/* Right Column: Table Reservation Request Form (Frontend Demo) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div
              className="luxury-card"
              style={{
                padding: '2.5rem',
                backgroundColor: 'rgba(33, 24, 23, 0.65)',
                border: '1px solid rgba(198, 163, 106, 0.3)'
              }}
            >
              <div style={{ marginBottom: '1.8rem' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.75rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'var(--color-champagne-gold)',
                    display: 'block',
                    marginBottom: '0.35rem'
                  }}
                >
                  Table Enquiry
                </span>
                <h3
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '2rem',
                    color: 'var(--color-warm-cream)',
                    margin: 0
                  }}
                >
                  Reserve Your Experience
                </h3>
              </div>

              {formSubmitted ? (
                <div
                  style={{
                    padding: '2.5rem',
                    textAlign: 'center',
                    backgroundColor: 'rgba(101, 30, 50, 0.35)',
                    border: '1px solid var(--color-champagne-gold)',
                    borderRadius: '4px'
                  }}
                >
                  <CheckCircle2 size={42} color="var(--color-champagne-gold)" style={{ margin: '0 auto 1rem auto' }} />
                  <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', color: 'var(--color-warm-cream)', marginBottom: '0.5rem' }}>
                    Enquiry Received
                  </h4>
                  <p style={{ color: 'var(--color-soft-beige)', fontSize: '0.92rem', margin: 0 }}>
                    Thank you. The Cafeana concierge team will confirm your reservation shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div>
                    <label
                      style={{
                        display: 'block',
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.8rem',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        color: 'var(--color-soft-beige)',
                        marginBottom: '0.4rem'
                      }}
                    >
                      Guest Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Eleanor Vance"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.85rem 1rem',
                        backgroundColor: 'rgba(59, 16, 31, 0.3)',
                        border: '1px solid rgba(198, 163, 106, 0.3)',
                        borderRadius: '2px',
                        color: 'var(--color-warm-cream)',
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.95rem'
                      }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label
                        style={{
                          display: 'block',
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.8rem',
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                          color: 'var(--color-soft-beige)',
                          marginBottom: '0.4rem'
                        }}
                      >
                        Contact Phone
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+XX XXXXX..."
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '0.85rem 1rem',
                          backgroundColor: 'rgba(59, 16, 31, 0.3)',
                          border: '1px solid rgba(198, 163, 106, 0.3)',
                          borderRadius: '2px',
                          color: 'var(--color-warm-cream)',
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.95rem'
                        }}
                      />
                    </div>

                    <div>
                      <label
                        style={{
                          display: 'block',
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.8rem',
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                          color: 'var(--color-soft-beige)',
                          marginBottom: '0.4rem'
                        }}
                      >
                        Guests
                      </label>
                      <select
                        value={formData.guests}
                        onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '0.85rem 1rem',
                          backgroundColor: 'var(--color-espresso)',
                          border: '1px solid rgba(198, 163, 106, 0.3)',
                          borderRadius: '2px',
                          color: 'var(--color-warm-cream)',
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.95rem'
                        }}
                      >
                        <option value="1">1 Guest</option>
                        <option value="2">2 Guests</option>
                        <option value="4">4 Guests</option>
                        <option value="6">6 Guests</option>
                        <option value="8+">8+ Large Gathering</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      style={{
                        display: 'block',
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.8rem',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        color: 'var(--color-soft-beige)',
                        marginBottom: '0.4rem'
                      }}
                    >
                      Special Requests / Occasion
                    </label>
                    <textarea
                      rows="3"
                      placeholder="e.g. Quiet booth, anniversary dinner, dietary notes..."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.85rem 1rem',
                        backgroundColor: 'rgba(59, 16, 31, 0.3)',
                        border: '1px solid rgba(198, 163, 106, 0.3)',
                        borderRadius: '2px',
                        color: 'var(--color-warm-cream)',
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.95rem',
                        resize: 'none'
                      }}
                    />
                  </div>

                  <Button
                    variant="primary"
                    size="md"
                    icon={Send}
                    className="w-full"
                    style={{ marginTop: '0.5rem', width: '100%' }}
                  >
                    Request Reservation
                  </Button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
