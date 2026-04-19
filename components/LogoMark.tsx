type Props = {
  size?: number;
  className?: string;
};

/**
 * Logo mark — two stacked waves on an ink rounded square.
 * - Top wave: white @ 28% opacity (the subtle echo)
 * - Bottom wave: hot-red #FF3D2E (the brand accent, bolder stroke)
 *
 * Monochrome-dominant ink with one accent color — matches the site's
 * light+bold design system. The "flow" idea from the name is preserved.
 */
export default function LogoMark({ size = 32, className }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect width="40" height="40" rx="10" fill="#1B1B1F" />
      <path
        d="M7 15 Q13 9, 20 15 T33 15"
        stroke="#FFFFFF"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity="0.3"
      />
      <path
        d="M7 25 Q13 19, 20 25 T33 25"
        stroke="#FF3D2E"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
