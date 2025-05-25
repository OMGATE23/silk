import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-gray-900 to-gray-800">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-inter text-4xl md:text-5xl font-bold text-white mb-6">
          Ready to Transform Your Learning?
        </h2>
        <p className="font-inter text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Join all the learners who are already using Silk to master new skills
          and achieve their goals.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://github.com/OMGATE23/silk"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              size="lg"
              className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 text-lg font-inter"
            >
              Start Learning Today
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
