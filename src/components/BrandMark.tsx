type BrandMarkProps = {
  className?: string;
};

/** Simple mark inspired by the card logo: excavator in a circle. */
export function BrandMark({ className }: BrandMarkProps) {
  return (
    <svg className={className} viewBox="0 0 48 48" aria-hidden="true" focusable="false">
      <circle cx="24" cy="24" r="22" fill="none" stroke="#4f5d38" strokeWidth="2" />
      <path
        d="M8 34c4-2 10-3 16-3s12 1 16 3"
        fill="none"
        stroke="#8a5a32"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path d="M18 28h12v4H18z" fill="#1c1814" />
      <path d="M22 20h6v8h-6z" fill="#1c1814" />
      <path d="M28 16h8l2 6h-6z" fill="#c4a35a" />
      <circle cx="16" cy="32" r="3" fill="#1c1814" />
      <circle cx="30" cy="32" r="3" fill="#1c1814" />
    </svg>
  );
}
