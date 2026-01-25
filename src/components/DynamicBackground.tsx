export function DynamicBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Primary gradient orb - top right */}
      <div 
        className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-20 animate-float-slow"
        style={{
          background: 'radial-gradient(circle, hsl(var(--accent-cyan)) 0%, transparent 70%)',
        }}
      />
      
      {/* Secondary gradient orb - bottom left */}
      <div 
        className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full opacity-15 animate-float-slower"
        style={{
          background: 'radial-gradient(circle, hsl(var(--accent)) 0%, transparent 70%)',
        }}
      />
      
      {/* Subtle center glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-5"
        style={{
          background: 'radial-gradient(circle, hsl(var(--accent-cyan)) 0%, transparent 60%)',
        }}
      />
    </div>
  );
}
