import React from "react";
import Navbar from "../src/components/Navbar";
import Hero from "../src/components/Hero";
import Screenshots from "../src/components/Screenshots";
import Features from "../src/components/Features";
import TagsCarousel from "../src/components/TagsCarousel";
import Footer from "../src/components/Footer";

// Create some custom styles for background patterns
const injectGlobalStyles = () => {
  const style = document.createElement("style");
  style.innerHTML = `
    .bg-grid-pattern {
      background-image: linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
      background-size: 24px 24px;
    }
  `;
  document.head.appendChild(style);
};

const Index = ({ signInWithTwitter }) => {
  // Inject global styles on component mount
  React.useEffect(() => {
    injectGlobalStyles();

    // Update the page title
    document.title =
      "CS Resources - Discover & Share Computer Science Knowledge";
  }, []);

  return (
    <div className="min-h-screen bg-gray-900">
      {/* <Navbar signInWithTwitter={signInWithTwitter} /> */}
      <Hero signInWithTwitter={signInWithTwitter} />
      <Screenshots />
      <Features />
      <TagsCarousel />
      <Footer />
    </div>
  );
};

export default Index;
