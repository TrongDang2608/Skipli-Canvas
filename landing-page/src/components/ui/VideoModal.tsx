import React, { Component, ReactNode, createRef } from 'react';
import { LanguageContext } from '../../context/LanguageContext';
import { APP_CONFIG } from '../../config';
import { X, ArrowRight, Video } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export class VideoModal extends Component<VideoModalProps> {
  static contextType = LanguageContext;
  declare context: React.ContextType<typeof LanguageContext>;

  private videoRef = createRef<HTMLVideoElement>();
  private playTimeoutId: ReturnType<typeof setTimeout> | null = null;

  componentDidMount(): void {
    if (this.props.isOpen) {
      this.attachListeners();
      this.playLocalVideo();
    }
  }

  componentDidUpdate(prevProps: VideoModalProps): void {
    if (this.props.isOpen !== prevProps.isOpen) {
      if (this.props.isOpen) {
        this.attachListeners();
        this.playLocalVideo();
      } else {
        this.detachListeners();
        this.pauseLocalVideo();
      }
    }
  }

  componentWillUnmount(): void {
    this.detachListeners();
    this.pauseLocalVideo();
    if (this.playTimeoutId) {
      clearTimeout(this.playTimeoutId);
    }
  }

  private playLocalVideo = (): void => {
    if (APP_CONFIG.youtubeVideoId) return;
    this.playTimeoutId = setTimeout(() => {
      if (this.videoRef.current) {
        this.videoRef.current.currentTime = 0;
        this.videoRef.current.play().catch(() => {
          // Graceful fallback if browser blocks unmuted autoplay
        });
      }
    }, 100);
  };

  private pauseLocalVideo = (): void => {
    if (this.videoRef.current) {
      this.videoRef.current.pause();
    }
  };

  private handleKeyDown = (e: KeyboardEvent): void => {
    if (e.key === 'Escape') {
      this.handleClose();
    }
  };

  private attachListeners = (): void => {
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', this.handleKeyDown);
    }
  };

  private detachListeners = (): void => {
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', this.handleKeyDown);
    }
  };

  private handleClose = (): void => {
    this.pauseLocalVideo();
    this.props.onClose();
  };

  render(): ReactNode {
    const { isOpen } = this.props;
    if (!isOpen) return null;

    const { language, t } = this.context;
    const youtubeId = APP_CONFIG.youtubeVideoId?.trim();

    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeInUp"
        onClick={this.handleClose}
      >
        <div
          className="relative w-full max-w-4xl bg-[#141413] border border-[#2E2E2C] rounded-2xl shadow-2xl overflow-hidden flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#2E2E2C] bg-[#1A1A18]">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <Video className="w-4 h-4 text-[#A8A59A] stroke-[1.5]" />
              <h3 className="text-sm font-semibold text-[#FAF9F5]">
                {t.modal.title}
              </h3>
            </div>
            <button
              type="button"
              onClick={this.handleClose}
              className="p-1.5 rounded-md text-[#A8A59A] hover:text-[#FAF9F5] hover:bg-white/10 transition-colors cursor-pointer"
              aria-label={t.modal.close}
            >
              <X className="w-4 h-4 stroke-[2]" />
            </button>
          </div>

          {/* Modal Body: YouTube Iframe or Local HTML5 Video */}
          <div className="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden">
            {youtubeId ? (
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                title={t.modal.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <video
                ref={this.videoRef}
                src="/Demo_Video.mp4"
                controls
                autoPlay
                playsInline
                preload="metadata"
                className="w-full h-full object-contain"
              >
                Trình duyệt của bạn không hỗ trợ phát thẻ video.
              </video>
            )}
          </div>

          {/* Modal Footer / Direct Call to Action */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-5 py-3.5 border-t border-[#2E2E2C] bg-[#1A1A18]">
            <p className="text-xs text-[#A8A59A]">
              {language === 'vi'
                ? 'Quy trình tạo và tinh chỉnh landing page trực quan bằng AI trên Skipli Canvas.'
                : 'Experience the AI visual website creation workflow live in action.'}
            </p>
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <button
                type="button"
                onClick={this.handleClose}
                className="px-3 py-1.5 text-xs text-[#A8A59A] hover:text-[#FAF9F5] transition-colors cursor-pointer"
              >
                {t.modal.close}
              </button>
              <a
                href={APP_CONFIG.authUrl}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-[#FAF9F5] text-[#141413] hover:bg-white transition-all shadow-xs cursor-pointer font-sans"
              >
                <span>{t.hero.ctaPrimary}</span>
                <ArrowRight className="w-3.5 h-3.5 stroke-[2]" />
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
