export function TerminalSkeleton() {
  return (
    <div className="w-full min-h-[400px] bg-bg-secondary/80 rounded-lg border border-holo-cyan/20 p-6">
      {/* Terminal header */}
      <div className="flex items-center gap-2 mb-6">
        <div className="w-3 h-3 rounded-full bg-red-500/50 animate-pulse" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/50 animate-pulse delay-75" />
        <div className="w-3 h-3 rounded-full bg-green-500/50 animate-pulse delay-150" />
      </div>
      
      {/* Terminal content with typing effect */}
      <div className="space-y-4 font-mono text-sm">
        {/* Simulated terminal lines */}
        <div className="flex items-center gap-2">
          <span className="text-terminal-green">$</span>
          <div className="h-4 w-32 bg-terminal-green/20 rounded animate-pulse" />
          <div className="w-2 h-4 bg-terminal-green animate-blink" />
        </div>
        
        <div className="h-4 w-48 bg-text-secondary/20 rounded animate-pulse delay-200" />
        <div className="h-4 w-64 bg-text-secondary/20 rounded animate-pulse delay-300" />
        <div className="h-4 w-40 bg-text-secondary/20 rounded animate-pulse delay-400" />
        
        <div className="flex items-center gap-2 mt-6">
          <span className="text-terminal-green">$</span>
          <div className="w-2 h-4 bg-terminal-green animate-blink" />
        </div>
      </div>
    </div>
  );
}
