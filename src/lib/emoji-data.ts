/**
 * Curated emoji set for the visitor-tags picker (~150 emojis). Kept in-repo so
 * the picker has zero heavy dependencies and loads lazily. Each entry carries a
 * name + keywords for search.
 */
export interface EmojiEntry {
  char: string;
  name: string;
  keywords: string;
}

export interface EmojiGroup {
  id: string;
  label: string;
  items: EmojiEntry[];
}

export const DEFAULT_EMOJI = "💚";

export const EMOJI_GROUPS: EmojiGroup[] = [
  {
    id: "smileys",
    label: "Smileys",
    items: [
      { char: "😀", name: "Grinning", keywords: "smile happy" },
      { char: "😄", name: "Grinning big eyes", keywords: "smile happy joy" },
      { char: "😁", name: "Beaming", keywords: "grin smile" },
      { char: "😂", name: "Tears of joy", keywords: "laugh lol cry" },
      { char: "🤣", name: "Rolling laughing", keywords: "rofl laugh" },
      { char: "😊", name: "Smiling", keywords: "blush happy" },
      { char: "🙂", name: "Slight smile", keywords: "smile" },
      { char: "😉", name: "Winking", keywords: "wink flirt" },
      { char: "😍", name: "Heart eyes", keywords: "love crush" },
      { char: "😘", name: "Blowing kiss", keywords: "kiss love" },
      { char: "😎", name: "Sunglasses", keywords: "cool sunglasses" },
      { char: "🤩", name: "Star struck", keywords: "wow star excited" },
      { char: "🥳", name: "Partying", keywords: "party celebrate" },
      { char: "🤔", name: "Thinking", keywords: "hmm consider" },
      { char: "😌", name: "Relieved", keywords: "calm content" },
      { char: "😴", name: "Sleeping", keywords: "sleep tired zzz" },
      { char: "🤯", name: "Mind blown", keywords: "shock wow explode" },
      { char: "🥹", name: "Holding back tears", keywords: "emotional proud" },
      { char: "😇", name: "Innocent", keywords: "angel halo" },
      { char: "🙃", name: "Upside down", keywords: "silly irony" },
    ],
  },
  {
    id: "gestures",
    label: "People",
    items: [
      { char: "👋", name: "Waving hand", keywords: "wave hello hi bye" },
      { char: "🤚", name: "Raised back of hand", keywords: "hand stop" },
      { char: "👍", name: "Thumbs up", keywords: "like yes good approve" },
      { char: "👎", name: "Thumbs down", keywords: "dislike no bad" },
      { char: "👏", name: "Clapping", keywords: "applause clap bravo" },
      { char: "🙌", name: "Raising hands", keywords: "celebrate hooray" },
      { char: "🙏", name: "Folded hands", keywords: "thanks please pray" },
      { char: "🤝", name: "Handshake", keywords: "deal agree" },
      { char: "💪", name: "Flexed biceps", keywords: "strong muscle" },
      { char: "✌️", name: "Victory", keywords: "peace victory" },
      { char: "🤙", name: "Call me", keywords: "shaka hang loose" },
      { char: "🫶", name: "Heart hands", keywords: "love heart" },
      { char: "🤗", name: "Hugging", keywords: "hug embrace" },
      { char: "🧠", name: "Brain", keywords: "smart think mind" },
      { char: "👀", name: "Eyes", keywords: "look watch" },
      { char: "🫡", name: "Saluting", keywords: "salute respect yes" },
    ],
  },
  {
    id: "nature",
    label: "Animals & Nature",
    items: [
      { char: "🐶", name: "Dog", keywords: "dog puppy pet" },
      { char: "🐱", name: "Cat", keywords: "cat kitten pet" },
      { char: "🦊", name: "Fox", keywords: "fox" },
      { char: "🐼", name: "Panda", keywords: "panda bear" },
      { char: "🐧", name: "Penguin", keywords: "penguin" },
      { char: "🦉", name: "Owl", keywords: "owl bird" },
      { char: "🦄", name: "Unicorn", keywords: "unicorn magic" },
      { char: "🐢", name: "Turtle", keywords: "turtle slow" },
      { char: "🐝", name: "Bee", keywords: "bee honey" },
      { char: "🦋", name: "Butterfly", keywords: "butterfly" },
      { char: "🌳", name: "Tree", keywords: "tree nature" },
      { char: "🌵", name: "Cactus", keywords: "cactus desert" },
      { char: "🌸", name: "Blossom", keywords: "flower spring" },
      { char: "🌊", name: "Wave", keywords: "ocean sea water surf" },
      { char: "🔥", name: "Fire", keywords: "fire hot lit flame" },
      { char: "⭐", name: "Star", keywords: "star favorite" },
      { char: "🌙", name: "Moon", keywords: "moon night" },
      { char: "☀️", name: "Sun", keywords: "sun sunny day" },
      { char: "🌈", name: "Rainbow", keywords: "rainbow pride" },
      { char: "❄️", name: "Snowflake", keywords: "snow cold winter" },
    ],
  },
  {
    id: "food",
    label: "Food & Drink",
    items: [
      { char: "🍎", name: "Apple", keywords: "apple fruit" },
      { char: "🍌", name: "Banana", keywords: "banana fruit" },
      { char: "🍕", name: "Pizza", keywords: "pizza food" },
      { char: "🍔", name: "Burger", keywords: "burger food" },
      { char: "🌮", name: "Taco", keywords: "taco mexican" },
      { char: "🍣", name: "Sushi", keywords: "sushi japanese" },
      { char: "🍜", name: "Ramen", keywords: "noodles ramen" },
      { char: "🍩", name: "Donut", keywords: "donut sweet" },
      { char: "🍦", name: "Ice cream", keywords: "ice cream dessert" },
      { char: "☕", name: "Coffee", keywords: "coffee tea hot" },
      { char: "🍺", name: "Beer", keywords: "beer drink" },
      { char: "🍷", name: "Wine", keywords: "wine drink" },
      { char: "🧉", name: "Mate", keywords: "mate drink" },
      { char: "🥑", name: "Avocado", keywords: "avocado" },
      { char: "🍫", name: "Chocolate", keywords: "chocolate sweet" },
      { char: "🎂", name: "Cake", keywords: "cake birthday" },
    ],
  },
  {
    id: "travel",
    label: "Travel & Places",
    items: [
      { char: "✈️", name: "Airplane", keywords: "plane travel flight" },
      { char: "🚀", name: "Rocket", keywords: "rocket launch space ship" },
      { char: "🚗", name: "Car", keywords: "car drive" },
      { char: "🚲", name: "Bicycle", keywords: "bike cycle" },
      { char: "🏝️", name: "Island", keywords: "island beach vacation" },
      { char: "🏔️", name: "Mountain", keywords: "mountain snow" },
      { char: "🗽", name: "Statue of Liberty", keywords: "liberty new york usa" },
      { char: "🌍", name: "Globe Europe Africa", keywords: "earth world globe" },
      { char: "🌎", name: "Globe Americas", keywords: "earth world globe americas" },
      { char: "🌏", name: "Globe Asia", keywords: "earth world globe asia" },
      { char: "🏙️", name: "Cityscape", keywords: "city skyline buildings" },
      { char: "🏠", name: "House", keywords: "house home" },
      { char: "🗺️", name: "Map", keywords: "map travel" },
      { char: "🧭", name: "Compass", keywords: "compass direction" },
      { char: "📍", name: "Pin", keywords: "location pin map place" },
      { char: "⛺", name: "Tent", keywords: "camping tent" },
    ],
  },
  {
    id: "activities",
    label: "Activities",
    items: [
      { char: "⚽", name: "Soccer", keywords: "soccer football" },
      { char: "🏀", name: "Basketball", keywords: "basketball" },
      { char: "🎾", name: "Tennis", keywords: "tennis" },
      { char: "🏄", name: "Surfing", keywords: "surf wave" },
      { char: "🎮", name: "Gaming", keywords: "game controller play" },
      { char: "🎧", name: "Headphones", keywords: "music audio listen" },
      { char: "🎸", name: "Guitar", keywords: "music guitar rock" },
      { char: "🎹", name: "Piano", keywords: "music piano keys" },
      { char: "🎨", name: "Art", keywords: "art paint palette design" },
      { char: "📷", name: "Camera", keywords: "camera photo" },
      { char: "🎬", name: "Clapper", keywords: "movie film" },
      { char: "🏆", name: "Trophy", keywords: "win trophy award" },
      { char: "🎯", name: "Target", keywords: "target goal dart" },
      { char: "♟️", name: "Chess", keywords: "chess strategy" },
      { char: "🧗", name: "Climbing", keywords: "climb sport" },
      { char: "🏃", name: "Running", keywords: "run jog sport" },
    ],
  },
  {
    id: "objects",
    label: "Objects",
    items: [
      { char: "💻", name: "Laptop", keywords: "laptop computer code work" },
      { char: "🖥️", name: "Desktop", keywords: "computer monitor" },
      { char: "⌨️", name: "Keyboard", keywords: "keyboard type code" },
      { char: "📱", name: "Phone", keywords: "phone mobile" },
      { char: "💡", name: "Bulb", keywords: "idea light bulb" },
      { char: "🔋", name: "Battery", keywords: "battery power energy" },
      { char: "🛠️", name: "Tools", keywords: "tools build fix" },
      { char: "🧩", name: "Puzzle", keywords: "puzzle piece solve" },
      { char: "📚", name: "Books", keywords: "books read learn" },
      { char: "✏️", name: "Pencil", keywords: "write pencil edit" },
      { char: "📈", name: "Chart up", keywords: "growth chart up" },
      { char: "🔑", name: "Key", keywords: "key access" },
      { char: "🕹️", name: "Joystick", keywords: "joystick game retro" },
      { char: "💾", name: "Floppy", keywords: "save disk retro" },
      { char: "🔭", name: "Telescope", keywords: "telescope space explore" },
      { char: "🧪", name: "Test tube", keywords: "science experiment lab" },
    ],
  },
  {
    id: "symbols",
    label: "Symbols",
    items: [
      { char: "❤️", name: "Red heart", keywords: "love heart" },
      { char: "🧡", name: "Orange heart", keywords: "heart" },
      { char: "💛", name: "Yellow heart", keywords: "heart" },
      { char: "💚", name: "Green heart", keywords: "heart" },
      { char: "💙", name: "Blue heart", keywords: "heart" },
      { char: "💜", name: "Purple heart", keywords: "heart" },
      { char: "🖤", name: "Black heart", keywords: "heart" },
      { char: "✨", name: "Sparkles", keywords: "sparkle shine magic" },
      { char: "💫", name: "Dizzy", keywords: "star sparkle" },
      { char: "⚡", name: "Bolt", keywords: "lightning fast energy" },
      { char: "💯", name: "Hundred", keywords: "100 perfect score" },
      { char: "✅", name: "Check", keywords: "done yes check ok" },
      { char: "🎉", name: "Party popper", keywords: "celebrate party tada" },
      { char: "🚩", name: "Flag", keywords: "flag mark" },
      { char: "♾️", name: "Infinity", keywords: "infinity endless" },
      { char: "☮️", name: "Peace", keywords: "peace" },
    ],
  },
];

/** Flattened searchable index. */
export const ALL_EMOJIS: EmojiEntry[] = EMOJI_GROUPS.flatMap((g) => g.items);

export function searchEmojis(query: string): EmojiEntry[] {
  const q = query.trim().toLowerCase();
  if (!q) return ALL_EMOJIS;
  return ALL_EMOJIS.filter(
    (e) => e.name.toLowerCase().includes(q) || e.keywords.includes(q)
  );
}
