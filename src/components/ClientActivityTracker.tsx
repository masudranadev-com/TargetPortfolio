"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const storageKey = "mr_client_uuid";

function cleanUuid(uuid: string | null) {
  return uuid?.trim().slice(0, 80) || "";
}

function getClientUuid(urlUuid: string | null) {
  const existingUuid = window.localStorage.getItem(storageKey);
  const savedUuid = cleanUuid(existingUuid);

  if (savedUuid) {
    return savedUuid;
  }

  const uuidFromUrl = cleanUuid(urlUuid);
  if (uuidFromUrl) {
    window.localStorage.setItem(storageKey, uuidFromUrl);
    return uuidFromUrl;
  }

  const uuid = window.crypto?.randomUUID
    ? window.crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  window.localStorage.setItem(storageKey, uuid);
  return uuid;
}

function sendActivity(payload: {
  uuid: string;
  pagePath: string;
  pageTitle: string;
  area: string;
  eventType: string;
  durationMs: number;
}) {
  const body = JSON.stringify({
    ...payload,
    occurredAt: Date.now(),
    language: navigator.language,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    screen: `${window.screen.width}x${window.screen.height}`,
  });

  if (navigator.sendBeacon) {
    navigator.sendBeacon("/api/track", new Blob([body], { type: "application/json" }));
    return;
  }

  fetch("/api/track", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: true,
  }).catch(() => undefined);
}

export function ClientActivityTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!pathname || pathname.startsWith("/admin")) {
      return;
    }

    const uuid = getClientUuid(searchParams?.get("uuid") || null);
    const pagePath = `${pathname}${searchParams?.toString() ? `?${searchParams}` : ""}`;
    const pageTitle = document.title || pagePath;
    const startedAt = Date.now();
    let sentPageTime = false;

    sendActivity({
      uuid,
      pagePath,
      pageTitle,
      area: "Loaded page",
      eventType: "Loaded page",
      durationMs: 0,
    });

    const sendPageTime = () => {
      if (sentPageTime) {
        return;
      }

      sentPageTime = true;
      sendActivity({
        uuid,
        pagePath,
        pageTitle,
        area: "Page session",
        eventType: "Time spent",
        durationMs: Date.now() - startedAt,
      });
    };

    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const clickable = target?.closest("a, button, [data-track-area]");
      if (!clickable) {
        return;
      }

      const label =
        clickable.getAttribute("aria-label") ||
        clickable.textContent?.replace(/\s+/g, " ").trim() ||
        clickable.tagName.toLowerCase();

      sendActivity({
        uuid,
        pagePath,
        pageTitle,
        area: label.slice(0, 120),
        eventType: "Clicking area",
        durationMs: Date.now() - startedAt,
      });
    };

    const handleVisibility = () => {
      if (document.visibilityState === "hidden") {
        sendPageTime();
      }
    };

    document.addEventListener("click", handleClick, { passive: true });
    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("pagehide", sendPageTime);

    return () => {
      sendPageTime();
      document.removeEventListener("click", handleClick);
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("pagehide", sendPageTime);
    };
  }, [pathname, searchParams]);

  return null;
}
