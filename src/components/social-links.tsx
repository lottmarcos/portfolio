"use client";

import { Mail } from "lucide-react";

import { GitHubIcon, InstagramIcon, LinkedInIcon } from "@/components/icons";
import { useSound } from "@/components/sound/sound-provider";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

interface SocialLinksProps {
  className?: string;
}

const links = [
  { href: siteConfig.socials.github, label: "GitHub", Icon: GitHubIcon, external: true },
  { href: siteConfig.socials.linkedin, label: "LinkedIn", Icon: LinkedInIcon, external: true },
  { href: siteConfig.socials.instagram, label: "Instagram", Icon: InstagramIcon, external: true },
  { href: siteConfig.socials.email, label: "Email", Icon: Mail, external: false },
] as const;

export function SocialLinks({ className }: SocialLinksProps) {
  const { play } = useSound();

  return (
    <ul className={cn("flex items-center gap-1.5", className)}>
      {links.map(({ href, label, Icon, external }) => (
        <li key={label}>
          <a
            href={href}
            aria-label={label}
            onMouseEnter={() => play("hover")}
            onClick={() => play("link")}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="group/social inline-flex size-10 items-center justify-center rounded-full text-muted-foreground transition-[color,background-color,transform] duration-200 ease-[var(--ease-out)] hover:-translate-y-0.5 hover:bg-muted hover:text-foreground focus-visible:bg-muted focus-visible:text-foreground"
          >
            <Icon className="size-[18px] transition-transform duration-200 ease-[var(--ease-spring)] group-hover/social:scale-110" />
          </a>
        </li>
      ))}
    </ul>
  );
}
