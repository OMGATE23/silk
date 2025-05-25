import { Button } from "@/components/ui/button";
import { BookOpen, Sparkles, TrendingUp, Play } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="pt-24 pb-16 mt-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <div className="animate-fade-in">
              <h1 className="font-inter text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                Learn Anything with
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block mt-2">
                  AI-Powered Courses
                </span>
              </h1>
            </div>

            <div className="animate-fade-in">
              <p className="font-inter text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Simply tell our AI what you want to learn, and we'll create a
                personalized course tailored to your needs. Track your progress
                and master any subject.
              </p>
            </div>

            <div className="animate-fade-in mb-12">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/OMGATE23/silk"
                className="bg-gray-900 rounded-lg hover:bg-gray-800 text-white px-8 py-3 text-lg font-inter mr-4"
              >
                Start Learning Now
              </a>
            </div>

            <div className="animate-fade-in">
              <div className="flex justify-center lg:justify-start items-center space-x-8 text-gray-500">
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-5 h-5" />
                  <span className="font-inter text-sm">AI-Generated</span>
                </div>
                <div className="flex items-center space-x-2">
                  <BookOpen className="w-5 h-5" />
                  <span className="font-inter text-sm">Personalized</span>
                </div>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5" />
                  <span className="font-inter text-sm">Progress Tracking</span>
                </div>
              </div>
            </div>
          </div>
          <div className="animate-fade-in">
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-4 transform hover:scale-105 transition-transform duration-300">
                <div className="relative overflow-hidden rounded-xl bg-gray-100">
                  <div
                    style={{
                      position: "relative",
                      paddingBottom: "62.42774566473989%",
                      height: 0,
                    }}
                  >
                    <iframe
                      src="https://www.loom.com/embed/1a655c6d51644e63ac049107cd256a57?sid=728728ab-4cc0-4d39-b133-0249b0b70a28"
                      frameBorder="0"
                      allowFullScreen
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                      }}
                      className="rounded-xl"
                    />
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <div className="flex items-center justify-center space-x-2 text-gray-600">
                    <span className="font-inter text-sm font-medium">
                      Watch Silk in Action
                    </span>
                  </div>
                </div>
              </div>

              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-20 animate-float"></div>
              <div
                className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full opacity-20 animate-float"
                style={{ animationDelay: "2s" }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
