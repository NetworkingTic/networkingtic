import { useEffect } from "react";

// Garantiza que el visitante vea siempre la última versión publicada.
// Al abrir la página y cada vez que vuelve a la pestaña, consulta version.json (sin caché).
// Si la versión publicada es más nueva que la que tiene cargada, recarga una sola vez
// con un parámetro en la dirección (?v=...) para saltarse cualquier copia guardada.
// En modo desarrollo (npm run dev) no hace nada.

const PARAM = "v";

export const VersionCheck = () => {
  useEffect(() => {
    if (import.meta.env.DEV) return;

    // Si venimos de una actualización, limpiar el ?v= de la barra de direcciones
    const url = new URL(window.location.href);
    if (url.searchParams.has(PARAM)) {
      url.searchParams.delete(PARAM);
      window.history.replaceState(window.history.state, "", url.toString());
    }

    let busy = false;
    const check = async () => {
      if (busy || document.hidden) return;
      busy = true;
      try {
        const res = await fetch(`${import.meta.env.BASE_URL}version.json?t=${Date.now()}`, { cache: "no-store" });
        if (!res.ok) return;
        const { id } = (await res.json()) as { id?: string };
        if (!id || id === __BUILD_ID__) return;

        // Evita recargas en bucle: como máximo un intento por cada versión nueva
        const key = `ntic-update-${id}`;
        try {
          if (sessionStorage.getItem(key)) return;
          sessionStorage.setItem(key, "1");
        } catch {
          /* sin sessionStorage: se intenta igual una vez */
        }
        const next = new URL(window.location.href);
        next.searchParams.set(PARAM, id);
        window.location.replace(next.toString());
      } catch {
        /* sin conexión: se seguirá mostrando la versión actual */
      } finally {
        busy = false;
      }
    };

    check();
    document.addEventListener("visibilitychange", check);
    window.addEventListener("focus", check);
    return () => {
      document.removeEventListener("visibilitychange", check);
      window.removeEventListener("focus", check);
    };
  }, []);

  return null;
};
