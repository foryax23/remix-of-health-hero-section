import { UserPlus, ClipboardList, Sparkles } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: UserPlus,
    title: "Create Your Account",
    description: "Sign up in seconds. No credit card required to get started.",
  },
  {
    number: "02",
    icon: ClipboardList,
    title: "Complete Your Profile",
    description: "Tell us about your goals, preferences, and lifestyle in a quick onboarding quiz.",
  },
  {
    number: "03",
    icon: Sparkles,
    title: "Get Your Personalized Plan",
    description: "Receive AI-crafted meal plans, workouts, and coaching tailored just for you.",
  },
];

const HowItWorks = () => {
  return (
    <section className="bg-card py-20 md:py-32">
      <div className="px-5 md:px-10">
        <div className="w-full max-w-[80rem] mx-auto">
          {/* Header */}
          <div className="max-w-[42rem] mx-auto text-center mb-12 md:mb-20">
            <h2 className="text-[32px] sm:text-[40px] md:text-[48px] font-semibold leading-tight text-foreground mb-5">
              Start Your Transformation in 3 Steps
            </h2>
            <p className="text-muted-foreground text-base md:text-xl">
              Getting started is simple. Here's how Aero works for you.
            </p>
          </div>

          {/* Steps */}
          <div className="relative">
            {/* Connecting Line - Desktop */}
            <div className="hidden md:block absolute top-24 left-[16.67%] right-[16.67%] h-px bg-gradient-to-r from-accent/0 via-accent/50 to-accent/0" />

            <div className="grid md:grid-cols-3 gap-8 md:gap-12">
              {steps.map((step, index) => (
                <div key={index} className="relative flex flex-col items-center text-center">
                  {/* Step Number Circle */}
                  <div className="relative mb-8">
                    <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center border-2 border-accent/30">
                      <step.icon className="w-8 h-8 text-accent" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-sm font-bold">
                      {step.number.slice(-1)}
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed max-w-[280px]">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
