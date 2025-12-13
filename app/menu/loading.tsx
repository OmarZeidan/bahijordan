export default function MenuLoading() {
  return (
    <div className="relative min-h-screen bg-linear-to-br from-primary/5 via-accent/8 to-primary/10 dark:from-primary/10 dark:via-accent/5 dark:to-primary/8">
      {/* Layered gradient overlays for depth */}
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--accent)/0.12),transparent_50%)]" />
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_bottom_left,hsl(var(--primary)/0.08),transparent_50%)]" />

      {/* Premium subtle texture */}
      <div className="pointer-events-none fixed inset-0 opacity-30 mix-blend-soft-light dark:opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, hsl(var(--foreground)/0.05) 1px, transparent 0)",
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      <div className="relative min-h-screen pt-(--header-h)">
        {/* Header skeleton */}
        <header className="relative border-b border-border/50 py-8">
          <div className="mx-auto max-w-5xl px-4 md:px-6">
            <div className="mb-2 h-3 w-20 mx-auto animate-pulse rounded bg-muted/50" />
            <div className="h-8 w-32 mx-auto animate-pulse rounded bg-muted/50" />
          </div>
        </header>

        {/* Tabs skeleton */}
        <div className="sticky top-(--header-h) z-10 border-b border-border/50 bg-background/95 backdrop-blur">
          <div className="mx-auto max-w-5xl px-4 md:px-6">
            <div className="flex h-12 items-center justify-start gap-6 md:justify-center">
              {[1, 2, 3, 4, 5].map((tab) => (
                <div key={tab} className="h-5 w-20 animate-pulse rounded bg-muted/50" />
              ))}
            </div>
          </div>
        </div>

        {/* Content skeleton */}
        <main className="mx-auto w-full max-w-5xl px-4 py-8 md:px-6 md:py-12">
          <div className="rounded-lg border border-border/40 bg-background/90 p-6 backdrop-blur-sm md:p-8">
            <div className="divide-y divide-border/70">
              {[1, 2, 3, 4, 5].map((item) => (
                <div key={item} className="py-6 first:pt-0">
                  <div className="flex items-start justify-between gap-4">
                    {/* Left side */}
                    <div className="flex-1 space-y-3">
                      <div className="flex items-baseline gap-2">
                        <div className="h-5 w-40 animate-pulse rounded bg-muted/50" />
                        <div className="h-4 w-32 animate-pulse rounded bg-muted/40" />
                      </div>
                      <div className="space-y-2">
                        <div className="h-3 w-full animate-pulse rounded bg-muted/40" />
                        <div className="h-3 w-3/4 animate-pulse rounded bg-muted/40" />
                      </div>
                    </div>
                    {/* Right side - price */}
                    <div className="h-5 w-16 animate-pulse rounded bg-muted/50" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
