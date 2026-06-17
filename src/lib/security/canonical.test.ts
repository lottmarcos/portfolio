import { afterEach, describe, expect, it, vi } from "vitest";

import {
  buildCanonicalRedirectUrl,
  getRedirectHosts,
  resolveCanonicalRedirect,
} from "./canonical";

const ORIGINAL_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;
const ORIGINAL_REDIRECT_HOSTS = process.env.REDIRECT_HOSTS;

afterEach(() => {
  if (ORIGINAL_SITE_URL === undefined) {
    delete process.env.NEXT_PUBLIC_SITE_URL;
  } else {
    process.env.NEXT_PUBLIC_SITE_URL = ORIGINAL_SITE_URL;
  }

  if (ORIGINAL_REDIRECT_HOSTS === undefined) {
    delete process.env.REDIRECT_HOSTS;
  } else {
    process.env.REDIRECT_HOSTS = ORIGINAL_REDIRECT_HOSTS;
  }
});

describe("getRedirectHosts", () => {
  it("excludes the canonical host from defaults", () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://www.lott.dev.br";
    expect(getRedirectHosts()).toEqual([
      "lott.dev",
      "lott.dev.br",
      "marcoslott.dev",
      "www.marcoslott.dev",
    ]);
  });

  it("honors REDIRECT_HOSTS overrides", () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://lott.dev";
    process.env.REDIRECT_HOSTS = "lott.dev.br, www.lott.dev.br";
    expect(getRedirectHosts()).toEqual(["lott.dev.br", "www.lott.dev.br"]);
  });
});

describe("resolveCanonicalRedirect", () => {
  it("redirects HTTP requests to HTTPS canonical origin", () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://www.lott.dev.br";

    const result = resolveCanonicalRedirect(
      "lott.dev.br",
      "http",
      "/about",
      "?lang=pt"
    );

    expect(result).toEqual({
      kind: "https",
      target: new URL("https://www.lott.dev.br/about?lang=pt"),
    });
  });

  it("redirects alternate hosts to the canonical origin", () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://www.lott.dev.br";

    const result = resolveCanonicalRedirect(
      "lott.dev.br",
      "https",
      "/about",
      ""
    );

    expect(result).toEqual({
      kind: "canonical",
      target: new URL("https://www.lott.dev.br/about"),
    });
  });

  it("keeps canonical host requests untouched", () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://www.lott.dev.br";

    const result = resolveCanonicalRedirect(
      "www.lott.dev.br",
      "https",
      "/about",
      ""
    );

    expect(result).toBeNull();
  });

  it("skips redirects for localhost", () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://www.lott.dev.br";

    expect(
      resolveCanonicalRedirect("localhost", "http", "/", "")
    ).toBeNull();
  });

  it("skips redirects in development", () => {
    vi.stubEnv("NODE_ENV", "development");
    process.env.NEXT_PUBLIC_SITE_URL = "https://www.lott.dev.br";

    expect(
      resolveCanonicalRedirect("lott.dev.br", "http", "/about", "")
    ).toBeNull();

    vi.unstubAllEnvs();
  });
});

describe("buildCanonicalRedirectUrl", () => {
  it("preserves path and query when switching origins", () => {
    const target = buildCanonicalRedirectUrl(
      new URL("https://lott.dev.br/projects?tag=ai"),
      "https://www.lott.dev.br"
    );

    expect(target.toString()).toBe(
      "https://www.lott.dev.br/projects?tag=ai"
    );
  });
});
