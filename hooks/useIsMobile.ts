"use client";
import { useSyncExternalStore } from "react";

function getMatchMediaStore(breakpoint: number) {
  let mq: MediaQueryList | null = null;

  const subscribe = (onStoreChange: () => void) => {
    mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    mq.addEventListener("change", onStoreChange);
    return () => mq?.removeEventListener("change", onStoreChange);
  };

  const getSnapshot = () => {
    if (!mq) {
      mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    }
    return mq.matches;
  };

  const getServerSnapshot = () => false;

  return { subscribe, getSnapshot, getServerSnapshot };
}

export function useIsMobile(breakpoint = 768) {
  const store = getMatchMediaStore(breakpoint);

  return useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    store.getServerSnapshot,
  );
}
