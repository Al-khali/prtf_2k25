interface SectionSkeletonProps {
  height?: string;
  className?: string;
}

export function SectionSkeleton({ 
  height = 'h-96', 
  className = '' 
}: SectionSkeletonProps) {
  return (
    <div className={`${height} ${className} w-full bg-bg-secondary/50 rounded-lg overflow-hidden`}>
      <div className="h-full w-full bg-gradient-to-br from-holo-cyan/5 via-transparent to-holo-purple/5 animate-pulse" />
    </div>
  );
}
