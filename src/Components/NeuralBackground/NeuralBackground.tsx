import { useEffect, useRef } from "react";
import "./NeuralBackground.css";

/* ==========================================================
   Fondo de red neuronal animada (reutilizable).
   Se coloca dentro de cualquier contenedor con position: relative y lo cubre por completo,
   detrás del contenido. Es independiente de la esfera 3D del Inicio.

   - 3 capas de profundidad: nodos lejanos (pequeños, tenues, lentos) a cercanos (grandes, brillantes).
   - Conexiones entre nodos cercanos con luz azul y cian.
   - Señales que viajan de nodo en nodo e iluminan la línea a su paso, como si transmitieran datos.
   - Nodos que laten (suben y bajan de intensidad) y destellan al recibir una señal.
   - Menos nodos y señales en celulares; se pausa fuera de pantalla o con la pestaña oculta.
   - No captura toques ni clics (pointer-events: none): no interfiere con enlaces ni botones.
   ========================================================== */

const BLUE = "#2f8cff";
const CYAN = "#3fe3ff";

type Node = { x: number; y: number; vx: number; vy: number; layer: number; phase: number; flash: number };
type Signal = { a: number; b: number; t: number; speed: number; hops: number; cyan: boolean };

const sprite = (color: string) => {
  const c = document.createElement("canvas");
  c.width = c.height = 64;
  const g = c.getContext("2d")!;
  const grd = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  grd.addColorStop(0, "rgba(0,0,0,1)");
  grd.addColorStop(0.2, "rgba(0,0,0,0.85)");
  grd.addColorStop(0.55, "rgba(0,0,0,0.22)");
  grd.addColorStop(1, "rgba(0,0,0,0)");
  g.fillStyle = grd;
  g.fillRect(0, 0, 64, 64);
  g.globalCompositeOperation = "source-in";
  g.fillStyle = color;
  g.fillRect(0, 0, 64, 64);
  return c;
};

export const NeuralBackground = ({ className = "" }: { className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !host || !ctx) return;

    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    const motion = reduce ? 0.4 : 1;
    const glowBlue = sprite(BLUE);
    const glowCyan = sprite(CYAN);
    const glowWhite = sprite("#e9fbff");

    let W = 0;
    let H = 0;
    let small = false;
    let linkDist = 140;
    let nodes: Node[] = [];
    let signals: Signal[] = [];
    let neighbours: number[][] = [];

    const LAYERS = [
      { speed: 0.35, size: 0.6, alpha: 0.45 }, // lejos
      { speed: 0.6, size: 0.85, alpha: 0.7 },
      { speed: 1, size: 1.15, alpha: 1 }, // cerca
    ];

    const build = () => {
      small = W < 640;
      linkDist = small ? 120 : 150;
      const density = small ? 5200 : 5600;
      const count = Math.max(24, Math.min(small ? 64 : 140, Math.round((W * H) / density)));
      nodes = Array.from({ length: count }, () => {
        const layer = Math.random() < 0.3 ? 0 : Math.random() < 0.6 ? 1 : 2;
        const a = Math.random() * Math.PI * 2;
        const v = (6 + Math.random() * 10) * LAYERS[layer].speed;
        return { x: Math.random() * W, y: Math.random() * H, vx: Math.cos(a) * v, vy: Math.sin(a) * v, layer, phase: Math.random() * Math.PI * 2, flash: 0 };
      });
      signals = [];
    };

    const resize = () => {
      const r = host.getBoundingClientRect();
      W = Math.max(1, r.width);
      H = Math.max(1, r.height);
      const dpr = Math.min(window.devicePixelRatio || 1, W < 640 ? 1.5 : 2);
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
    };

    const maxSignals = () => (small ? 18 : 34);
    const launch = (from?: number) => {
      if (!nodes.length) return;
      const a = from ?? Math.floor(Math.random() * nodes.length);
      const opts = neighbours[a] ?? [];
      if (!opts.length) return;
      signals.push({
        a,
        b: opts[Math.floor(Math.random() * opts.length)],
        t: 0,
        speed: (0.55 + Math.random() * 0.7) * motion,
        hops: 2 + Math.floor(Math.random() * 4),
        cyan: Math.random() < 0.5,
      });
    };

    let raf = 0;
    let running = false;
    let last = performance.now();
    let spawn = 0;

    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const time = now / 1000;

      // movimiento de los nodos (rebotan suavemente en los bordes)
      nodes.forEach((n) => {
        n.x += n.vx * dt * motion;
        n.y += n.vy * dt * motion;
        if (n.x < -20 || n.x > W + 20) n.vx *= -1;
        if (n.y < -20 || n.y > H + 20) n.vy *= -1;
        n.flash = Math.max(0, n.flash - dt * 1.4);
      });

      // vecinos (conexiones) recalculados cada cuadro: la red se reorganiza mientras se mueve
      neighbours = nodes.map(() => []);
      const links: [number, number, number][] = [];
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          if (Math.abs(nodes[i].layer - nodes[j].layer) > 1) continue;
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d = Math.hypot(dx, dy);
          if (d < linkDist) {
            links.push([i, j, d]);
            neighbours[i].push(j);
            neighbours[j].push(i);
          }
        }
      }

      spawn -= dt;
      if (spawn <= 0 && signals.length < maxSignals()) {
        spawn = (small ? 0.2 : 0.12) / motion;
        launch();
      }

      ctx.clearRect(0, 0, W, H);

      // conexiones base
      ctx.lineWidth = 1;
      links.forEach(([i, j, d]) => {
        const a = nodes[i];
        const b = nodes[j];
        const depth = (LAYERS[a.layer].alpha + LAYERS[b.layer].alpha) / 2;
        const lit = Math.max(a.flash, b.flash);
        ctx.globalAlpha = (1 - d / linkDist) * (0.4 + lit * 0.55) * depth;
        ctx.strokeStyle = a.layer === 2 && b.layer === 2 ? CYAN : BLUE;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      });

      // señales: iluminan la línea progresivamente y saltan al siguiente nodo
      signals = signals.filter((s) => {
        const a = nodes[s.a];
        const b = nodes[s.b];
        if (!a || !b) return false;
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d > linkDist * 1.15) return false; // la conexión se rompió al moverse los nodos
        s.t += (s.speed * dt * 120) / Math.max(40, d);
        const x = a.x + (b.x - a.x) * Math.min(1, s.t);
        const y = a.y + (b.y - a.y) * Math.min(1, s.t);
        const color = s.cyan ? CYAN : BLUE;

        // estela luminosa sobre la línea recorrida
        const grd = ctx.createLinearGradient(a.x, a.y, x, y);
        grd.addColorStop(0, "rgba(63,227,255,0)");
        grd.addColorStop(1, color);
        ctx.globalAlpha = 0.85;
        ctx.strokeStyle = grd;
        ctx.lineWidth = small ? 1.4 : 1.8;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(x, y);
        ctx.stroke();

        // partícula
        const size = small ? 7 : 9;
        ctx.globalAlpha = 0.9;
        ctx.drawImage(s.cyan ? glowCyan : glowBlue, x - size, y - size, size * 2, size * 2);
        ctx.drawImage(glowWhite, x - size * 0.3, y - size * 0.3, size * 0.6, size * 0.6);

        if (s.t >= 1) {
          b.flash = 1;
          s.hops -= 1;
          const next = (neighbours[s.b] ?? []).filter((k) => k !== s.a);
          if (s.hops <= 0 || !next.length) return false;
          s.a = s.b;
          s.b = next[Math.floor(Math.random() * next.length)];
          s.t = 0;
        }
        return true;
      });

      // nodos que laten
      nodes.forEach((n) => {
        const L = LAYERS[n.layer];
        const beat = 0.55 + 0.45 * Math.sin(time * (1.2 + n.layer * 0.35) * motion + n.phase);
        const r = (small ? 1.5 : 1.8) * L.size * (1 + n.flash * 0.8);
        const g = r * (5 + beat * 3 + n.flash * 6);
        ctx.globalAlpha = (0.2 + beat * 0.3 + n.flash * 0.55) * L.alpha;
        ctx.drawImage(n.layer === 2 ? glowCyan : glowBlue, n.x - g, n.y - g, g * 2, g * 2);
        ctx.globalAlpha = (0.45 + beat * 0.45) * L.alpha;
        ctx.fillStyle = n.flash > 0.4 ? "#e9fbff" : n.layer === 2 ? CYAN : "#7fb8ff";
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;

      if (running) raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (running) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);
    let visible = false;
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !document.hidden) start();
      else stop();
    });
    io.observe(host);
    const onVis = () => (document.hidden || !visible ? stop() : start());
    document.addEventListener("visibilitychange", onVis);

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return <canvas ref={canvasRef} className={`neural-bg ${className}`.trim()} aria-hidden="true" />;
};
