"use client";

import { Popover } from "@base-ui/react/popover";
import { Search } from "lucide-react";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";

import { useSound } from "@/components/sound/sound-provider";
import { EMOJI_GROUPS, searchEmojis } from "@/lib/emoji-data";

const COLUMNS = 8;

interface EmojiPickerProps {
  value: string;
  onSelect: (emoji: string) => void;
}

export function EmojiPicker({ value, onSelect }: EmojiPickerProps) {
  const { play } = useSound();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);

  const searchRef = useRef<HTMLInputElement>(null);
  const buttonsRef = useRef<(HTMLButtonElement | null)[]>([]);

  const sections = useMemo(() => {
    if (query.trim()) {
      return [{ id: "results", label: "Results", items: searchEmojis(query) }];
    }
    return EMOJI_GROUPS;
  }, [query]);

  const flat = useMemo(() => sections.flatMap((s) => s.items), [sections]);

  function handleQueryChange(value: string) {
    setQuery(value);
    // Reset roving focus when the filtered set changes.
    setActive(0);
  }

  // Focus the search field when the popover opens.
  useEffect(() => {
    if (!open) return;
    const id = requestAnimationFrame(() => searchRef.current?.focus());
    return () => cancelAnimationFrame(id);
  }, [open]);

  function focusButton(index: number) {
    const clamped = Math.max(0, Math.min(index, flat.length - 1));
    setActive(clamped);
    buttonsRef.current[clamped]?.focus();
  }

  function select(emoji: string) {
    play("click");
    onSelect(emoji);
    setQuery("");
    setOpen(false);
  }

  function handleGridKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    switch (event.key) {
      case "ArrowRight":
        event.preventDefault();
        focusButton(active + 1);
        break;
      case "ArrowLeft":
        event.preventDefault();
        focusButton(active - 1);
        break;
      case "ArrowDown":
        event.preventDefault();
        focusButton(active + COLUMNS);
        break;
      case "ArrowUp":
        event.preventDefault();
        if (active < COLUMNS) {
          searchRef.current?.focus();
        } else {
          focusButton(active - COLUMNS);
        }
        break;
      case "Home":
        event.preventDefault();
        focusButton(0);
        break;
      case "End":
        event.preventDefault();
        focusButton(flat.length - 1);
        break;
      case "Enter":
      case " ":
        event.preventDefault();
        if (flat[active]) select(flat[active].char);
        break;
    }
  }

  function handleSearchKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      focusButton(0);
    } else if (event.key === "Enter") {
      event.preventDefault();
      if (flat[0]) select(flat[0].char);
    }
  }

  let cursor = -1;

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger
        aria-label={`Selected emoji: ${value}. Choose another`}
        onMouseEnter={() => play("hover")}
        className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl border border-border bg-background text-2xl leading-none transition-[transform,border-color,box-shadow] duration-200 ease-[var(--ease-spring)] hover:-translate-y-0.5 hover:border-primary/60 aria-expanded:border-primary aria-expanded:shadow-elevated"
      >
        <span aria-hidden="true">{value}</span>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Positioner side="top" align="start" sideOffset={10} className="z-[80]">
          <Popover.Popup className="w-[19.5rem] origin-[var(--transform-origin)] overflow-hidden rounded-2xl border border-border bg-popover text-popover-foreground shadow-elevated transition-[transform,opacity] duration-200 ease-[var(--ease-out)] data-[starting-style]:scale-95 data-[starting-style]:opacity-0 data-[ending-style]:scale-95 data-[ending-style]:opacity-0">
            <div className="border-b border-border p-2">
              <div className="relative">
                <Search
                  className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground"
                  aria-hidden="true"
                />
                <input
                  ref={searchRef}
                  type="text"
                  value={query}
                  onChange={(e) => handleQueryChange(e.target.value)}
                  onKeyDown={handleSearchKeyDown}
                  placeholder="Search emoji"
                  aria-label="Search emoji"
                  className="h-9 w-full rounded-lg bg-muted pr-2 pl-8 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none"
                />
              </div>
            </div>

            <div
              role="grid"
              aria-label="Emoji"
              onKeyDown={handleGridKeyDown}
              className="max-h-[15rem] overflow-y-auto overscroll-contain p-2 [scrollbar-width:thin]"
            >
              {flat.length === 0 ? (
                <p className="px-1 py-6 text-center text-sm text-muted-foreground">
                  No emoji found.
                </p>
              ) : (
                sections.map((section) =>
                  section.items.length === 0 ? null : (
                    <div key={section.id} className="mb-1">
                      <h3 className="text-overline sticky top-0 bg-popover px-1 py-1">
                        {section.label}
                      </h3>
                      <div className="grid grid-cols-8">
                        {section.items.map((item) => {
                          cursor += 1;
                          const index = cursor;
                          return (
                            <button
                              key={item.char}
                              ref={(el) => {
                                buttonsRef.current[index] = el;
                              }}
                              type="button"
                              tabIndex={index === active ? 0 : -1}
                              aria-label={item.name}
                              title={item.name}
                              onClick={() => select(item.char)}
                              onFocus={() => setActive(index)}
                              className="flex aspect-square items-center justify-center rounded-lg text-xl leading-none transition-transform duration-150 ease-[var(--ease-spring)] hover:scale-125 hover:bg-muted focus-visible:scale-125 focus-visible:bg-muted"
                            >
                              <span aria-hidden="true">{item.char}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )
                )
              )}
            </div>
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  );
}
