import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare, Cpu, BookOpen, Trophy } from "lucide-react";

const steps = [
  {
    icon: MessageSquare,
    title: "Tell Us What You Want to Learn",
    description:
      "Simply describe the topic, skill, or subject you're interested in mastering.",
    step: "01",
  },
  {
    icon: Cpu,
    title: "AI Creates Your Course",
    description:
      "Our AI analyzes your request and generates a comprehensive, structured course just for you.",
    step: "02",
  },
  {
    icon: BookOpen,
    title: "Start Learning",
    description:
      "Access your personalized course content and begin your learning journey at your own pace.",
    step: "03",
  },
  {
    icon: Trophy,
    title: "Track Your Progress",
    description:
      "Monitor your advancement through each section and courses to be on top of your courses at any time",
    step: "04",
  },
];

const HowItWorksSection = () => {
  return (
    <section
      id="how-it-works"
      className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-inter text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            How Silk Works
          </h2>
          <p className="font-inter text-xl text-gray-600 max-w-2xl mx-auto">
            From idea to mastery in just four simple steps
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group h-full">
                <CardContent className="p-8 text-center h-full flex flex-col">
                  <div className="mb-6">
                    <div className="relative">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                        <step.icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-gray-100 text-gray-700 rounded-full flex items-center justify-center text-sm font-bold font-inter">
                        {step.step}
                      </div>
                    </div>
                  </div>
                  <h3 className="font-inter text-xl font-bold text-gray-900 mb-4 flex-grow-0">
                    {step.title}
                  </h3>
                  <p className="font-inter text-gray-600 leading-relaxed flex-grow">
                    {step.description}
                  </p>
                </CardContent>
              </Card>

              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4  transform translate-x-1/2">
                  <div className="w-8 h-0.5 bg-gray-300"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
