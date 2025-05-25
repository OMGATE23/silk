
import { Card, CardContent } from "@/components/ui/card";
import { Brain, Target, BarChart3, Clock, Zap } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI Course Generation",
    description: "Our advanced AI creates comprehensive courses tailored to your specific learning goals and preferred pace."
  },
  {
    icon: Target,
    title: "Personalized Learning",
    description: "Every course is customized to match your skill level, interests, and learning style for optimal results."
  },
  {
    icon: BarChart3,
    title: "Progress Tracking",
    description: "Monitor your learning journey with detailed analytics and milestone tracking to stay motivated."
  },
  {
    icon: Clock,
    title: "Flexible Scheduling",
    description: "Learn at your own pace with courses designed to fit into your busy schedule and lifestyle."
  },
  {
    icon: Zap,
    title: "Instant Access",
    description: "Get immediate access to your personalized course content as soon as you tell us what you want to learn."
  }
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-inter text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Why Choose Silk?
          </h2>
          <p className="font-inter text-xl text-gray-600 max-w-2xl mx-auto">
            Experience the future of personalized education with our cutting-edge AI technology
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 group">
              <CardContent className="p-8">
                <div className="mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h3 className="font-inter text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="font-inter text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
