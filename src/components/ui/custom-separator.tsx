import { cn } from "@/lib/utils";

// Shadcn horizontal separator didn't work

type VerticalSeparatorProps = React.HTMLAttributes<HTMLDivElement>;

const VerticalSeparator = ({ className, ...props }: VerticalSeparatorProps) => {
  return (
    <div
      className={cn("w-[1.5px] h-6 bg-gray-300 shrink-0", className)}
      {...props}
    />
  );
};

export default VerticalSeparator;
