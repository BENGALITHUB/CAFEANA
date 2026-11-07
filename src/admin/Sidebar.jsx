import React from 'react';
import {
  LayoutDashboard,
  Navigation,
  Sparkles,
  BookOpen,
  UtensilsCrossed,
  Award,
  Flame,
  Camera,
  Layers,
  MapPin,
  PanelBottom,
  Palette,
  Eye,
  Settings,
  LogOut
} from 'lucide-react';
import { useSiteContent } from '../context/SiteContentContext';

export default function Sidebar({ isOpen, onClose }) {
  const { activeSection, setActiveSection, logout, content } = useSiteContent();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'header', label: 'Header & Navbar', icon: Navigation },
    { id: 'hero', label: 'Hero Section', icon: Sparkles },
    { id: 'about', label: 'About Cafeana', icon: BookOpen },
    { id: 'menu', label: 'Menu Management', icon: UtensilsCrossed, badge: content?.menu?.categories?.length },
    { id: 'signatureDishes', label: 'Signature Dishes', icon: Award, badge: content?.signatureDishes?.items?.length },
    { id: 'experience', label: 'Experience', icon: Flame },
    { id: 'ambience', label: 'Ambience', icon: Layers, badge: content?.ambience?.moments?.length },
    { id: 'gallery', label: 'Gallery', icon: Camera, badge: content?.gallery?.items?.length },
    { id: 'contact', label: 'Contact Info', icon: MapPin },
    { id: 'footer', label: 'Footer', icon: PanelBottom },
    { id: 'appearance', label: 'Website Appearance', icon: Palette },
    { id: 'fullPreview', label: 'Preview Website', icon: Eye },
    { id: 'settings', label: 'Settings & Data', icon: Settings }
  ];

  const handleSelect = (id) => {
    setActiveSection(id);
    if (onClose) onClose();
  };

  return (
    <aside className={`admin-sidebar ${isOpen ? 'open' : ''}`}>
      {/* Brand Header */}
      <div className="admin-sidebar-header">
        <div
          style={{
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            border: '1px solid #C6A36A',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#C6A36A',
            background: 'rgba(101, 30, 50, 0.4)'
          }}
        >
          <UtensilsCrossed size={18} />
        </div>
        <div>
          <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', letterSpacing: '0.15em', fontWeight: 700, color: '#F7F0E7', display: 'block', lineHeight: 1 }}>
            CAFEANA
          </span>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.62rem', letterSpacing: '0.25em', color: '#C6A36A', textTransform: 'uppercase' }}>
            Visual Admin Studio
          </span>
        </div>
      </div>

      {/* Navigation List */}
      <ul className="admin-sidebar-nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;

          return (
            <li key={item.id}>
              <div
                className={`admin-nav-item ${isActive ? 'active' : ''}`}
                onClick={() => handleSelect(item.id)}
              >
                <Icon size={18} />
                <span style={{ flexGrow: 1 }}>{item.label}</span>
                {item.badge !== undefined && (
                  <span
                    style={{
                      fontSize: '0.72rem',
                      background: isActive ? '#C6A36A' : 'rgba(198, 163, 106, 0.2)',
                      color: isActive ? '#211817' : '#C6A36A',
                      padding: '0.1rem 0.45rem',
                      borderRadius: '999px',
                      fontWeight: 600
                    }}
                  >
                    {item.badge}
                  </span>
                )}
              </div>
            </li>
          );
        })}
      </ul>

      {/* Footer / Logout */}
      <div className="admin-sidebar-footer">
        <div>
          <span style={{ display: 'block', fontSize: '0.75rem', color: '#A89585' }}>Signed in as</span>
          <strong style={{ fontSize: '0.85rem', color: '#F7F0E7' }}>Administrator</strong>
        </div>
        <button
          type="button"
          onClick={logout}
          style={{
            background: 'none',
            border: 'none',
            color: '#C6A36A',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            fontSize: '0.82rem',
            padding: '0.4rem'
          }}
          title="Sign out of Admin Dashboard"
        >
          <LogOut size={16} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
