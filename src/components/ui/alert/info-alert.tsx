import { Info } from 'lucide-react';

type InfoAlertProps = {
  content: React.ReactNode;
};

export function InfoAlert({ content }: InfoAlertProps) {
  return (
    <div className="mt-2 flex items-center gap-x-3 rounded-md bg-secondary p-3">
      <div>
        <Info className="size-6 text-secondary-foreground" strokeWidth={1.5} />
      </div>
      <div className="space-y-2 text-secondary-foreground font-lexend">
        {content}
      </div>
    </div>
  );
}
