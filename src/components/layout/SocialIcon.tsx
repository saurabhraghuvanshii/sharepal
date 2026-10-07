export interface SocialIconProps {
  network: "Facebook" | "Instagram" | "LinkedIn";
  className?: string;
}

/** Simple monochrome social glyphs (lucide 1.x ships no brand icons). */
export function SocialIcon({ network, className }: SocialIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      {network === "Facebook" && (
        <path d="M4 2h16a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2h-4.5v-7h2.4l.4-2.8h-2.8V10.4c0-.8.3-1.4 1.4-1.4h1.5V6.5a19 19 0 0 0-2.2-.1c-2.2 0-3.6 1.3-3.6 3.7v2.1H10.2V15h2.4v7H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z" />
      )}
      {network === "Instagram" && (
        <path
          fillRule="evenodd"
          d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2.2A2.8 2.8 0 0 0 4.2 7v10A2.8 2.8 0 0 0 7 19.8h10a2.8 2.8 0 0 0 2.8-2.8V7A2.8 2.8 0 0 0 17 4.2H7Zm5 3.3a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9Zm0 2.2a2.3 2.3 0 1 0 0 4.6 2.3 2.3 0 0 0 0-4.6ZM17.2 5.6a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4Z"
        />
      )}
      {network === "LinkedIn" && (
        <path d="M4 2h16a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm1.8 7.6V18h2.8V9.6H5.8Zm1.4-4.2a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2Zm3.4 4.2V18h2.8v-4.4c0-1.2.4-2 1.5-2s1.4.9 1.4 2V18h2.8v-4.9c0-2.4-1.1-3.7-3.1-3.7-1.3 0-2.1.6-2.6 1.3V9.6h-2.8Z" />
      )}
    </svg>
  );
}
