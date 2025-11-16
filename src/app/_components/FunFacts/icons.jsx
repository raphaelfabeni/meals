const baseProps = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 40 40",
  fill: "none",
};

function Tile({ children }) {
  return (
    <svg {...baseProps} role="img" aria-hidden="true">
      <rect
        x="2"
        y="2"
        width="36"
        height="36"
        rx="12"
        fill="currentColor"
        opacity="0.15"
      />
      {children}
    </svg>
  );
}

function ThinkIcon() {
  return (
    <Tile>
      <path
        d="M20 10c4 0 7 3 7 7 0 2.4-1.2 4.5-3.1 5.9-.6.4-.9 1.1-.9 1.8V27h-6v-2.3c0-.7-.3-1.4-.9-1.8A7 7 0 0 1 13 17c0-4 3-7 7-7Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M17 30h6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </Tile>
  );
}

function GearlessIcon() {
  return (
    <Tile>
      <rect
        x="11"
        y="11"
        width="18"
        height="18"
        rx="4"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M15 19h10m-10 4h6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </Tile>
  );
}

function SparkIcon() {
  return (
    <Tile>
      <path
        d="M20 9l2.4 7.2L30 17l-6.4 4.4L26.7 29 20 24.8 13.3 29l3.1-7.6L10 17l7.6-.8L20 9Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </Tile>
  );
}

function PrepIcon() {
  return (
    <Tile>
      <rect
        x="11"
        y="13"
        width="18"
        height="14"
        rx="4"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M14 18h12M14 22h7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </Tile>
  );
}

export const funFactIcons = {
  think: ThinkIcon,
  gearless: GearlessIcon,
  spark: SparkIcon,
  prep: PrepIcon,
};
