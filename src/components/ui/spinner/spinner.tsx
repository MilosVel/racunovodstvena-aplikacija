import { cn } from '@/utils/theme';

interface ISVGProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  className?: string;
  fullScreen?: boolean;
}

export function Spinner({
  size = 64,
  className,
  fullScreen = false,
}: ISVGProps) {
  if (fullScreen) {
    return (
      <div className="fixed bottom-0 left-0 right-0 top-0 z-50 flex items-center justify-center bg-background opacity-75">
        <svg
          width={size}
          height={size}
          stroke="hsl(var(--spinner))"
          strokeWidth={1}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M2,12A11.2,11.2,0,0,1,13,1.05C12.67,1,12.34,1,12,1a11,11,0,0,0,0,22c.34,0,.67,0,1-.05C6,23,2,17.74,2,12Z">
            <animateTransform
              attributeName="transform"
              type="rotate"
              dur="0.7s"
              values="0 12 12;360 12 12"
              repeatCount="indefinite"
            />
          </path>
        </svg>
      </div>
    );
  }

  return (
    <svg
      width={size}
      height={size}
      stroke="currentColor"
      strokeWidth={1}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('animate-spin text-foreground', className)}
    >
      <path d="M2,12A11.2,11.2,0,0,1,13,1.05C12.67,1,12.34,1,12,1a11,11,0,0,0,0,22c.34,0,.67,0,1-.05C6,23,2,17.74,2,12Z">
        <animateTransform
          attributeName="transform"
          type="rotate"
          dur="0.7s"
          values="0 12 12;360 12 12"
          repeatCount="indefinite"
        />
      </path>
    </svg>
  );
}
