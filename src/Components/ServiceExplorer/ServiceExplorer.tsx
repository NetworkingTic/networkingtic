import { CSSProperties, KeyboardEvent, PointerEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import CheckIcon from "@mui/icons-material/Check";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { serviceGroups, services, ServiceGroup } from "../../data/services";
import { useLanguage } from "../../i18n/LanguageContext";
import { SERVICE_ICONS } from "./ServiceIcons";
import "./ServiceExplorer.css";

// Explorador interactivo de servicios.
// - Computador: lista a la izquierda (foco de luz que sigue al cursor) y panel de detalle fijo a la derecha.
// - Celular / tableta: franja horizontal deslizable y panel debajo; se cambia de servicio deslizando el dedo.
// - Teclado: flechas para moverse por la lista.
// - Todos los textos, fotos y listas vienen de src/data/services.ts (no se cambió el contenido).

type Filter = "all" | ServiceGroup;

const SWIPE_MIN = 45; // px horizontales para considerar un deslizamiento

export const ServiceExplorer = () => {
  const { t, lang } = useLanguage();
  const sp = t.servicesPage;
  const { hash } = useLocation();

  const [filter, setFilter] = useState<Filter>("all");
  const [selectedId, setSelectedId] = useState(services[0].id);
  const [inView, setInView] = useState(false);
  const [dir, setDir] = useState<1 | -1>(1);

  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const swipe = useRef<{ x: number; y: number } | null>(null);
  const mediaTouch = useRef(false);
  const [pressedId, setPressedId] = useState("");
  const pressTimer = useRef(0);
  useEffect(() => () => window.clearTimeout(pressTimer.current), []);

  const visible = useMemo(() => (filter === "all" ? services : services.filter((s) => s.group === filter)), [filter]);
  const index = Math.max(0, visible.findIndex((s) => s.id === selectedId));
  const current = visible[index] ?? visible[0];
  const tx = current.text[lang];
  const Icon = SERVICE_ICONS[current.id];

  // Si el filtro deja por fuera el servicio elegido, se pasa al primero del grupo
  useEffect(() => {
    if (!visible.some((s) => s.id === selectedId)) setSelectedId(visible[0].id);
  }, [visible, selectedId]);

  // Enlaces directos tipo /servicios#seguridad
  useEffect(() => {
    const id = hash.slice(1);
    if (services.some((s) => s.id === id)) {
      setFilter("all");
      setSelectedId(id);
      rootRef.current?.scrollIntoView({ block: "start" });
    }
  }, [hash]);

  // Entrada escalonada una sola vez, cuando el módulo aparece en pantalla
  useEffect(() => {
    const el = rootRef.current;
    if (!el || !("IntersectionObserver" in window)) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // En la franja horizontal (celular), mantener visible el servicio seleccionado
  useEffect(() => {
    const list = listRef.current;
    const item = list?.querySelector<HTMLElement>(`[data-id="${current.id}"]`);
    if (!list || !item || list.scrollWidth <= list.clientWidth) return;
    list.scrollTo({ left: item.offsetLeft - (list.clientWidth - item.offsetWidth) / 2, behavior: "smooth" });
  }, [current.id]);

  const select = useCallback(
    (id: string) => {
      const next = visible.findIndex((s) => s.id === id);
      setDir(next >= index ? 1 : -1);
      setSelectedId(id);
    },
    [visible, index]
  );

  const step = (delta: 1 | -1) => {
    const next = (index + delta + visible.length) % visible.length;
    setDir(delta);
    setSelectedId(visible[next].id);
  };

  const onListKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const keys: Record<string, 1 | -1> = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
    const d = keys[e.key];
    if (!d) return;
    e.preventDefault();
    const next = visible[(index + d + visible.length) % visible.length];
    setDir(d);
    setSelectedId(next.id);
    listRef.current?.querySelector<HTMLElement>(`[data-id="${next.id}"]`)?.focus();
  };

  // Foco de luz que sigue al cursor en cada servicio
  const onItemMove = (e: PointerEvent<HTMLButtonElement>) => {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  // Equivalente táctil: el foco de luz aparece donde se toca
  const onItemDown = (e: PointerEvent<HTMLButtonElement>) => {
    if (e.pointerType === "mouse") return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
    const id = el.dataset.id ?? "";
    setPressedId(id);
    window.clearTimeout(pressTimer.current);
    pressTimer.current = window.setTimeout(() => setPressedId(""), 650);
  };

  // Profundidad 3D de la foto según la posición del cursor
  const onMediaMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!mediaRef.current) return;
    // táctil: la foto se inclina mientras el dedo está apoyado sobre ella
    if (e.pointerType !== "mouse" && !mediaTouch.current) return;
    const r = mediaRef.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    mediaRef.current.style.setProperty("--rx", `${(-py * 7).toFixed(2)}deg`);
    mediaRef.current.style.setProperty("--ry", `${(px * 9).toFixed(2)}deg`);
    mediaRef.current.style.setProperty("--gx", `${((px + 0.5) * 100).toFixed(1)}%`);
    mediaRef.current.style.setProperty("--gy", `${((py + 0.5) * 100).toFixed(1)}%`);
  };
  const onMediaDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse") return;
    mediaTouch.current = true;
    onMediaMove(e);
  };
  const onMediaUp = () => {
    mediaTouch.current = false;
    onMediaLeave();
  };
  const onMediaLeave = () => {
    mediaRef.current?.style.setProperty("--rx", "0deg");
    mediaRef.current?.style.setProperty("--ry", "0deg");
  };

  // Deslizar con el dedo sobre el panel para cambiar de servicio
  const onPanelDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse") return;
    swipe.current = { x: e.clientX, y: e.clientY };
  };
  const onPanelUp = (e: PointerEvent<HTMLDivElement>) => {
    const s = swipe.current;
    swipe.current = null;
    if (!s) return;
    const dx = e.clientX - s.x;
    const dy = e.clientY - s.y;
    if (Math.abs(dx) > SWIPE_MIN && Math.abs(dx) > Math.abs(dy) * 1.4) step(dx < 0 ? 1 : -1);
  };

  const filters: Filter[] = ["all", ...serviceGroups];
  const filterIndex = filters.indexOf(filter);

  return (
    <div ref={rootRef} className={`svx${inView ? " is-in" : ""}`}>
      {/* Filtro por grupo con indicador deslizante */}
      <div className="svx-filter" role="group" aria-label={sp.filterLabel} style={{ "--fi": filterIndex, "--fn": filters.length } as CSSProperties}>
        <span className="svx-filter__pill" aria-hidden="true" />
        {filters.map((f) => (
          <button key={f} type="button" aria-pressed={filter === f} className={filter === f ? "is-on" : undefined} onClick={() => setFilter(f)}>
            {f === "all" ? sp.all : t.servicesSection.groups[f]}
          </button>
        ))}
      </div>

      <div className="svx-body">
        {/* Lista de servicios */}
        <div ref={listRef} className="svx-list" role="tablist" aria-label={sp.listLabel} aria-orientation="vertical" onKeyDown={onListKey}>
          {visible.map((s, i) => {
            const ItemIcon = SERVICE_ICONS[s.id];
            const on = s.id === current.id;
            return (
              <button
                key={s.id}
                id={s.id}
                data-id={s.id}
                type="button"
                role="tab"
                aria-selected={on}
                aria-controls="svx-panel"
                tabIndex={on ? 0 : -1}
                className={`svx-item acc-${s.group}${on ? " is-active" : ""}${pressedId === s.id ? " is-pressed" : ""}`}
                style={{ "--i": i } as CSSProperties}
                onClick={() => select(s.id)}
                onPointerMove={onItemMove}
                onPointerDown={onItemDown}
              >
                <span className={`svx-item__icon${on ? " is-live" : ""}`}>
                  <ItemIcon />
                </span>
                <span className="svx-item__text">
                  <span className="svx-item__group">{t.servicesSection.groups[s.group]}</span>
                  <span className="svx-item__name">{s.text[lang].name}</span>
                  <span className="svx-item__summary">{s.text[lang].summary}</span>
                </span>
                <span className="svx-item__led" aria-hidden="true" />
              </button>
            );
          })}
        </div>

        {/* Panel de detalle */}
        <div
          id="svx-panel"
          role="tabpanel"
          aria-labelledby={current.id}
          className={`svx-panel acc-${current.group}`}
          onPointerDown={onPanelDown}
          onPointerUp={onPanelUp}
          onPointerCancel={() => (swipe.current = null)}
        >
          <div key={current.id + lang} className={`svx-panel__inner ${dir === 1 ? "from-right" : "from-left"}`}>
            <div
              ref={mediaRef}
              className="svx-media"
              onPointerMove={onMediaMove}
              onPointerLeave={onMediaLeave}
              onPointerDown={onMediaDown}
              onPointerUp={onMediaUp}
              onPointerCancel={onMediaUp}
            >
              <div className="svx-media__frame">
                <img src={current.image} alt="" draggable={false} />
                <span className="svx-media__sheen" aria-hidden="true" />
                <span className="svx-media__corners" aria-hidden="true" />
                <span className="svx-media__badge">
                  <span className="svx-media__icon is-live">
                    <Icon />
                  </span>
                  {t.servicesSection.groups[current.group]}
                </span>
              </div>
            </div>

            <div className="svx-info">
              <p className="svx-count" aria-live="polite">
                {index + 1} {sp.of} {visible.length}
              </p>
              <h2 className="svx-title">{tx.name}</h2>
              <p className="svx-summary">{tx.summary}</p>
              <p className="svx-desc">{tx.description}</p>

              <h3 className="svx-inc-title">{sp.includes}</h3>
              <ul className="svx-includes">
                {tx.includes.map((item, i) => (
                  <li key={item} style={{ "--d": i } as CSSProperties}>
                    <span className="svx-check">
                      <CheckIcon fontSize="inherit" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="svx-actions">
                <Link to="/contactanos" className="btn btn-primary svx-cta">
                  {sp.cta}
                  <ArrowForwardIcon fontSize="small" className="svx-cta__arrow" />
                </Link>
                <div className="svx-nav">
                  <button type="button" className="svx-nav__btn" onClick={() => step(-1)} aria-label={sp.prev}>
                    <ChevronLeftIcon />
                  </button>
                  <button type="button" className="svx-nav__btn" onClick={() => step(1)} aria-label={sp.next}>
                    <ChevronRightIcon />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Puntos de posición (celular) */}
          <div className="svx-dots" aria-hidden="true">
            {visible.map((s) => (
              <span key={s.id} className={s.id === current.id ? "is-on" : undefined} />
            ))}
          </div>
          <p className="svx-hint">{sp.swipeHint}</p>
        </div>
      </div>
    </div>
  );
};
