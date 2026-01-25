const stats = [
  { value: "50K+", label: "Active Users" },
  { value: "2M+", label: "Meals Planned" },
  { value: "500K+", label: "Workouts Completed" },
  { value: "4.9", label: "App Store Rating" },
];

const StatsSection = () => {
  return (
    <section className="bg-card py-16 md:py-24 border-y border-border/30">
      <div className="px-5 md:px-10">
        <div className="w-full max-w-[80rem] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-accent mb-2">
                  {stat.value}
                </div>
                <div className="text-muted-foreground text-sm md:text-base">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
