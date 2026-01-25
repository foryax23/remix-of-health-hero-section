import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Is Aero free to use?",
    answer: "Yes! Aero offers a generous free tier that includes personalized meal plans, workout routines, and basic AI coaching. Premium features are available for those who want more advanced capabilities.",
  },
  {
    question: "How does the AI personalization work?",
    answer: "Our AI analyzes your goals, dietary preferences, activity level, and lifestyle during onboarding. It then continuously learns from your feedback and progress to refine recommendations over time.",
  },
  {
    question: "Can I use Aero with dietary restrictions?",
    answer: "Absolutely! Aero supports a wide range of dietary needs including vegan, vegetarian, keto, paleo, gluten-free, dairy-free, and many more. You can also specify allergies and food preferences.",
  },
  {
    question: "Do I need special equipment for workouts?",
    answer: "Not at all. Aero creates workouts based on what you have available. Whether you have a full gym, basic dumbbells, or just your bodyweight, we'll craft effective routines for you.",
  },
  {
    question: "How do I cancel my subscription?",
    answer: "You can cancel anytime directly from your account settings. There are no hidden fees or long-term commitments. Your access continues until the end of your billing period.",
  },
  {
    question: "Is my data secure?",
    answer: "Yes, security is our priority. All data is encrypted in transit and at rest. We never sell your personal information and follow strict privacy practices. You can delete your data at any time.",
  },
];

const FAQ = () => {
  return (
    <section className="bg-card py-20 md:py-32">
      <div className="px-5 md:px-10">
        <div className="w-full max-w-[48rem] mx-auto">
          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-[32px] sm:text-[40px] md:text-[48px] font-semibold leading-tight text-foreground mb-5">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground text-base md:text-xl">
              Everything you need to know about Aero.
            </p>
          </div>

          {/* Accordion */}
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-border/50 rounded-2xl px-6 overflow-hidden"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.02)",
                }}
              >
                <AccordionTrigger className="text-left text-foreground hover:no-underline py-6 text-base md:text-lg font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
