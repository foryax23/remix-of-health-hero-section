import { Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "Marketing Manager",
    avatar: "",
    initials: "SM",
    quote: "Aero completely changed how I approach fitness. The AI coach understands my busy schedule and creates plans that actually fit my life.",
    result: "Lost 20 lbs in 4 months",
    rating: 5,
  },
  {
    name: "James Chen",
    role: "Software Engineer",
    avatar: "",
    initials: "JC",
    quote: "The meal planning feature is incredible. It knows what's in my pantry and suggests recipes I actually want to eat. Game changer!",
    result: "Gained 12 lbs muscle",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Nurse",
    avatar: "",
    initials: "ER",
    quote: "Working night shifts made it impossible to stick to a routine. Aero adapts to my crazy schedule and I've never felt healthier.",
    result: "Improved energy & sleep",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="bg-background py-20 md:py-32">
      <div className="px-5 md:px-10">
        <div className="w-full max-w-[80rem] mx-auto">
          {/* Header */}
          <div className="max-w-[42rem] mx-auto text-center mb-12 md:mb-16">
            <h2 className="text-[32px] sm:text-[40px] md:text-[48px] font-semibold leading-tight text-foreground mb-5">
              Real Results from Real People
            </h2>
            <p className="text-muted-foreground text-base md:text-xl">
              Join thousands who have transformed their health with Aero.
            </p>
          </div>

          {/* Testimonial Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="p-8 rounded-3xl border border-border/50 flex flex-col"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.03)",
                  backdropFilter: "blur(20px)",
                }}
              >
                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-foreground leading-relaxed mb-6 flex-grow">
                  "{testimonial.quote}"
                </blockquote>

                {/* Result Badge */}
                <div className="inline-flex self-start px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6">
                  {testimonial.result}
                </div>

                {/* Author */}
                <div className="flex items-center gap-4 pt-6 border-t border-border/30">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={testimonial.avatar} />
                    <AvatarFallback className="bg-secondary text-foreground">
                      {testimonial.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
