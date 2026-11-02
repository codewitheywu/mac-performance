"use client";

import { useSyncExternalStore } from "react";

// The sample has no database, so customer lists live in this browser only.
// Replace each list with Server Actions and queries once accounts are real.
export function createLocalList<T>(
  key: string,
  isItem: (value: unknown) => value is T,
) {
  const none: T[] = [];
  let cache: T[] | null = null;
  const listeners = new Set<() => void>();

  // Storage can be blocked or hold anything, so a bad read just means empty.
  function load() {
    try {
      const stored: unknown = JSON.parse(localStorage.getItem(key) ?? "[]");
      return Array.isArray(stored) ? stored.filter(isItem) : none;
    } catch {
      return none;
    }
  }

  function get() {
    cache ??= load();
    return cache;
  }

  function set(next: T[]) {
    cache = next;
    try {
      localStorage.setItem(key, JSON.stringify(next));
    } catch {
      // Blocked storage: the change still shows until the page reloads.
    }
    listeners.forEach((listener) => listener());
  }

  function subscribe(onChange: () => void) {
    // Keeps two open tabs in step.
    const onStorage = (event: StorageEvent) => {
      if (event.key !== key && event.key !== null) return;
      cache = null;
      onChange();
    };
    listeners.add(onChange);
    window.addEventListener("storage", onStorage);
    return () => {
      listeners.delete(onChange);
      window.removeEventListener("storage", onStorage);
    };
  }

  function useList() {
    return useSyncExternalStore(subscribe, get, () => none);
  }

  return { get, set, useList };
}

const noSubscription = () => () => {};

// False while prerendered and during hydration, so a list read from storage
// can show a placeholder instead of flashing its empty state.
export function useHydrated() {
  return useSyncExternalStore(
    noSubscription,
    () => true,
    () => false,
  );
}
