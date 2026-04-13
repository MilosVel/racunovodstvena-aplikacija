import { cva } from 'class-variance-authority';

export const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
        outlineRed: 'text-destructive border-destructive',
        outlineGreen: 'text-success border-success',
        outlineWarning: 'text-warning border-warning',
        outlineInfo: 'text-ring border-ring',
        grayInfo: 'text-gray-500  border-gray-500',
        blueInfo: 'text-blue-500  border-blue-500',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);
