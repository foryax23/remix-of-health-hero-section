import phoneScreen from "@/assets/phone-screen.png";
import sliderCard from "@/assets/slider-card.png";
import calendarCard from "@/assets/calendar-card.png";

const PHONE_FRAME_URL = "https://cdn.prod.website-files.com/64dcc8c57b43bbf105fd381f/68c0826fd3988ffc8592fcc1_93173bd40d2fe4c447493e87edc46b17_Group%2020685.avif";
const PHONE_BG_URL = "https://cdn.prod.website-files.com/64dcc8c57b43bbf105fd381f/68bc1a457e73b0da2a032a3c_phone%20bg.svg";

interface FeatureBlockProps {
  title: string;
  description: string;
  screenImage: string;
  reverse?: boolean;
  bgLight?: boolean;
}

const FeatureBlock = ({ title, description, screenImage, reverse, bgLight }: FeatureBlockProps) => {
  return (
    <div className={bgLight ? "bg-white text-[#222326]" : "bg-background text-foreground"}>
      <div className="px-5 md:px-10">
        <div className="w-full max-w-[80rem] mx-auto">
          <div className="relative min-h-screen py-10 md:py-20">
            <div className={`flex flex-col ${reverse ? "md:flex-row-reverse" : "md:flex-row"} items-center gap-8 md:gap-16 h-full`}>
              {/* Text Content */}
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-[32px] sm:text-[40px] md:text-[48px] font-semibold leading-tight mb-5">
                  {title}
                </h2>
                <p className={`text-base md:text-xl max-w-[52ch] ${bgLight ? "text-[#616265]" : "text-muted-foreground"}`}>
                  {description}
                </p>
              </div>

              {/* Phone Mockup */}
              <div className="flex-1 flex items-center justify-center relative">
                <div className="relative w-full max-w-[400px] md:max-w-[500px]">
                  <img
                    src={PHONE_FRAME_URL}
                    alt="Phone mockup"
                    className="w-full h-auto relative z-20"
                  />
                  <div
                    className="absolute overflow-hidden z-10"
                    style={{
                      left: '30.4%',
                      top: '1.4%',
                      width: '39%',
                      height: '75.8%',
                      borderRadius: '5%'
                    }}
                  >
                    <img
                      src={screenImage}
                      alt={title}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                </div>

                {/* Background glow - Desktop only */}
                {!bgLight && (
                  <img
                    src={PHONE_BG_URL}
                    alt=""
                    className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50rem] h-[1000px] max-w-none -z-10 pointer-events-none opacity-70"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FeaturesSection = () => {
  return (
    <div className="font-medium overflow-clip">
      {/* Feature 1: Smarter Recovery */}
      <FeatureBlock
        title="Smarter Recovery"
        description="Know when to push, when to pause, and when you're ready to perform, backed by real-time metrics and biomarkers."
        screenImage={phoneScreen}
        bgLight
      />

      {/* Feature 2: Smart Meal Planning */}
      <FeatureBlock
        title="Nutrition That Adapts to You"
        description="Get personalized meal plans based on your goals, dietary preferences, and what's already in your pantry. Never wonder what to eat again."
        screenImage={sliderCard}
        reverse
      />

      {/* Feature 3: Dynamic Workouts */}
      <FeatureBlock
        title="Workouts That Evolve With You"
        description="From HIIT to yoga, get routines that adapt to your fitness level, available equipment, and the time you have. Every session is optimized for results."
        screenImage={calendarCard}
        bgLight
      />

      {/* Feature 4: AI Coach */}
      <FeatureBlock
        title="Your 24/7 Health Advisor"
        description="Ask anything about nutrition, fitness, or recovery. Get instant, science-backed answers from your personal AI coach whenever you need guidance."
        screenImage={phoneScreen}
        reverse
      />
    </div>
  );
};

export default FeaturesSection;
