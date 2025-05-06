import React from "react";
import { Code, Users, Tag, CircleArrowUp } from "lucide-react";

const AppShowcase = () => {
  return (
    <section id="showcase" className="py-24 relative text-foreground">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-csdark via-csdark/95 to-csdark z-0"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 tracking-tight">
            Powerful Platform for CS Knowledge
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Our intuitive interface makes it easy to discover, share, and
            organize computer science resources from across the web.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* App mockup */}
          <div className="lg:w-3/5">
            <div className="rounded-xl overflow-hidden shadow-2xl border border-gray-700 animate-glow">
              <div className="bg-gray-800 h-8 flex items-center px-4">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
              </div>
              <div className="bg-gray-900 p-4 h-[400px] sm:h-[500px] relative overflow-hidden">
                {/* App content mockup - Replaced grid with image */}
                <img
                  src="https://placehold.co/800x500/1a202c/cbd5e0?text=App+Screenshot+Here"
                  alt="App Screenshot Mockup"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="lg:w-2/5">
            <h3 className="text-2xl font-bold text-white mb-6 tracking-tight">
              Key Features
            </h3>
            <ul className="space-y-6">
              <li className="flex">
                <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-csblue/20 text-csblue">
                  <Code className="h-5 w-5" />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-bold tracking-tight text-white">
                    Curated Resources
                  </h4>
                  <p className="mt-1 text-gray-400">
                    Access high-quality computer science resources vetted by the
                    community.
                  </p>
                </div>
              </li>
              <li className="flex">
                <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-cspurple/20 text-cspurple">
                  <Users className="h-5 w-5" />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-bold tracking-tight text-white">
                    Community Rankings
                  </h4>
                  <p className="mt-1 text-gray-400">
                    Earn reputation and climb the leaderboards as you
                    contribute.
                  </p>
                </div>
              </li>
              <li className="flex">
                <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-csgreen/20 text-csgreen">
                  <Tag className="h-5 w-5" />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-bold tracking-tight text-white">
                    Subject Organization
                  </h4>
                  <p className="mt-1 text-gray-400">
                    Easily discover content organized by computer science
                    subjects and topics.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppShowcase;
