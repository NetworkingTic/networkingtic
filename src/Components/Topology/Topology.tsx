import { useEffect, useRef } from "react";
import PublicIcon from "@mui/icons-material/PublicOutlined";
import SecurityIcon from "@mui/icons-material/ShieldOutlined";
import HubIcon from "@mui/icons-material/HubOutlined";
import DnsIcon from "@mui/icons-material/DnsOutlined";
import StorageIcon from "@mui/icons-material/StorageOutlined";
import ComputerIcon from "@mui/icons-material/ComputerOutlined";
import { useLanguage } from "../../i18n/LanguageContext";
import { Dictionary } from "../../i18n/translations";
import "./Topology.css";

/* ==========================================================
   Red neuronal 3D del inicio (Canvas 2D con proyección 3D propia, sin librerías).
   - Esfera exterior de nodos + núcleo interior que giran a distinta velocidad, y polvo de fondo.
   - Conexiones entre vecinos, paquetes de luz que viajan por ellas y destellos ocasionales.
   - Las 6 etiquetas de la infraestructura van ancladas a nodos y se mueven con la red.
   - Computador: la red se inclina con el cursor y los nodos cercanos se iluminan.
   - Celular: se gira deslizando el dedo en horizontal (el desplazamiento vertical de la página sigue
     funcionando) y un toque produce un destello.
   - "Reducir movimiento" activado: la red sigue visible y en movimiento, más lenta, sin destellos ni giros.
   - Se pausa cuando no está en pantalla o la pestaña está oculta.
   ========================================================== */

type LabelKey = keyof Dictionary["hero"]["nodes"];
type V3 = { x: number; y: number; z: number };

// Etiquetas: "Red principal" en el centro; las demás repartidas en distintas alturas para no taparse.
const LABELS: { key: LabelKey; Icon: typeof PublicIcon; pos: V3 | null }[] = [
  { key: "internet", Icon: PublicIcon, pos: { x: 0.18, y: -0.92, z: 0.35 } },
  { key: "firewall", Icon: SecurityIcon, pos: { x: 0.86, y: -0.42, z: 0.28 } },
  { key: "core", Icon: HubIcon, pos: null },
  { key: "servers", Icon: DnsIcon, pos: { x: -0.88, y: 0.02, z: 0.47 } },
  { key: "storage", Icon: StorageIcon, pos: { x: 0.62, y: 0.46, z: -0.64 } },
  { key: "users", Icon: ComputerIcon, pos: { x: -0.3, y: 0.88, z: 0.37 } },
];

const norm = (v: V3): V3 => {
  const l = Math.hypot(v.x, v.y, v.z) || 1;
  return { x: v.x / l, y: v.y / l, z: v.z / l };
};

// Puntos repartidos uniformemente sobre una esfera (espiral de Fibonacci)
const fibonacci = (n: number, r: number): V3[] => {
  const pts: V3[] = [];
  const g = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const rad = Math.sqrt(1 - y * y);
    const th = g * i;
    pts.push({ x: Math.cos(th) * rad * r, y: y * r, z: Math.sin(th) * rad * r });
  }
  return pts;
};

// Une cada punto con sus k vecinos más cercanos (sin duplicar)
const neighbours = (pts: V3[], k: number, offset: number): [number, number][] => {
  const set = new Set<string>();
  const out: [number, number][] = [];
  pts.forEach((p, i) => {
    pts
      .map((q, j) => ({ j, d: (p.x - q.x) ** 2 + (p.y - q.y) ** 2 + (p.z - q.z) ** 2 }))
      .filter((o) => o.j !== i)
      .sort((a, b) => a.d - b.d)
      .slice(0, k)
      .forEach(({ j }) => {
        const a = Math.min(i, j) + offset;
        const b = Math.max(i, j) + offset;
        const key = `${a}-${b}`;
        if (!set.has(key)) {
          set.add(key);
          out.push([a, b]);
        }
      });
  });
  return out;
};

const glowSprite = (color: string) => {
  const c = document.createElement("canvas");
  c.width = c.height = 64;
  const g = c.getContext("2d")!;
  // primero la forma (solo transparencia) y luego se pinta del color: así el halo no se agrisa
  const grd = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  grd.addColorStop(0, "rgba(0,0,0,1)");
  grd.addColorStop(0.25, "rgba(0,0,0,0.9)");
  grd.addColorStop(0.6, "rgba(0,0,0,0.25)");
  grd.addColorStop(1, "rgba(0,0,0,0)");
  g.fillStyle = grd;
  g.fillRect(0, 0, 64, 64);
  g.globalCompositeOperation = "source-in";
  g.fillStyle = color;
  g.fillRect(0, 0, 64, 64);
  return c;
};

export const Topology = () => {
  const { t } = useLanguage();
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chipRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!wrap || !canvas || !ctx) return;

    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    const fine = window.matchMedia?.("(pointer: fine)").matches ?? true;

    // ---------- Escena ----------
    let W = 0;
    let H = 0;
    let R = 100;
    let dpr = 1;
    let small = false;

    type Node = { p: V3; shell: 0 | 1 | 2; flash: number; size: number; anchor: boolean };
    let nodes: Node[] = [];
    let edges: [number, number][] = [];
    let spokes: [number, number][] = [];
    const anchorIdx: number[] = [];
    let adj: number[][] = [];

    const build = () => {
      small = W < 520;
      const outerN = small ? 54 : W < 800 ? 72 : 92;
      const innerN = small ? 16 : 22;
      const dustN = small ? 26 : 44;
      const outer = fibonacci(outerN, 1);
      const inner = fibonacci(innerN, 0.48);
      nodes = [];
      outer.forEach((p) => nodes.push({ p, shell: 0, flash: 0, size: 1, anchor: false }));
      inner.forEach((p) => nodes.push({ p, shell: 1, flash: 0, size: 0.8, anchor: false }));
      for (let i = 0; i < dustN; i++) {
        const v = norm({ x: Math.random() - 0.5, y: Math.random() - 0.5, z: Math.random() - 0.5 });
        const r = 1.25 + Math.random() * 0.55;
        nodes.push({ p: { x: v.x * r, y: v.y * r, z: v.z * r }, shell: 2, flash: 0, size: 0.55, anchor: false });
      }
      edges = [...neighbours(outer, 3, 0), ...neighbours(inner, 2, outerN)];

      // anclar las etiquetas al nodo exterior más cercano a su posición
      anchorIdx.length = 0;
      LABELS.forEach((l) => {
        if (!l.pos) {
          anchorIdx.push(-1);
          return;
        }
        const target = norm(l.pos);
        let best = 0;
        let bd = Infinity;
        outer.forEach((p, i) => {
          const d = (p.x - target.x) ** 2 + (p.y - target.y) ** 2 + (p.z - target.z) ** 2;
          if (d < bd && !anchorIdx.includes(i)) {
            bd = d;
            best = i;
          }
        });
        nodes[best].anchor = true;
        nodes[best].size = 1.6;
        anchorIdx.push(best);
      });

      // radios del núcleo hacia cada nodo de infraestructura
      spokes = anchorIdx.filter((i) => i >= 0).map((i) => [-1, i] as [number, number]);

      packets = [];
      adj = nodes.map(() => []);
      edges.forEach(([a, b]) => {
        adj[a].push(b);
        adj[b].push(a);
      });
    };

    const resize = () => {
      const r = wrap.getBoundingClientRect();
      W = r.width;
      H = r.height;
      dpr = Math.min(window.devicePixelRatio || 1, W < 520 ? 1.75 : 2);
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      R = Math.min(W, H) * (small ? 0.36 : 0.37);
      build();
      R = Math.min(W, H) * (small ? 0.36 : 0.37);
    };

    // ---------- Colores del tema ----------
    let colors = { brand: "#1271b2", teal: "#52a0b8", ink: "#0d2131", dark: false };
    let sprites = { brand: glowSprite("#1271b2"), teal: glowSprite("#52a0b8"), white: glowSprite("#ffffff") };
    const readColors = () => {
      const cs = getComputedStyle(document.documentElement);
      const get = (n: string, d: string) => cs.getPropertyValue(n).trim() || d;
      colors = {
        brand: get("--brand", "#1271b2"),
        teal: get("--teal", "#52a0b8"),
        ink: get("--ink", "#0d2131"),
        dark: document.documentElement.dataset.theme === "dark",
      };
      sprites = { brand: glowSprite(colors.brand), teal: glowSprite(colors.teal), white: glowSprite("#ffffff") };
    };

    // ---------- Interacción ----------
    const pointer = { x: -9999, y: -9999, inside: false, tx: 0, ty: 0 };
    let tiltX = 0;
    let tiltY = 0;
    let dragVel = 0;
    let drag: { x: number; y: number; moved: boolean; id: number } | null = null;

    const local = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const nearestNode = (x: number, y: number) => {
      let best = -1;
      let bd = Infinity;
      proj.forEach((p, i) => {
        if (nodes[i].shell === 2) return;
        const d = (p.sx - x) ** 2 + (p.sy - y) ** 2;
        if (d < bd) {
          bd = d;
          best = i;
        }
      });
      return best;
    };
    const flashAround = (i: number) => {
      if (i < 0) return;
      nodes[i].flash = 1;
      adj[i].forEach((j) => (nodes[j].flash = Math.max(nodes[j].flash, 0.6)));
      for (let k = 0; k < 3; k++) launchPacket(i);
    };

    const onMove = (e: PointerEvent) => {
      const l = local(e);
      if (e.pointerType === "mouse") {
        pointer.x = l.x;
        pointer.y = l.y;
        pointer.inside = true;
        if (!reduce) {
          pointer.tx = (l.x / W - 0.5) * 2;
          pointer.ty = (l.y / H - 0.5) * 2;
        }
        return;
      }
      if (drag && e.pointerId === drag.id) {
        const dx = l.x - drag.x;
        if (Math.abs(dx) > 6 || Math.abs(l.y - drag.y) > 6) drag.moved = true;
        if (!reduce) dragVel = dx * 0.006;
        drag.x = l.x;
        drag.y = l.y;
      }
    };
    const onDown = (e: PointerEvent) => {
      if (e.pointerType === "mouse") return;
      const l = local(e);
      drag = { x: l.x, y: l.y, moved: false, id: e.pointerId };
    };
    const onUp = (e: PointerEvent) => {
      const l = local(e);
      if (e.pointerType === "mouse") {
        if (!reduce) flashAround(nearestNode(l.x, l.y));
        return;
      }
      if (drag && !drag.moved && !reduce) flashAround(nearestNode(l.x, l.y));
      drag = null;
    };
    const onLeave = (e: PointerEvent) => {
      if (e.pointerType === "mouse") {
        pointer.inside = false;
        pointer.x = pointer.y = -9999;
        pointer.tx = pointer.ty = 0;
      }
    };
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointercancel", () => (drag = null));
    canvas.addEventListener("pointerleave", onLeave);

    // ---------- Paquetes de luz ----------
    type Packet = { a: number; b: number; t: number; speed: number; hops: number; teal: boolean };
    let packets: Packet[] = [];
    const maxPackets = () => (reduce ? 6 : small ? 12 : 18);
    function launchPacket(from?: number) {
      if (packets.length >= maxPackets() + 6) return;
      let a: number;
      let b: number;
      if (from === undefined && Math.random() < 0.35) {
        // tráfico por los radios: núcleo <-> nodo de infraestructura
        const s = spokes[Math.floor(Math.random() * spokes.length)];
        [a, b] = Math.random() < 0.5 ? [s[0], s[1]] : [s[1], s[0]];
      } else {
        a = from ?? Math.floor(Math.random() * nodes.length);
        if (nodes[a]?.shell === 2) a = Math.floor(Math.random() * 40);
        const opts = adj[a] ?? [];
        if (!opts.length) return;
        b = opts[Math.floor(Math.random() * opts.length)];
      }
      packets.push({
        a,
        b,
        t: 0,
        speed: (reduce ? 0.25 : 0.7) * (0.7 + Math.random() * 0.8),
        hops: reduce ? 1 : 1 + Math.floor(Math.random() * 3),
        teal: Math.random() < 0.45,
      });
    }

    // ---------- Proyección ----------
    type Proj = { sx: number; sy: number; z: number; s: number };
    let proj: Proj[] = [];
    const core: Proj = { sx: 0, sy: 0, z: 0, s: 1 };
    let rotOuter = 0;
    let rotInner = 0;
    let rotDust = 0;

    const project = (p: V3, ry: number, rx: number, scale: number): Proj => {
      const cy = Math.cos(ry);
      const sy = Math.sin(ry);
      const x1 = p.x * cy + p.z * sy;
      const z1 = -p.x * sy + p.z * cy;
      const cx = Math.cos(rx);
      const sx = Math.sin(rx);
      const y1 = p.y * cx - z1 * sx;
      const z2 = p.y * sx + z1 * cx;
      const d = 3.2;
      const s = d / (d - z2);
      return { sx: W / 2 + x1 * R * scale * s, sy: H / 2 + y1 * R * scale * s, z: z2, s };
    };

    // ---------- Bucle de animación ----------
    let raf = 0;
    let running = false;
    let last = performance.now();
    let flashTimer = 0;
    let packetTimer = 0;

    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;

      const speed = reduce ? 0.35 : 1;
      dragVel *= 0.94;
      rotOuter += (0.14 * speed) * dt + dragVel;
      rotInner -= (0.22 * speed) * dt - dragVel * 0.6;
      rotDust += 0.04 * speed * dt;
      tiltX += ((-0.32 + pointer.ty * 0.28) - tiltX) * Math.min(1, dt * 3);
      tiltY += (pointer.tx * 0.35 - tiltY) * Math.min(1, dt * 3);
      const breathe = 1 + Math.sin(now / 2400) * (reduce ? 0.006 : 0.015);

      proj = nodes.map((n) => {
        if (n.shell === 0) return project(n.p, rotOuter + tiltY, tiltX, breathe);
        if (n.shell === 1) return project(n.p, rotInner + tiltY * 1.4, tiltX * 1.3, breathe);
        return project(n.p, rotDust + tiltY * 0.4, tiltX * 0.5, 1);
      });
      const c = project({ x: 0, y: 0, z: 0 }, 0, 0, 1);
      core.sx = c.sx;
      core.sy = c.sy;

      // destellos aleatorios
      if (!reduce) {
        flashTimer -= dt;
        if (flashTimer <= 0) {
          flashTimer = 0.5 + Math.random() * 0.9;
          const i = Math.floor(Math.random() * nodes.length);
          if (nodes[i].shell !== 2) nodes[i].flash = 1;
        }
      }
      // nuevos paquetes
      packetTimer -= dt;
      if (packetTimer <= 0 && packets.length < maxPackets()) {
        packetTimer = reduce ? 0.9 : 0.18;
        launchPacket();
      }

      // ---------- Dibujo ----------
      ctx.clearRect(0, 0, W, H);
      const zDepth = (z: number) => Math.max(0, Math.min(1, (z + 1.2) / 2.4)); // 0 lejos, 1 cerca
      const ptP = (i: number) => (i === -1 ? { ...core, z: 0.2, s: 1 } : proj[i]);

      // resplandor del núcleo
      const coreR = R * (0.55 + Math.sin(now / 900) * (reduce ? 0.01 : 0.04));
      ctx.globalAlpha = colors.dark ? 0.55 : 0.38;
      ctx.drawImage(sprites.teal, core.sx - coreR, core.sy - coreR, coreR * 2, coreR * 2);
      ctx.globalAlpha = colors.dark ? 0.35 : 0.22;
      ctx.drawImage(sprites.brand, core.sx - R * 1.05, core.sy - R * 1.05, R * 2.1, R * 2.1);

      // polvo de fondo
      ctx.fillStyle = colors.dark ? "#9fc9e6" : colors.brand;
      proj.forEach((p, i) => {
        if (nodes[i].shell !== 2) return;
        ctx.globalAlpha = 0.12 + zDepth(p.z) * 0.25;
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, Math.max(0.8, 1.1 * p.s), 0, Math.PI * 2);
        ctx.fill();
      });

      // conexiones
      ctx.lineWidth = small ? 0.8 : 1;
      edges.forEach(([a, b]) => {
        const pa = proj[a];
        const pb = proj[b];
        const depth = zDepth((pa.z + pb.z) / 2);
        const lit = Math.max(nodes[a].flash, nodes[b].flash);
        ctx.globalAlpha = (colors.dark ? 0.1 : 0.12) + depth * (colors.dark ? 0.32 : 0.3) + lit * 0.45;
        ctx.strokeStyle = nodes[a].shell === 1 ? colors.teal : colors.brand;
        ctx.beginPath();
        ctx.moveTo(pa.sx, pa.sy);
        ctx.lineTo(pb.sx, pb.sy);
        ctx.stroke();
      });
      // radios del núcleo a la infraestructura
      ctx.setLineDash([3, 5]);
      ctx.lineDashOffset = -now / (reduce ? 120 : 40);
      spokes.forEach(([, b]) => {
        const pb = proj[b];
        ctx.globalAlpha = 0.2 + zDepth(pb.z) * 0.45;
        ctx.strokeStyle = colors.teal;
        ctx.beginPath();
        ctx.moveTo(core.sx, core.sy);
        ctx.lineTo(pb.sx, pb.sy);
        ctx.stroke();
      });
      ctx.setLineDash([]);

      // paquetes de luz
      packets = packets.filter((pk) => {
        pk.t += pk.speed * dt * (pk.a === -1 || pk.b === -1 ? 0.8 : 1.6);
        if (pk.t >= 1) {
          if (pk.b >= 0) nodes[pk.b].flash = Math.max(nodes[pk.b].flash, reduce ? 0 : 0.5);
          pk.hops -= 1;
          if (pk.hops <= 0 || pk.b < 0 || !adj[pk.b]?.length) return false;
          const next = adj[pk.b][Math.floor(Math.random() * adj[pk.b].length)];
          pk.a = pk.b;
          pk.b = next;
          pk.t = 0;
        }
        const pa = ptP(pk.a);
        const pb = ptP(pk.b);
        const x = pa.sx + (pb.sx - pa.sx) * pk.t;
        const y = pa.sy + (pb.sy - pa.sy) * pk.t;
        const z = pa.z + (pb.z - pa.z) * pk.t;
        const d = zDepth(z);
        const size = (small ? 9 : 11) * (0.55 + d * 0.7);
        ctx.globalAlpha = 0.45 + d * 0.55;
        ctx.drawImage(pk.teal ? sprites.teal : sprites.brand, x - size, y - size, size * 2, size * 2);
        ctx.globalAlpha = 0.7 + d * 0.3;
        ctx.drawImage(sprites.white, x - size * 0.28, y - size * 0.28, size * 0.56, size * 0.56);
        return true;
      });

      // nodos (de lejos a cerca)
      const order = proj.map((_p, i) => i).filter((i) => nodes[i].shell !== 2).sort((a, b) => proj[a].z - proj[b].z);
      const baseR = Math.max(small ? 1.9 : 1.7, R * 0.016);
      order.forEach((i) => {
        const n = nodes[i];
        const p = proj[i];
        const d = zDepth(p.z);
        let hover = 0;
        if (pointer.inside) {
          const dist = Math.hypot(p.sx - pointer.x, p.sy - pointer.y);
          hover = Math.max(0, 1 - dist / 90);
        }
        const r = baseR * n.size * (0.6 + d * 0.75) * (1 + hover * 0.8 + n.flash * 0.6);
        const glow = Math.max(n.flash, hover * 0.8, n.anchor ? 0.45 : 0);
        if (glow > 0.02 || d > 0.7) {
          const gs = r * (4 + glow * 4);
          ctx.globalAlpha = (0.18 + glow * 0.6) * (0.4 + d * 0.6);
          ctx.drawImage(n.shell === 1 ? sprites.teal : sprites.brand, p.sx - gs, p.sy - gs, gs * 2, gs * 2);
        }
        ctx.globalAlpha = 0.35 + d * 0.65;
        ctx.fillStyle = n.flash > 0.5 ? "#ffffff" : n.shell === 1 ? colors.teal : colors.brand;
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, r, 0, Math.PI * 2);
        ctx.fill();
        if (n.flash > 0.05 && !reduce) {
          ctx.globalAlpha = n.flash * 0.6;
          ctx.strokeStyle = colors.teal;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(p.sx, p.sy, r + (1 - n.flash) * 18, 0, Math.PI * 2);
          ctx.stroke();
        }
        n.flash = Math.max(0, n.flash - dt * 1.3);
      });

      // núcleo central
      ctx.globalAlpha = 1;
      ctx.drawImage(sprites.white, core.sx - 7, core.sy - 7, 14, 14);
      ctx.globalAlpha = 1;

      // etiquetas ancladas
      LABELS.forEach((_l, k) => {
        const el = chipRefs.current[k];
        if (!el) return;
        const i = anchorIdx[k];
        const p = i === -1 ? { sx: core.sx, sy: core.sy, z: 1.2, s: 1 } : proj[i];
        const d = zDepth(p.z);
        const sc = i === -1 ? 1 : 0.82 + d * 0.22;
        el.style.transform = `translate3d(${p.sx}px, ${p.sy}px, 0) translate(-50%, ${i === -1 ? "-50%" : "calc(-100% - 10px)"}) scale(${sc})`;
        el.style.opacity = String(i === -1 ? 1 : 0.35 + d * 0.65);
        el.style.zIndex = String(Math.round(d * 100));
      });

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

    readColors();
    resize();
    for (let i = 0; i < maxPackets(); i++) launchPacket();
    packets.forEach((p) => (p.t = Math.random()));

    const ro = new ResizeObserver(() => resize());
    ro.observe(wrap);
    const themeObs = new MutationObserver(readColors);
    themeObs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    let visible = true;
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !document.hidden) start();
      else stop();
    });
    io.observe(wrap);
    const onVis = () => (document.hidden || !visible ? stop() : start());
    document.addEventListener("visibilitychange", onVis);
    start();

    // en pantallas táctiles no hay cursor: inclinación base fija
    if (!fine) pointer.tx = pointer.ty = 0;

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      themeObs.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <figure className="topology" aria-label={t.hero.status}>
      <figcaption className="topology__status">
        <span className="pulse-dot" aria-hidden="true" />
        {t.hero.status}
      </figcaption>
      <div ref={wrapRef} className="topology__scene">
        <canvas ref={canvasRef} className="topology__canvas" aria-hidden="true" />
        {LABELS.map(({ key, Icon, pos }, k) => (
          <div
            key={key}
            ref={(el) => {
              chipRefs.current[k] = el;
            }}
            className={`topology__chip${pos ? "" : " is-core"}`}
            aria-hidden="true"
          >
            <Icon fontSize="inherit" />
            <span>{t.hero.nodes[key]}</span>
            <i className="topology__led" />
          </div>
        ))}
      </div>
    </figure>
  );
};
