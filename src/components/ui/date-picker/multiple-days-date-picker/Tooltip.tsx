const Tooltip = ({
  content,
  children,
}: {
  content: string[];
  children: React.ReactNode;
}) => {
  return (
    <div className="group inline-block">
      {children}
      <div className="absolute left-0 top-full z-50 mb-2 hidden w-[245px] rounded-md bg-muted p-2 text-xs text-foreground shadow-lg group-hover:block">
        <div className="flex flex-wrap gap-1">
          {content.map((date, index) => (
            <span key={index} className="whitespace-nowrap">
              {date};
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export { Tooltip };
