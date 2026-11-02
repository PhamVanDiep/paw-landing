import { cacheLife } from "next/cache";

export const RELEASES_REPO = "PhamVanDiep/pmis-auto-work-releases";
export const RELEASES_URL = `https://github.com/${RELEASES_REPO}/releases`;
export const ISSUES_URL = `https://github.com/${RELEASES_REPO}/issues`;

export type DownloadKey = "windows" | "macArm" | "macIntel" | "deb" | "appImage";

export type Download = { url: string; available: boolean; sizeMb: number | null };

export type LatestRelease = {
  version: string | null;
  publishedAt: string | null;
  downloads: Record<DownloadKey, Download>;
};

type GitHubAsset = { name: string; browser_download_url: string; size: number };

// File names come from artifactName in PAW's electron-builder.yml. Linux uses its own arch names
// (x86_64, amd64), so those two match on the extension alone.
const PATTERNS: Record<DownloadKey, RegExp> = {
  windows: /^PAW-Setup-.+\.exe$/,
  macArm: /^PAW-.+-arm64\.dmg$/,
  macIntel: /^PAW-.+-x64\.dmg$/,
  deb: /^PAW-.+\.deb$/,
  appImage: /^PAW-.+\.AppImage$/,
};

export function pickDownloads(assets: GitHubAsset[]): Record<DownloadKey, Download> {
  const pick = (re: RegExp): Download => {
    const a = assets.find((x) => re.test(x.name));
    return a
      ? { url: a.browser_download_url, available: true, sizeMb: Math.round(a.size / 1_000_000) }
      : { url: RELEASES_URL, available: false, sizeMb: null };
  };
  return {
    windows: pick(PATTERNS.windows),
    macArm: pick(PATTERNS.macArm),
    macIntel: pick(PATTERNS.macIntel),
    deb: pick(PATTERNS.deb),
    appImage: pick(PATTERNS.appImage),
  };
}

/** Cached for an hour: a new release needs no redeploy, and the API limit of 60 calls/hour is never near. */
export async function getLatestRelease(): Promise<LatestRelease> {
  "use cache";
  cacheLife("hours");
  try {
    const res = await fetch(`https://api.github.com/repos/${RELEASES_REPO}/releases/latest`, {
      headers: { accept: "application/vnd.github+json", "user-agent": "paw-landing" },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) throw new Error(`GitHub ${res.status}`);
    const r = (await res.json()) as { tag_name: string; published_at: string; assets: GitHubAsset[] };
    return { version: r.tag_name.replace(/^v/, ""), publishedAt: r.published_at, downloads: pickDownloads(r.assets) };
  } catch {
    // Every button then opens the Releases page, which still works.
    return { version: null, publishedAt: null, downloads: pickDownloads([]) };
  }
}

export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("vi-VN", { dateStyle: "short", timeZone: "Asia/Ho_Chi_Minh" }).format(new Date(iso));
}
