import React, { useEffect, useRef } from "react";
import * as d3 from "d3-force";
import { useWindowSize } from "react-use";
import { PropsAnimation } from "./Models";

interface Node extends d3.SimulationNodeDatum {
  id: number;
  x: number;
  y: number;
}

interface Link {
  source: Node;
  target: Node;
}

const SVG_NS = "http://www.w3.org/2000/svg";

const getRandomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

/**
 * Fondo animado de red. Para que no consuma batería ni procesador:
 * - Menos nodos en pantallas pequeñas.
 * - Actualiza el SVG directamente (sin volver a renderizar React en cada cuadro).
 * - Se pausa cuando la pestaña no está visible.
 * - Respeta la opción del sistema "reducir movimiento" (se dibuja quieto).
 */
const AnimatedGraphBackground: React.FC<PropsAnimation> = ({
  width = "100%",
  height = "100%",
  nodeColor = "#3498db",
  edgeColor = "#7f8c8d",
  backgroundColor = "#ffffff",
}) => {
  const groupRef = useRef<SVGGElement>(null);
  const { width: windowWidth, height: windowHeight } = useWindowSize();

  useEffect(() => {
    const group = groupRef.current;
    if (!group || windowWidth <= 0) return;

    const isMobile = windowWidth < 768;
    const numberOfNodes = isMobile ? 70 : 140;
    const reduceMotion =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const nodes: Node[] = Array.from({ length: numberOfNodes }, (_, i) => ({
      id: i,
      x: getRandomInt(0, windowWidth),
      y: getRandomInt(0, windowHeight),
      vx: 0,
      vy: 0,
    }));
    const links: Link[] = Array.from({ length: numberOfNodes - 1 }, (_, i) => ({
      source: nodes[i],
      target: nodes[i + 1],
    }));

    // Crear los elementos SVG una sola vez
    group.replaceChildren();
    const lineEls = links.map(() => {
      const line = document.createElementNS(SVG_NS, "line");
      line.setAttribute("stroke", edgeColor);
      line.setAttribute("stroke-width", "1");
      line.setAttribute("opacity", "0.6");
      group.appendChild(line);
      return line;
    });
    const circleEls = nodes.map(() => {
      const circle = document.createElementNS(SVG_NS, "circle");
      circle.setAttribute("r", isMobile ? "4" : "5");
      circle.setAttribute("fill", nodeColor);
      group.appendChild(circle);
      return circle;
    });

    const draw = () => {
      links.forEach((link, i) => {
        const el = lineEls[i];
        el.setAttribute("x1", String(link.source.x));
        el.setAttribute("y1", String(link.source.y));
        el.setAttribute("x2", String(link.target.x));
        el.setAttribute("y2", String(link.target.y));
      });
      nodes.forEach((node, i) => {
        circleEls[i].setAttribute("cx", String(node.x));
        circleEls[i].setAttribute("cy", String(node.y));
      });
    };

    const simulation = d3
      .forceSimulation(nodes)
      .force("link", d3.forceLink(links).distance(40))
      .force("charge", d3.forceManyBody().strength(10))
      .force("center", d3.forceCenter(windowWidth / 2, windowHeight / 1.5))
      .force("collision", d3.forceCollide().radius(isMobile ? 40 : 60))
      .velocityDecay(0.7)
      .on("tick", draw);

    if (reduceMotion) {
      simulation.stop();
      simulation.tick(150);
      draw();
    } else {
      simulation.alphaTarget(0.9);
    }

    const onVisibility = () => {
      if (reduceMotion) return;
      if (document.hidden) simulation.stop();
      else simulation.restart();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      simulation.stop();
    };
  }, [windowWidth, windowHeight, nodeColor, edgeColor]);

  return (
    <svg
      width={width}
      height={height}
      aria-hidden="true"
      focusable="false"
      style={{
        backgroundColor,
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: -1,
        pointerEvents: "none",
      }}
    >
      <g ref={groupRef} />
    </svg>
  );
};

export default AnimatedGraphBackground;
