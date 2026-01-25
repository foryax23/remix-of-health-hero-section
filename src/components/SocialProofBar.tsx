import { Star } from "lucide-react";

const SocialProofBar = () => {
  return (
    <section className="bg-background py-8 md:py-12 border-y border-border/30">
      <div className="px-5 md:px-10">
        <div className="w-full max-w-[80rem] mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
            {/* Users Count */}
            <div className="flex items-center gap-2">
              <span className="text-2xl md:text-3xl font-semibold text-foreground">50,000+</span>
              <span className="text-muted-foreground text-sm md:text-base">Active Users</span>
            </div>

            {/* Divider */}
            <div className="hidden md:block w-px h-8 bg-border/50" />

            {/* App Store Rating */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                ))}
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-semibold text-foreground">4.9</span>
                <span className="text-xs text-muted-foreground">App Store</span>
              </div>
            </div>

            {/* Divider */}
            <div className="hidden md:block w-px h-8 bg-border/50" />

            {/* Featured In */}
            <div className="flex items-center gap-4">
              <span className="text-xs text-muted-foreground uppercase tracking-wider">Featured in</span>
              <div className="flex items-center gap-4 text-muted-foreground/70">
                <span className="font-semibold text-sm">Forbes</span>
                <span className="font-semibold text-sm">TechCrunch</span>
                <span className="font-semibold text-sm hidden sm:inline">Wired</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProofBar;
