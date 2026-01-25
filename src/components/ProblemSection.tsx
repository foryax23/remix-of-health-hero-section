import { Brain, Clock, Target } from "lucide-react";

const problems = [
  {
    icon: Brain,
    title: "Overwhelmed by Information",
    description: "Conflicting nutrition advice and endless workout plans leave you confused and stuck.",
  },
  {
    icon: Clock,
    title: "No Time to Plan",
    description: "Between work and life, who has hours to plan meals and research workout routines?",
  },
  {
    icon: Target,
    title: "Generic Plans Don't Work",
    description: "One-size-fits-all approaches ignore your unique body, goals, and lifestyle.",
  },
];

const ProblemSection = () => {
  return (
    <section className="bg-background py-20 md:py-32">
      <div className="px-5 md:px-10">
        <div className="w-full max-w-[80rem] mx-auto">
          {/* Header */}
          <div className="max-w-[42rem] mx-auto text-center mb-12 md:mb-16">
            <h2 className="text-[32px] sm:text-[40px] md:text-[48px] font-semibold leading-tight text-foreground mb-5">
              Tired of Fitness Plans That Don't Fit Your Life?
            </h2>
            <p className="text-muted-foreground text-base md:text-xl">
              You're not alone. Most people struggle with the same challenges.
            </p>
          </div>

          {/* Problem Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {problems.map((problem, index) => (
              <div
                key={index}
                className="p-8 rounded-3xl border border-border/50 transition-all hover:border-border"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.03)",
                  backdropFilter: "blur(20px)",
                }}
              >
                <div className="w-14 h-14 rounded-2xl bg-destructive/10 flex items-center justify-center mb-6">
                  <problem.icon className="w-7 h-7 text-destructive" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {problem.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {problem.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
