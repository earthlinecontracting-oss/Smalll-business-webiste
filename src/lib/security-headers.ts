type CspOptions = {
  nonce: string;
  isDev: boolean;
};

/**
 * Content-Security-Policy for HTML responses.
 * Script tags use a per-request nonce. Hosts listed here are the only third parties
 * we load: Turnstile, Vercel Analytics, and Google Fonts. Maps and Turnstile iframes
 * are allowed via frame-src. 'unsafe-eval' is never included.
 */
export function contentSecurityPolicy({ nonce, isDev }: CspOptions): string {
  const scriptSrc = [
    "'self'",
    `'nonce-${nonce}'`,
    "https://challenges.cloudflare.com",
    "https://va.vercel-scripts.com",
  ].join(" ");

  const directives = [
    "default-src 'self'",
    `script-src ${scriptSrc}`,
    `script-src-elem ${scriptSrc}`,
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "img-src 'self' data: blob: https://challenges.cloudflare.com https://maps.gstatic.com https://maps.googleapis.com https://*.googleapis.com https://*.gstatic.com https://www.google.com https://maps.google.com",
    "font-src 'self' data: https://fonts.gstatic.com",
    "connect-src 'self' https://challenges.cloudflare.com https://va.vercel-scripts.com https://vitals.vercel-insights.com",
    "frame-src https://challenges.cloudflare.com https://maps.google.com https://www.google.com",
    "child-src https://challenges.cloudflare.com https://maps.google.com https://www.google.com",
    "worker-src 'self' blob: https://challenges.cloudflare.com",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "manifest-src 'self'",
    ...(isDev ? [] : ["upgrade-insecure-requests"]),
  ];

  return directives.join("; ");
}

export function securityHeadersForRequest(input: {
  nonce: string;
  isDev: boolean;
  isLocalHost: boolean;
}): { key: string; value: string }[] {
  const headers = [
    { key: "Content-Security-Policy", value: contentSecurityPolicy(input) },
    { key: "X-Content-Type-Options", value: "nosniff" },
    { key: "X-Frame-Options", value: "DENY" },
    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    {
      key: "Permissions-Policy",
      value: "camera=(), microphone=(), geolocation=()",
    },
  ];

  if (!input.isLocalHost) {
    headers.push({
      key: "Strict-Transport-Security",
      value: "max-age=63072000; includeSubDomains; preload",
    });
  }

  return headers;
}
