import { createFileRoute } from "@tanstack/react-router";
import { Send } from "lucide-react";
import type { ReactNode } from "react";

const WHATSAPP_URL = "https://chat.whatsapp.com/DURQBCidaDn82cnpkRY8g0";
const TELEGRAM_URL = "https://t.me/+e10G7CD4bawxYjQ0";

const TITLE = "GlobalFX Desk — Join the communities";
const DESCRIPTION =
  "The GlobalFX desk on WhatsApp and Telegram. Pick a channel and join — free, no spam.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2Zm5.8 14.03c-.24.68-1.4 1.3-1.93 1.35-.53.05-1.02.24-3.46-.72-2.94-1.16-4.77-4.2-4.91-4.4-.14-.2-1.16-1.55-1.16-2.95 0-1.4.73-2.09 1-2.38.26-.29.58-.36.77-.36.19 0 .39 0 .56.01.18.01.42-.07.65.5.24.58.82 2 .89 2.14.07.15.12.32.02.51-.1.19-.15.31-.29.48-.15.17-.31.38-.44.51-.15.14-.3.3-.13.59.17.29.75 1.24 1.61 2.01 1.1.98 2.03 1.29 2.32 1.43.29.15.46.12.63-.07.17-.19.73-.85.93-1.14.19-.29.39-.24.65-.14.27.09 1.69.79 1.98.94.29.14.48.22.55.34.07.13.07.75-.17 1.43Z" />
    </svg>
  );
}

function ChannelButton({
  href,
  label,
  className,
  iconClassName,
  icon,
}: {
  href: string;
  label: string;
  className: string;
  iconClassName: string;
  icon: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex w-full items-center justify-center gap-3 rounded-2xl px-6 py-4 text-base font-semibold transition hover:brightness-110 ${className}`}
    >
      <span className={iconClassName}>{icon}</span>
      {label}
    </a>
  );
}

function Index() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-5 py-16">
      <div className="w-full max-w-sm">
        <div className="flex items-center justify-center gap-3">
          <span className="grid size-11 place-items-center rounded-xl border border-primary/40 bg-primary/10 font-mono text-sm font-bold text-primary">
            GF
          </span>
          <span className="leading-tight">
            <span className="block text-base font-semibold">GlobalFX</span>
            <span className="block text-xs text-muted-foreground">Trading Desk</span>
          </span>
        </div>

        <h1 className="mt-8 text-center text-2xl font-bold tracking-tight">
          Join the communities
        </h1>
        <p className="mt-3 text-center text-sm text-muted-foreground">
          Pick a channel — both are free and you can leave any time.
        </p>

        <div className="mt-8 flex flex-col gap-3">
          <ChannelButton
            href={WHATSAPP_URL}
            label="Join on WhatsApp"
            className="bg-whatsapp text-whatsapp-foreground"
            iconClassName="flex size-6 items-center justify-center"
            icon={<WhatsAppIcon className="size-6" />}
          />
          <ChannelButton
            href={TELEGRAM_URL}
            label="Join on Telegram"
            className="bg-telegram text-telegram-foreground"
            iconClassName="flex size-6 items-center justify-center"
            icon={<Send className="size-5" />}
          />
        </div>

        <p className="mt-10 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} GlobalFX Trading Desk
        </p>
      </div>
    </div>
  );
}