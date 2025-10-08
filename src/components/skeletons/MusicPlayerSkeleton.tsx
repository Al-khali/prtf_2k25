export function MusicPlayerSkeleton() {
  return (
    <div className="w-full min-h-[500px] bg-bg-secondary/80 rounded-lg border border-holo-purple/20 p-6">
      {/* Player header */}
      <div className="mb-6">
        <div className="h-8 w-48 bg-gradient-to-r from-holo-purple/20 to-holo-magenta/20 rounded animate-pulse" />
      </div>
      
      {/* Visualizer placeholder */}
      <div className="relative h-48 mb-6 bg-gradient-to-b from-holo-purple/10 to-transparent rounded-lg overflow-hidden">
        {/* Animated bars simulating visualizer */}
        <div className="flex items-end justify-center gap-1 h-full p-4">
          {Array.from({ length: 32 }).map((_, i) => (
            <div
              key={i}
              className="flex-1 bg-gradient-to-t from-holo-purple/40 to-holo-cyan/40 rounded-t animate-pulse"
              style={{
                height: `${Math.random() * 60 + 20}%`,
                animationDelay: `${i * 50}ms`,
                animationDuration: '1.5s',
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Track info */}
      <div className="space-y-3 mb-6">
        <div className="h-6 w-3/4 bg-text-primary/20 rounded animate-pulse" />
        <div className="h-4 w-1/2 bg-text-secondary/20 rounded animate-pulse delay-75" />
      </div>
      
      {/* Progress bar */}
      <div className="mb-6">
        <div className="h-2 w-full bg-bg-primary/50 rounded-full overflow-hidden">
          <div className="h-full w-1/3 bg-gradient-to-r from-holo-purple to-holo-cyan animate-pulse" />
        </div>
      </div>
      
      {/* Controls */}
      <div className="flex items-center justify-center gap-4">
        <div className="w-10 h-10 rounded-full bg-holo-purple/20 animate-pulse" />
        <div className="w-14 h-14 rounded-full bg-holo-purple/30 animate-pulse delay-75" />
        <div className="w-10 h-10 rounded-full bg-holo-purple/20 animate-pulse delay-150" />
      </div>
    </div>
  );
}
