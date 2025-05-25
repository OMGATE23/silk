import { Button } from "@/components/ui/button";
import { BookOpen, Sparkles, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="pt-24 mt-16 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <div className="animate-fade-in">
            <h1 className="font-inter text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Learn Anything with
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block mt-2">
                AI-Powered Courses
              </span>
            </h1>
          </div>

          <div className="animate-fade-in">
            <p className="font-inter text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
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
            <div className="flex justify-center items-center space-x-8 text-gray-500">
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
      </div>
    </section>
  );
};

export default HeroSection;
