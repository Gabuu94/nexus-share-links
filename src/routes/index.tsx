import { createFileRoute } from "@tanstack/react-router";
import {
  BellRing,
  CalendarDays,
  CheckCircle2,
  LineChart,
  Send,
  ShieldCheck,
  Quote,
} from "lucide-react";

import portrait from "@/assets/trader-portrait.jpg";

const WHATSAPP_URL = "https://chat.whatsapp.com/DGJm5x2sKunIcGUrAuV12G";
const TELEGRAM_URL = "https://t.me/+e10G7CD4bawxYjQ0";

const TITLE = "GlobalFX Desk — Daily forex setups on WhatsApp & Telegram";
const DESCRIPTION =
  "Daily pre-London setups, live trade alerts and weekly debriefs — posted in real time. Join the GlobalFX desk on WhatsApp or Telegram, free.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

const ticker = [
  { pair: "EUR/USD", change: "+0.12%", up: true },
  { pair: "GBP/JPY", change: "-0.34%", up: false },
  { pair: "XAU/USD", change: "+0.58%", up: true },
  { pair: "BTC/USD", change: "-1.20%", up: false },
  { pair: "US500", change: "+0.21%", up: true },
  { pair: "NAS100", change: "+0.44%", up: true },
  { pair: "USD/JPY", change: "-0.08%", up: false },
  { pair: "ETH/USD", change: "+2.03%", up: true },
];

const features = [
  {
    icon: CalendarDays,
    title: "Daily setups",
    body: "A pre-market breakdown of the pairs and levels I'm watching, posted before the London open — every trading day.",
  },
  {
    icon: BellRing,
    title: "Live trade alerts",
    body: "Entry, stop and target sent the moment I place the order — timestamped in the group, never edited after the fact.",
  },
  {
    icon: LineChart,
    title: "Weekly debrief",
    body: "A plain-language review of what worked, what didn't, and why — sent every Sunday before the new week opens.",
  },
];

const calls = [
  { pair: "EUR/USD", side: "Long", entry: "1.0862", result: "+38 pips", win: true },
  { pair: "XAU/USD", side: "Short", entry: "2,382.10", result: "+64 pips", win: true },
  { pair: "BTC/USD", side: "Long", entry: "61,240", result: "-1.2%", win: false },
  { pair: "GBP/JPY", side: "Long", entry: "198.40", result: "+22 pips", win: true },
  { pair: "NAS100", side: "Short", entry: "19,880", result: "-0.6%", win: false },
];

const testimonials = [
  {
    quote: "I stopped guessing and started following the log instead. Simple as that.",
    author: "Priya M.",
    since: "member since 2023",
  },
  {
    quote: "The losses are posted too. That's the part that actually earned my trust.",
    author: "Daniel K.",
    since: "member since 2024",
  },
];

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2Zm5.8 14.03c-.24.68-1.4 1.3-1.93 1.35-.53.05-1.02.24-3.46-.72-2.94-1.16-4.77-4.2-4.91-4.4-.14-.2-1.16-1.55-1.16-2.95 0-1.4.73-2.09 1-2.38.26-.29.58-.36.77-.36.19 0 .39 0 .56.01.18.01.42-.07.65.5.24.58.82 2 .89 2.14.07.15.12.32.02.51-.1.19-.15.31-.29.48-.15.17-.31.38-.44.51-.15.14-.3.3-.13.59.17.29.75 1.24 1.61 2.01 1.1.98 2.03 1.29 2.32 1.43.29.15.46.12.63-.07.17-.19.73-.85.93-1.14.19-.29.39-.24.65-.14.27.09 1.69.79 1.98.94.29.14.48.22.55.34.07.13.07.75-.17 1.43Z" />
    </svg>
  );
}

function JoinButtons({ size = "lg" }: { size?: "lg" | "sm" }) {
  const pad = size === "lg" ? "px-7 py-4 text-base" : "px-5 py-2.5 text-sm";
  return (
    <div className="flex flex-wrap items-center gap-3">
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-2.5 rounded-full bg-whatsapp font-semibold text-whatsapp-foreground transition hover:brightness-110 ${pad}`}
      >
        <WhatsAppIcon className="size-5" />
        Join on WhatsApp
      </a>
      <a
        href={TELEGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-2.5 rounded-full bg-telegram font-semibold text-telegram-foreground transition hover:brightness-110 ${pad}`}
      >
        <Send className="size-5" />
        Join on Telegram
      </a>
    </div>
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3">
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-lg border border-primary/40 bg-primary/10 font-mono text-sm font-bold text-primary">
              GF
            </span>
            <span className="leading-tight">
              <span className="block text-sm font-semibold">GlobalFX</span>
              <span className="block text-xs text-muted-foreground">Trading Desk</span>
            </span>
          </div>
          <p className="hidden items-center gap-2 font-mono text-xs text-muted-foreground md:flex">
            <span className="size-2 rounded-full bg-gain animate-pulse-dot" />
            Desk is live — next setup posts pre-London
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-border px-4 py-2 text-sm font-semibold transition hover:bg-accent"
          >
            Join free
          </a>
        </div>
      </header>

      <div className="overflow-hidden border-b border-border bg-surface py-2.5">
        <div className="flex w-max animate-ticker">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex shrink-0">
              {ticker.map((t) => (
                <span
                  key={`${dup}-${t.pair}`}
                  className="flex items-center gap-2 border-r border-border px-6 font-mono text-xs"
                >
                  <span className="text-muted-foreground">{t.pair}</span>
                  <span className={t.up ? "text-gain" : "text-loss"}>{t.change}</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <main>
        {/* Hero */}
        <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 md:grid-cols-2 md:py-24">
          <div className="relative mx-auto w-fit md:order-1">
            <img
              src={portrait}
              alt="GlobalFX — independent forex trader at the desk"
              width={816}
              height={816}
              className="size-64 rounded-full border-2 border-primary/50 object-cover glow-gold sm:size-80"
            />
            <span className="absolute -bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-primary/40 bg-card px-4 py-2 font-mono text-xs whitespace-nowrap">
              <CheckCircle2 className="size-3.5 text-primary" />
              7 yrs · verified log
            </span>
          </div>

          <div className="md:order-2">
            <p className="eyebrow">Live market desk</p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
              Every trade, logged.
              <br />
              Every signal, timestamped.
            </h1>
            <p className="mt-5 max-w-lg text-muted-foreground">
              I post daily setups, entries and exits the moment I take them — no delays, no
              cherry-picked screenshots. Join the desk on WhatsApp or Telegram and see the full log
              for yourself.
            </p>

            <dl className="mt-8 flex flex-wrap items-start gap-x-8 gap-y-4 divide-border">
              {[
                { v: "76%", l: "Win rate, 90d" },
                { v: "7", l: "Years trading" },
                { v: "14.2k", l: "Members" },
              ].map((s) => (
                <div key={s.l}>
                  <dt className="font-mono text-2xl font-bold text-primary">{s.v}</dt>
                  <dd className="mt-1 text-xs text-muted-foreground">{s.l}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-8">
              <JoinButtons />
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              Free to join · No spam · Leave anytime
            </p>
          </div>
        </section>

        {/* Features */}
        <section className="border-y border-border bg-surface">
          <div className="mx-auto max-w-6xl px-5 py-16 md:py-20">
            <p className="eyebrow">What's inside the desk</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Three things, done consistently
            </h2>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {features.map(({ icon: Icon, title, body }) => (
                <article
                  key={title}
                  className="rounded-2xl border border-border bg-card p-6 transition hover:border-primary/40"
                >
                  <span className="grid size-11 place-items-center rounded-xl border border-primary/30 bg-primary/10">
                    <Icon className="size-5 text-primary" />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Track record */}
        <section className="mx-auto max-w-6xl px-5 py-16 md:py-20">
          <p className="eyebrow">Track record</p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Recent calls from the log
          </h2>
          <p className="mt-3 max-w-xl text-sm text-muted-foreground">
            Wins and losses, both posted. This is a small sample — the full log is shared daily in
            the group.
          </p>

          <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-card">
            <table className="w-full text-left font-mono text-sm">
              <thead className="border-b border-border text-xs text-muted-foreground">
                <tr>
                  <th className="px-5 py-3 font-medium">Pair</th>
                  <th className="px-5 py-3 font-medium">Side</th>
                  <th className="px-5 py-3 font-medium">Entry</th>
                  <th className="px-5 py-3 text-right font-medium">Result</th>
                </tr>
              </thead>
              <tbody>
                {calls.map((c) => (
                  <tr key={c.pair} className="border-b border-border last:border-0">
                    <td className="px-5 py-4 font-semibold">{c.pair}</td>
                    <td className="px-5 py-4 text-muted-foreground">{c.side}</td>
                    <td className="px-5 py-4 text-muted-foreground">{c.entry}</td>
                    <td
                      className={`px-5 py-4 text-right font-semibold ${c.win ? "text-gain" : "text-loss"}`}
                    >
                      {c.result}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
            <ShieldCheck className="size-4 text-primary" />
            Past results are not a promise of future returns. Trade at your own risk.
          </p>
        </section>

        {/* Testimonials */}
        <section className="border-y border-border bg-surface">
          <div className="mx-auto max-w-6xl px-5 py-16 md:py-20">
            <p className="eyebrow">What members say</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Reads that come from members
            </h2>
            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {testimonials.map((t) => (
                <figure key={t.author} className="rounded-2xl border border-border bg-card p-6">
                  <Quote className="size-6 text-primary/70" />
                  <blockquote className="mt-4 text-lg leading-relaxed">"{t.quote}"</blockquote>
                  <figcaption className="mt-4 font-mono text-xs text-muted-foreground">
                    {t.author} — {t.since}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-4xl px-5 py-20 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            See tonight's setup before the London open
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Join the desk on WhatsApp or Telegram — it's free, and you can leave any time.
          </p>
          <div className="mt-8 flex justify-center">
            <JoinButtons />
          </div>
        </section>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 py-8 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} GlobalFX Trading Desk</p>
          <div className="flex gap-5">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
              WhatsApp
            </a>
            <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
              Telegram
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
