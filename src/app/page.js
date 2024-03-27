import HeroSection from './components/HeroSection';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AchivementSection from './components/AchivementSection';
import AboutSection from './components/AboutSection';
import EmailSection from './components/ContactSection';
import SkillSection from '../../app/components/SkillSection';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-primaryBackgrund">
      <Navbar />
      <div className="container mt-24 mx-auto px-12 py-4">
        <HeroSection />
        <AboutSection />
        <AchivementSection />
      </div>
      <SkillSection />
      <div className="container mt-24 mx-auto px-12 py-4">
        <EmailSection />
      </div>
      <Footer />
    </main>
  );
}
