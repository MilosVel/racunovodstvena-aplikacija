"use client"

import { Toaster as Sonner } from 'sonner';

import { useThemeData } from '@/store';


type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme } = useThemeData();

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className="toaster group"
      {...props}
    />
  );
};

export { Toaster };
