import React, { useState, useEffect } from 'react';
import {
  INITIAL_MESSI_DATA,
  MessiWebsiteData,
  Trophy,
  ClubCareer,
  getStoredMessiData,
  saveStoredMessiData,
  resetStoredMessiData
} from './data/messiData';
import { IntroGatekeeper } from './components/IntroGatekeeper';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { TrophiesSection } from './components/TrophiesSection';
import { JerseyCreatorSection } from './components/JerseyCreatorSection';
import { GoalDistributionSection } from './components/GoalDistributionSection';
import { CareerSection } from './components/CareerSection';
import { TopGoalsRanker } from './components/TopGoalsRanker';
import { RecordsSection } from './components/RecordsSection';
import { VideoSection } from './components/VideoSection';
import { FanCommentsSection } from './components/FanCommentsSection';
import { QuizSection } from './components/QuizSection';
import { MessiBallJuggler } from './components/MessiBallJuggler';
import { AuthModal, FanUser } from './components/AuthModal';
import { VercelGuideModal } from './components/VercelGuideModal';
import { Footer } from './components/Footer';

export default function App() {
  const [data, setData] = useState<MessiWebsiteData>(() => getStoredMessiData());
  // Direct entrance to main landing page (no blocking modal on load)
  const [showIntro, setShowIntro] = useState<boolean>(false);

  // Admin login state
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('messi_admin_logged') === 'true';
    } catch {
      return false;
    }
  });

  // Fan User profile state (saved in localStorage)
  const [currentUser, setCurrentUser] = useState<FanUser | null>(() => {
    try {
      const saved = localStorage.getItem('messi_fan_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [isVercelGuideOpen, setIsVercelGuideOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('hero');

  // Sync state changes to localStorage
  const updateData = (newData: MessiWebsiteData) => {
    setData(newData);
    saveStoredMessiData(newData);
  };

  const handleUpdateTrophy = (updatedTrophy: Trophy) => {
    const newTrophies = data.trophies.map(t => (t.id === updatedTrophy.id ? updatedTrophy : t));
    updateData({ ...data, trophies: newTrophies });
  };

  const handleDeleteTrophy = (id: string) => {
    const newTrophies = data.trophies.filter(t => t.id !== id);
    updateData({ ...data, trophies: newTrophies });
  };

  const handleAddTrophy = (newTrophy: Trophy) => {
    updateData({ ...data, trophies: [newTrophy, ...data.trophies] });
  };

  const handleUpdateBio = (newBio: MessiWebsiteData['bioSummary']) => {
    updateData({ ...data, bioSummary: newBio });
  };

  const handleUpdateClub = (updatedClub: ClubCareer) => {
    const newClubs = data.clubCareers.map(c => (c.id === updatedClub.id ? updatedClub : c));
    updateData({ ...data, clubCareers: newClubs });
  };

  const handleResetData = () => {
    const reset = resetStoredMessiData();
    setData(reset);
  };

  const handleAdminLoginSuccess = () => {
    setIsLoggedIn(true);
    try {
      sessionStorage.setItem('messi_admin_logged', 'true');
    } catch {
      // ignore
    }
  };

  const handleAdminLogout = () => {
    setIsLoggedIn(false);
    try {
      sessionStorage.removeItem('messi_admin_logged');
    } catch {
      // ignore
    }
  };

  const handleFanLogin = (user: FanUser) => {
    setCurrentUser(user);
    try {
      localStorage.setItem('messi_fan_user', JSON.stringify(user));
    } catch {
      // ignore
    }
  };

  const handleFanLogout = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem('messi_fan_user');
    } catch {
      // ignore
    }
  };

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        'hero',
        'about',
        'trophies',
        'jersey-creator',
        'goal-distribution',
        'career',
        'top-goals',
        'records',
        'videos',
        'comments',
        'quiz'
      ];
      const scrollPos = window.scrollY + 200;

      for (const sId of sections) {
        const el = document.getElementById(sId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col selection:bg-amber-400 selection:text-slate-950 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* 1. Fun Intro Screen Gatekeeper ("Messi'yi Seviyor musunuz?") */}
      {showIntro && (
        <IntroGatekeeper
          onEnter={() => {
            setShowIntro(false);
            try {
              sessionStorage.setItem('messi_intro_passed', 'true');
            } catch {
              // ignore
            }
          }}
        />
      )}

      {/* 2. Top Navigation Bar */}
      <Navbar
        isEditMode={isLoggedIn}
        onOpenLogin={() => setIsLoginModalOpen(true)}
        onLogout={handleAdminLogout}
        onOpenVercelGuide={() => setIsVercelGuideOpen(true)}
        onResetIntro={() => setShowIntro(true)}
        activeSection={activeSection}
        currentUser={currentUser}
      />

      {/* 3. Main Application Modules */}
      <main className="flex-1">
        {/* Hero & Profile Section */}
        <HeroSection
          data={data}
          isEditMode={isLoggedIn}
          onOpenLogin={() => setIsLoginModalOpen(true)}
        />

        {/* Biography & Early Life Section */}
        <AboutSection
          data={data}
          isEditMode={isLoggedIn}
          onUpdateBio={handleUpdateBio}
        />

        {/* Trophies & "Neler Başardım" Section (3D Flip Cards & Backstories with specific visuals) */}
        <TrophiesSection
          data={data}
          isEditMode={isLoggedIn}
          onUpdateTrophy={handleUpdateTrophy}
          onDeleteTrophy={handleDeleteTrophy}
          onAddTrophy={handleAddTrophy}
        />

        {/* Custom Memorial Jersey Creator (Hatıra Forma Tasarımı & İmzalatma) */}
        <JerseyCreatorSection />

        {/* Career Goal Distribution (90-Minute Heatmap Matrix & Recharts 15-Minute Intervals) */}
        <GoalDistributionSection />

        {/* Career & Clubs & National Team Section */}
        <CareerSection
          data={data}
          isEditMode={isLoggedIn}
          onUpdateClub={handleUpdateClub}
        />

        {/* Top 10 Goals Candidate List & Interactive Ranker */}
        <TopGoalsRanker />

        {/* Records & Famous Quotes Section (Expanded with 14 Legendary Voices) */}
        <RecordsSection
          data={data}
        />

        {/* Messi Videos & Documentaries Archive (YouTube Integration) */}
        <VideoSection
          isEditMode={isLoggedIn}
        />

        {/* Fan Comments & Guestbook Wall (Kullanıcı Yorum Ekranı) */}
        <FanCommentsSection
          isEditMode={isLoggedIn}
          currentUser={currentUser}
        />

        {/* Fan Quiz Section (Ranked Difficulty Rate: Tribün Çırağı -> Messi Delisi) */}
        <QuizSection />
      </main>

      {/* 4. Footer */}
      <Footer
        onResetIntro={() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          setShowIntro(true);
        }}
        onOpenVercelGuide={() => setIsVercelGuideOpen(true)}
      />

      {/* 5. Complete Fan & Admin Login Modal */}
      <AuthModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        isLoggedInAdmin={isLoggedIn}
        onAdminLogin={handleAdminLoginSuccess}
        onAdminLogout={handleAdminLogout}
        currentUser={currentUser}
        onFanLogin={handleFanLogin}
        onFanLogout={handleFanLogout}
      />

      {/* 6. Vercel Deployment Step-by-Step Guide Modal */}
      <VercelGuideModal
        isOpen={isVercelGuideOpen}
        onClose={() => setIsVercelGuideOpen(false)}
      />

      {/* 7. Enhanced Interactive Floating Ball Juggler Animation */}
      <MessiBallJuggler />
    </div>
  );
}
