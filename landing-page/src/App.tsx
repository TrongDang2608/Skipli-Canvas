import { Component } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { Navbar } from './components/layout/Navbar';
import { HeroSection } from './components/sections/HeroSection';
import { WorkflowSection } from './components/sections/WorkflowSection';
import { FeaturesGrid } from './components/sections/FeaturesGrid';
import { ShowcaseSection } from './components/sections/ShowcaseSection';
import { ComparisonSection } from './components/sections/ComparisonSection';
import { PricingTrialSection } from './components/sections/PricingTrialSection';
import { FinalCtaSection } from './components/sections/FinalCtaSection';
import { Footer } from './components/layout/Footer';
import { VideoModal } from './components/ui/VideoModal';
import { LivingBackground } from './components/ui/LivingBackground';

interface AppProps {}

interface AppState {
  videoModalOpen: boolean;
  scrollProgress: number;
}

export default class App extends Component<AppProps, AppState> {
  private observer: IntersectionObserver | null = null;

  state: AppState = {
    videoModalOpen: false,
    scrollProgress: 0,
  };

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll, { passive: true });

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    const elements = document.querySelectorAll('.reveal-item');
    elements.forEach((el) => this.observer?.observe(el));
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private handleScroll = () => {
    const totalScroll = document.documentElement.scrollTop;
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    if (windowHeight > 0) {
      this.setState({ scrollProgress: (totalScroll / windowHeight) * 100 });
    }
  };

  private handleOpenVideoModal = () => {
    this.setState({ videoModalOpen: true });
  };

  private handleCloseVideoModal = () => {
    this.setState({ videoModalOpen: false });
  };

  render() {
    const { videoModalOpen, scrollProgress } = this.state;

    return (
      <LanguageProvider>
        <div className="min-h-screen bg-transparent text-[#141413] flex flex-col font-sans selection:bg-[#EAE7DC] relative">
          {/* Living Ambient Video Background */}
          <LivingBackground />

          {/* Scroll Progress Bar at Very Top */}
          <div
            className="fixed top-0 left-0 h-[2.5px] bg-[#0B192C] z-[60] transition-all duration-150 ease-out"
            style={{ width: `${scrollProgress}%` }}
          />

          {/* Navigation Bar */}
          <Navbar />

          {/* Main Content Sections */}
          <main className="flex-1">
            <HeroSection onOpenVideoModal={this.handleOpenVideoModal} />
            <WorkflowSection />
            <FeaturesGrid />
            <ShowcaseSection />
            <ComparisonSection />
            <PricingTrialSection />
            <FinalCtaSection />
          </main>

          {/* Footer */}
          <Footer />

          {/* Video Demo Modal */}
          <VideoModal
            isOpen={videoModalOpen}
            onClose={this.handleCloseVideoModal}
          />
        </div>
      </LanguageProvider>
    );
  }
}
