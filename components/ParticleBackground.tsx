'use client';

import { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';

export interface ParticleBackgroundHandle {
  moveParticles: () => void;
}

const ParticleBackground = forwardRef<ParticleBackgroundHandle, {}>((props, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Partial[]>([]);

  useImperativeHandle(ref, () => ({moveParticles}));

  const moveParticles = () => {
    particlesRef.current.forEach(particle => {
      const newDirectionX = Math.random() * 2 - 1;
      const newDirectionY = Math.random() * 2 - 1;
      const newSpeed = Math.random() * 300;
      particle.newBaseX = particle.baseX + newDirectionX * newSpeed;
      particle.newBaseY = particle.baseY + newDirectionY * newSpeed;
    });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let mouse = { x: null as number | null, y: null as number | null, radius: 150 };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.x;
      mouse.y = e.y;
    };

    const handleMouseOut = () => {
      mouse.x = null;
      mouse.y = null;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseOut);

    class Particle {
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      newBaseX: number;
      newBaseY: number;
      size: number;
      density: number;
      color: string;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.baseX = x;
        this.baseY = y;
        this.newBaseX = x;
        this.newBaseY = y;
        this.size = Math.random() * 2 + 1;
        this.density = Math.random() * 30 + 1;
        this.color = Math.random() > 0.5 ? '#adc6ff' : '#6ddd81';
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }

      update() {
        if (this.x !== this.newBaseX) {
          let dx = this.x - this.newBaseX;
          this.x -= dx / 50;
        }
        if (this.y !== this.newBaseY) {
          let dy = this.y - this.newBaseY;
          this.y -= dy / 50;
        }

        if (mouse.x != null && mouse.y != null) {
          let dx = mouse.x - this.x;
          let dy = mouse.y - this.y;
          let distance = Math.sqrt(dx * dx + dy * dy);
          let forceDirectionX = dx / distance;
          let forceDirectionY = dy / distance;
          let maxDistance = mouse.radius;
          let force = (maxDistance - distance) / maxDistance;
          let directionX = forceDirectionX * force * this.density;
          let directionY = forceDirectionY * force * this.density;

          if (distance < mouse.radius) {
            this.x -= directionX;
            this.y -= directionY;
          } 
        } 
      }
    }

    function init() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particlesRef.current = [];
      let numberOfParticles = (canvas.width * canvas.height) / 9000;
      for (let i = 0; i < numberOfParticles; i++) {
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        particlesRef.current.push(new Particle(x, y));
      }
    }

    let animationFrameId: number;

    function animate() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particlesRef.current.length; i++) {
        particlesRef.current[i].draw();
        particlesRef.current[i].update();
      }
      connect();
      animationFrameId = requestAnimationFrame(animate);
    }

    function connect() {
      if (!ctx) return;
      let opacityValue = 1;
      for (let a = 0; a < particlesRef.current.length; a++) {
        for (let b = a; b < particlesRef.current.length; b++) {
          let dx = particlesRef.current[a].x - particlesRef.current[b].x;
          let dy = particlesRef.current[a].y - particlesRef.current[b].y;
          let distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            opacityValue = 1 - distance / 100;
            ctx.strokeStyle = `rgba(173, 198, 255, ${opacityValue * 0.5})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particlesRef.current[a].x, particlesRef.current[a].y);
            ctx.lineTo(particlesRef.current[b].x, particlesRef.current[b].y);
            ctx.stroke();
          }
        }
      }
    }

    init();
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseOut);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas id='particle-canvas' ref={canvasRef} />;
});

ParticleBackground.displayName = 'ParticleBackground';

export default ParticleBackground;
