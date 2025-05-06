import React from "react";
import { Github, X, Code, Facebook, Mail } from "lucide-react";

const SignInSection = ({ signInWithTwitter }) => {
  return (
    <section id="signin" className="py-24 relative bg-csdark text-foreground">
      {/* Background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-csblue/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-cspurple/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-md mx-auto bg-gray-900/50 rounded-xl p-8 border border-gray-700 backdrop-blur-sm shadow-xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-csblue/10 mb-4">
              <Code className="h-8 w-8 text-csblue" />
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Join CSVerse
            </h2>
            <p className="mt-2 text-gray-400">
              Sign in to start sharing and discovering CS resources.
            </p>
          </div>

          <div className="space-y-4">
            <button
              onClick={signInWithTwitter}
              className="w-full flex items-center justify-center py-2 px-4 rounded-md border border-gray-700 bg-gray-800/50 hover:bg-gray-700 text-white transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              Sign in with X
            </button>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-700 text-center">
            <p className="text-sm text-gray-400">
              By signing in, you agree to our
              <a href="#" className="text-csblue hover:underline">
                {" "}
                Terms of Service{" "}
              </a>
              and
              <a href="#" className="text-csblue hover:underline">
                {" "}
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignInSection;
