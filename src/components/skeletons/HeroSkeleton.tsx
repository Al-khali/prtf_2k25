export function HeroSkeleton() {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-gradient-to-b from-bg-primary via-bg-secondary to-bg-primary">
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-holo-cyan/10 via-holo-purple/10 to-holo-magenta/10 animate-pulse" />
      
      {/* Content skeleton */}
      <div className="relative z-10 flex h-full items-center justify-center">
        <div className="space-y-8 text-center px-4">
          {/* Title skeleton */}
          <div className="h-16 w-96 max-w-full mx-auto bg-gradient-to-r from-holo-cyan/20 to-holo-purple/20 rounded-lg animate-pulse" />
          
          {/* Subtitle skeleton */}
          <div className="h-8 w-64 max-w-full mx-auto bg-gradient-to-r from-holo-purple/20 to-holo-magenta/20 rounded-lg animate-pulse delay-75" />
          
          {/* Description skeleton */}
          <div className="space-y-3 max-w-2xl mx-auto">
            <div className="h-4 w-full bg-text-secondary/20 rounded animate-pulse delay-150" />
            <div className="h-4 w-5/6 mx-auto bg-text-secondary/20 rounded animate-pulse delay-200" />
          </div>
        </div>
      </div>
    </div>
  );
}
