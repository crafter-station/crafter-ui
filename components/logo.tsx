import { cn } from "@/registry/default/lib/utils";

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <svg
      className={cn("w-8 h-8", className)}
      width="24"
      height="24"
      viewBox="0 0 106 106"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_184_2)">
        <circle
          className="dark:hidden"
          cx="53"
          cy="53"
          r="40.9545"
          fill="url(#paint0_linear_184_1)"
        />
        <circle
          className="hidden dark:block"
          cx="53" cy="53" r="40.9545" fill="url(#paint1_linear_184_2)" />
        <mask
          id="mask0_184_2"
          style={{ maskType: "alpha" }}
          maskUnits="userSpaceOnUse"
          x="4"
          y="32"
          width="99"
          height="42"
        >
          <path
            d="M103 53V49H95V53H103ZM9.97028 55.6791C19.8103 44.7694 29.0378 40 37.6667 40C46.2955 40 55.523 44.7694 65.3631 55.6791L71.3036 50.3209C60.6992 38.5639 49.4822 32 37.6667 32C25.8511 32 14.6341 38.5639 4.02972 50.3209L9.97028 55.6791ZM65.3631 55.6791C70.5603 61.4412 75.2355 65.909 79.3724 68.9667C83.3797 71.9286 87.4497 74 91.3333 74C93.4014 74 95.3675 73.4089 97.0651 72.1542C98.7164 70.9336 99.8925 69.2507 100.73 67.3944C102.36 63.7783 103 58.8425 103 53H95C95 58.4908 94.3617 62.055 93.437 64.1056C92.9964 65.0826 92.5752 65.5247 92.3099 65.7208C92.0909 65.8827 91.8208 66 91.3333 66C90.1059 66 87.787 65.2381 84.1276 62.5333C80.5978 59.9243 76.3286 55.8921 71.3036 50.3209L65.3631 55.6791Z"
            fill="#FFD700"
          />
        </mask>
        <g mask="url(#mask0_184_2)">
          <circle className="fill-background" cx="53" cy="53" r="40.9545" />
        </g>
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_184_1"
          x1="53"
          y1="12.0454"
          x2="53"
          y2="93.9545"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FCD402" />
          <stop offset="1" stopColor="#C7AF2B" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_184_2"
          x1="53"
          y1="12.0454"
          x2="53"
          y2="93.9545"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFD701" />
          <stop offset="1" stopColor="#9D8A26" />
        </linearGradient>
        <clipPath id="clip0_184_2">
          <rect width="106" height="106" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
} 