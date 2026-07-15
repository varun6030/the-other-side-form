// Reaction lines fired when the guest commits an answer.
// Rotated randomly. Add your own — the show's voice lives here.

export const REACTION_TOASTS: string[] = [
  "Interesting… we'll remember that.",
  "You just gave us content.",
  "Your lawyer would like a word.",
  "Noted. Filed. Never forgotten.",
  "The editors just high-fived.",
  "This one's going on the big screen.",
  "Bold of you to write that down.",
  "Evidence logged. No takebacks.",
  "Somewhere, your mother sneezed.",
  "The host is going to LOVE this.",
  "That answer has a jail term.",
  "Saved. Backed up. Twice.",
  "We definitely won't judge. Probably.",
  "Your Other Side is showing.",
  "Chat will absolutely judge this.",
];

export const LOADING_SCREENS: { label: string; lines: string[] }[] = [
  {
    label: "SYSTEM SCAN",
    lines: [
      "Analyzing delusion level…",
      "Scanning red flags…",
      "Checking main character energy…",
      "Locating childhood trauma…",
      "Complete.",
    ],
  },
  {
    label: "BACKGROUND CHECK",
    lines: [
      "Contacting your relatives…",
      "Reading archived chats…",
      "Cross-checking your LinkedIn with reality…",
      "Discrepancies found: many.",
      "Complete.",
    ],
  },
  {
    label: "FINANCIAL AUDIT",
    lines: [
      "Opening your UPI history…",
      "Counting 2 AM orders…",
      "Calculating money stuck with friends…",
      "Recommending therapy…",
      "Complete.",
    ],
  },
];
