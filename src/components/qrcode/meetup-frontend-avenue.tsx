"use client";

import Image from "next/image";
import { LinkedInIcon } from "@/components/icons";
import { useLanguage } from "@/components/i18n/language-provider";

interface Speaker {
  name: string;
  photo: string;
  linkedin: string;
}

const speakers: Speaker[] = [
  {
    name: "Marcos Lott",
    photo: "/lott-meetup.jpg",
    linkedin: "https://www.linkedin.com/in/lott/",
  },
  {
    name: "Victória Freitas",
    photo: "/vica-meetup.jpg",
    linkedin: "https://www.linkedin.com/in/victoriadefreitas/",
  },
];

function SpeakerCard({ speaker, buttonLabel }: { speaker: Speaker; buttonLabel: string }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="size-[72px] shrink-0 overflow-hidden rounded-full">
        <Image
          src={speaker.photo}
          alt={speaker.name}
          width={72}
          height={72}
          className="size-full object-cover"
        />
      </div>
      <span className="text-center text-sm font-medium text-card-foreground">
        {speaker.name}
      </span>
      <a
        href={speaker.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        <LinkedInIcon className="size-4" />
        {buttonLabel}
      </a>
    </div>
  );
}

export function MeetupFrontendAvenue() {
  const { t } = useLanguage();
  const strings = t.qrcode.meetupFrontendAvenue;

  return (
    <div className="flex flex-col items-center gap-4 pt-2">
      <p className="text-sm text-muted-foreground">
        {strings.connectPrompt}
      </p>
      <div className="grid w-full grid-cols-2 gap-6">
        {speakers.map((speaker) => (
          <SpeakerCard
            key={speaker.linkedin}
            speaker={speaker}
            buttonLabel={strings.connectButton}
          />
        ))}
      </div>
    </div>
  );
}
