import phoneScreen from "@/assets/phone-screen.png";

const PHONE_FRAME_URL = "https://cdn.prod.website-files.com/64dcc8c57b43bbf105fd381f/68c0826fd3988ffc8592fcc1_93173bd40d2fe4c447493e87edc46b17_Group%2020685.avif";
const PHONE_BG_URL = "https://cdn.prod.website-files.com/64dcc8c57b43bbf105fd381f/68bc1a457e73b0da2a032a3c_phone%20bg.svg";

const FeaturesSection = () => {
  return (
    <div className="bg-white text-[#222326] font-medium overflow-clip">
      {/* Recovery Section */}
      <div className="px-5 md:px-10">
        <div className="w-full max-w-[80rem] mx-auto">
          <div className="relative min-h-screen py-10 md:py-20">
            <div className="flex flex-col h-full gap-8 md:gap-12">
              {/* Header */}
              <div className="max-w-[42rem] mx-auto text-center">
                <div className="flex flex-col gap-5">
                  <h2 className="text-[32px] sm:text-[40px] md:text-[48px] font-semibold leading-tight">
                    Smarter Recovery
                  </h2>
                  <p className="text-[#616265] text-base md:text-xl max-w-[52ch] mx-auto">
                    Know when to push, when to pause, and when you're ready to perform, backed by real-time metrics and biomarkers.
                  </p>
                </div>
              </div>

              {/* Phone Mockup */}
              <div className="flex items-center justify-center flex-grow relative">

                {/* Phone container - using the hand+phone frame image */}
                <div className="relative w-full max-w-[500px] md:max-w-[600px] lg:max-w-[700px]">
                  {/* Phone frame with hands */}
                  <img
                    src={PHONE_FRAME_URL}
                    alt="Phone mockup"
                    className="w-full h-auto relative z-20"
                  />

                  {/* Screen content - positioned inside the phone */}
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
                      src={phoneScreen}
                      alt="Recovery screen"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                </div>

                {/* Background glow - Desktop only */}
                <img
                  src={PHONE_BG_URL}
                  alt=""
                  className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[65rem] h-[1280px] max-w-none -z-10 pointer-events-none"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FeaturesSection;