import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";

const Navigation = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="font-inter text-2xl font-bold text-gray-900">
              Silk
            </div>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline justify-center space-x-8">
              <a
                href="#features"
                className="text-gray-600 hover:text-gray-900 transition-colors duration-200 font-inter"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="text-gray-600 hover:text-gray-900 transition-colors duration-200 font-inter"
              >
                How it Works
              </a>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <a
              href="https://github.com/OMGATE23/silk"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-900 flex justify-center items-center gap-2 py-1.5 px-4 rounded-md hover:bg-gray-800 text-white font-inter"
            >
              <Github className="w-4 h-4" />
              Get Started
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
