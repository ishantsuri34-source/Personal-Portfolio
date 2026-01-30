import { useEffect, useRef } from "react";


class Particle {
  constructor(canvas, ctx, colors) {
    this.canvas = canvas;
    this.ctx = ctx;

    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;

    this.radius = Math.random() * 2 + 0.5;
    this.color = colors[Math.floor(Math.random() * colors.length)];

    this.vx = (Math.random() - 0.5) * 0.10;
    this.vy = (Math.random() - 0.5) * 0.10;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0) this.x = this.canvas.width;
    if (this.x > this.canvas.width) this.x = 0;
    if (this.y < 0) this.y = this.canvas.height;
    if (this.y > this.canvas.height) this.y = 0;

    this.draw();
  }

  draw() {
    const ctx = this.ctx;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 6;
    ctx.fill();
  }
}

class ShootingStar {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;

  
    const spawnType = Math.floor(Math.random() * 3);

    if (spawnType === 0) {

      this.x = Math.random() * canvas.width;
      this.y = -120;
    } else if (spawnType === 1) {

      this.x = -120;
      this.y = Math.random() * canvas.height * 0.6;
    } else {
   
      this.x = Math.random() * canvas.width * 0.3 - 150;
      this.y = -120;
    }

    this.length = Math.random() * 220 + 160;

    this.speed = Math.random() * 1.2 + 0.8;

    this.vx = this.speed * (0.6 + Math.random() * 0.4);
    this.vy = this.speed;

    this.alpha = 1;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= 0.003;
    this.draw();
  }

  draw() {
    const ctx = this.ctx;
    ctx.save();
    ctx.globalAlpha = this.alpha;

    const gradient = ctx.createLinearGradient(
      this.x,
      this.y,
      this.x - this.length * 0.6,
      this.y - this.length
    );
    gradient.addColorStop(0, "rgba(255,255,255,0.9)");
    gradient.addColorStop(0.6, "rgba(255,255,255,0.4)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");

    ctx.strokeStyle = gradient;
    ctx.lineWidth = 1.8;
    ctx.shadowColor = "white";
    ctx.shadowBlur = 18;

    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(
      this.x - this.length * 0.6,
      this.y - this.length
    );
    ctx.stroke();

    ctx.restore();
  }

  isDead() {
    return (
      this.alpha <= 0 ||
      this.y > this.canvas.height + 200 ||
      this.x > this.canvas.width + 200
    );
  }
}

export default function ParticlesBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    const isMobile =
      window.innerWidth < 768 ||
      /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    let particles = [];
    let shootingStars = [];

    const COLORS = ["rgba(255,255,255,0.8)"];
    const PARTICLE_COUNT = isMobile ? 25 : 70;

    let lastSpawn = 0;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      createParticles();
    }

    function createParticles() {
      particles = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(new Particle(canvas, ctx, COLORS));
      }
    }

    resize();
    window.addEventListener("resize", resize);

    function animate(time) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => p.update());

    
      if (!isMobile && time - lastSpawn > 400) {
        shootingStars.push(new ShootingStar(canvas, ctx));
        lastSpawn = time;
      }

      shootingStars = shootingStars.filter((s) => {
        s.update();
        return !s.isDead();
      });

      requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none"
      }}
    />
  );
}
