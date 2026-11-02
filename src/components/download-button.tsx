"use client";

import { useSyncExternalStore } from "react";

type Os = "windows" | "mac" | "linux" | "other";

function detectOs(): Os {
  const ua = navigator.userAgent;
  if (/Android|iPhone|iPad/.test(ua)) return "other";
  if (/Windows/.test(ua)) return "windows";
  if (/Macintosh/.test(ua)) return "mac";
  if (/Linux/.test(ua)) return "linux";
  return "other";
}

const noop = () => () => {};
const LABEL: Record<Os, string> = {
  windows: "Tải cho Windows",
  mac: "Tải cho macOS",
  linux: "Tải cho Ubuntu",
  other: "Xem các bản tải về",
};

/** Only Windows goes straight to a file: macOS and Linux need a choice (chip, package format). */
export function DownloadButton({ windowsUrl }: { windowsUrl: string }) {
  const os = useSyncExternalStore(noop, detectOs, (): Os => "windows");
  return (
    <a className="btn btn-primary" href={os === "windows" ? windowsUrl : "#tai-ve"}>
      {LABEL[os]}
    </a>
  );
}
