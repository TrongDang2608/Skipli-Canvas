import React, { Component, ReactNode } from 'react';

export class LivingBackground extends Component {
  private canvasRef = React.createRef<HTMLCanvasElement>();
  private spotlightRef = React.createRef<HTMLDivElement>();
  private spotlightAnimId: number | null = null;
  private canvasAnimId: number | null = null;
  private mouseX = 0;
  private mouseY = 0;
  private currentX = 0;
  private currentY = 0;

  componentDidMount(): void {
    if (typeof window === 'undefined') return;

    this.initMouseSpotlight();
    this.initCanvasWaves();
  }

  componentWillUnmount(): void {
    if (typeof window === 'undefined') return;

    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('resize', this.handleResize);

    if (this.spotlightAnimId !== null) {
      cancelAnimationFrame(this.spotlightAnimId);
    }
    if (this.canvasAnimId !== null) {
      cancelAnimationFrame(this.canvasAnimId);
    }
  }

  private handleMouseMove = (e: MouseEvent): void => {
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;
  };

  private initMouseSpotlight = (): void => {
    this.mouseX = window.innerWidth / 2;
    this.mouseY = window.innerHeight / 3;
    this.currentX = this.mouseX;
    this.currentY = this.mouseY;

    window.addEventListener('mousemove', this.handleMouseMove, { passive: true });

    const updateSpotlight = (): void => {
      this.currentX += (this.mouseX - this.currentX) * 0.08;
      this.currentY += (this.mouseY - this.currentY) * 0.08;

      if (this.spotlightRef.current) {
        this.spotlightRef.current.style.transform = `translate3d(${this.currentX - 350}px, ${this.currentY - 350}px, 0)`;
      }

      this.spotlightAnimId = requestAnimationFrame(updateSpotlight);
    };

    this.spotlightAnimId = requestAnimationFrame(updateSpotlight);
  };

  private handleResize = (): void => {
    const canvas = this.canvasRef.current;
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };

  private initCanvasWaves = (): void => {
    const canvas = this.canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let step = 0;

    window.addEventListener('resize', this.handleResize);

    const render = (): void => {
      step += 0.0035;
      width = canvas.width;
      height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      // Wave 1: Warm Amber to Coral Ribbon
      const grad1 = ctx.createLinearGradient(0, 0, width, height * 0.6);
      grad1.addColorStop(0, 'rgba(251, 146, 60, 0.18)');
      grad1.addColorStop(0.5, 'rgba(244, 114, 182, 0.16)');
      grad1.addColorStop(1, 'rgba(167, 139, 250, 0.08)');

      ctx.beginPath();
      ctx.moveTo(0, 0);
      for (let x = 0; x <= width; x += 40) {
        const y =
          Math.sin(x * 0.0018 + step * 1.5) * 80 +
          Math.cos(x * 0.001 - step) * 60 +
          height * 0.25;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(width, 0);
      ctx.closePath();
      ctx.fillStyle = grad1;
      ctx.fill();

      // Wave 2: Electric Indigo & Sky Blue Wave
      const grad2 = ctx.createLinearGradient(width, 0, 0, height * 0.7);
      grad2.addColorStop(0, 'rgba(96, 165, 250, 0.22)');
      grad2.addColorStop(0.5, 'rgba(129, 140, 248, 0.18)');
      grad2.addColorStop(1, 'rgba(56, 189, 248, 0.06)');

      ctx.beginPath();
      ctx.moveTo(width, 0);
      for (let x = width; x >= 0; x -= 40) {
        const y =
          Math.cos(x * 0.0022 - step * 1.2) * 90 +
          Math.sin(x * 0.0012 + step * 0.8) * 50 +
          height * 0.38;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(0, 0);
      ctx.closePath();
      ctx.fillStyle = grad2;
      ctx.fill();

      // Wave 3: Mint Emerald to Golden Champagne
      const grad3 = ctx.createLinearGradient(0, height * 0.2, width, height * 0.9);
      grad3.addColorStop(0, 'rgba(52, 211, 153, 0.12)');
      grad3.addColorStop(0.5, 'rgba(252, 211, 77, 0.14)');
      grad3.addColorStop(1, 'rgba(244, 114, 182, 0.08)');

      ctx.beginPath();
      ctx.moveTo(0, height * 0.35);
      for (let x = 0; x <= width; x += 40) {
        const y =
          Math.sin(x * 0.0015 - step * 0.9) * 70 +
          Math.cos(x * 0.002 + step * 1.4) * 45 +
          height * 0.55;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();
      ctx.fillStyle = grad3;
      ctx.fill();

      this.canvasAnimId = requestAnimationFrame(render);
    };

    this.canvasAnimId = requestAnimationFrame(render);
  };

  render(): ReactNode {
    return (
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none">
        {/* 1. Base Pristine Paper Foundation */}
        <div className="absolute inset-0 bg-[#FAF9F5]" />

        {/* 2. Generative Fluid Aurora Waves Canvas */}
        <canvas
          ref={this.canvasRef}
          className="absolute inset-0 w-full h-full filter blur-[40px] opacity-85 transform-gpu"
        />

        {/* 3. Top Linear-Style Radiant Sun Flare */}
        <div className="absolute -top-[140px] left-1/2 -translate-x-1/2 w-[1200px] h-[650px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-300/40 via-sky-300/30 to-transparent blur-[90px] pointer-events-none transform-gpu animate-aurora-breathe" />

        {/* 4. Dynamic Living Floating Aurora Orbs */}
        <div className="absolute top-[8%] -left-[12%] w-[850px] h-[850px] rounded-full bg-gradient-to-tr from-[#FDA4AF]/45 via-[#FDE68A]/40 to-transparent blur-[100px] animate-ambient-1 transform-gpu mix-blend-multiply" />
        <div className="absolute top-[32%] -right-[15%] w-[950px] h-[950px] rounded-full bg-gradient-to-bl from-[#818CF8]/40 via-[#C4B5FD]/35 to-transparent blur-[110px] animate-ambient-2 transform-gpu mix-blend-multiply" />
        <div className="absolute top-[65%] left-[5%] w-[900px] h-[900px] rounded-full bg-gradient-to-br from-[#6EE7B7]/35 via-[#7DD3FC]/35 to-transparent blur-[105px] animate-ambient-3 transform-gpu mix-blend-multiply" />

        {/* 5. Interactive Mouse Spotlight Halo */}
        <div
          ref={this.spotlightRef}
          className="absolute top-0 left-0 w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/70 via-sky-200/25 to-transparent blur-[80px] pointer-events-none transform-gpu will-change-transform opacity-90 transition-opacity duration-500"
        />

        {/* 6. Precision Engineering Tech Grid */}
        <div className="absolute inset-0 bg-tech-grid opacity-60 [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_90%)]" />

        {/* 7. Subtle Tech Dots Overlay */}
        <div className="absolute inset-0 bg-tech-dots opacity-35 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_85%)]" />

        {/* 8. Modern Crosshair Grid Markers */}
        <div className="absolute top-24 left-12 text-[#9E9B8F]/40 font-mono text-sm hidden lg:block select-none">+</div>
        <div className="absolute top-24 right-12 text-[#9E9B8F]/40 font-mono text-sm hidden lg:block select-none">+</div>
        <div className="absolute top-[48%] left-16 text-[#9E9B8F]/35 font-mono text-sm hidden lg:block select-none">+</div>
        <div className="absolute top-[48%] right-16 text-[#9E9B8F]/35 font-mono text-sm hidden lg:block select-none">+</div>
        <div className="absolute bottom-32 left-12 text-[#9E9B8F]/40 font-mono text-sm hidden lg:block select-none">+</div>
        <div className="absolute bottom-32 right-12 text-[#9E9B8F]/40 font-mono text-sm hidden lg:block select-none">+</div>

        {/* 9. Bottom Ambient Glow Anchor */}
        <div className="absolute bottom-0 left-0 right-0 h-[350px] bg-gradient-to-t from-[#FAF9F5] via-[#FAF9F5]/80 to-transparent pointer-events-none" />
      </div>
    );
  }
}
