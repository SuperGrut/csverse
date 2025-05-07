import React from 'react';
import { Search, BookOpen, Tag, Star, Award, Users, BookMarked, MessageSquare } from 'lucide-react';

const Features = () => {
  const featuresData = [
    {
      icon: <Search className="w-6 h-6" />,
      title: "Intelligent Search",
      description: "Find exactly what you're looking for with our smart search algorithm that understands CS concepts and terminology."
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Resource Library",
      description: "Access thousands of curated CS resources from tutorials and courses to books and documentation."
    },
    {
      icon: <Tag className="w-6 h-6" />,
      title: "Topic Tagging",
      description: "Discover resources through an extensive tagging system covering all major CS domains and specialties."
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: "Personalized Recommendations",
      description: "Get resource suggestions based on your interests, learning history, and community trends."
    },
    {
      icon: <BookMarked className="w-6 h-6" />,
      title: "Save and Organize",
      description: "Create collections and bookmark resources to build your personal knowledge library."
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Quality Rating",
      description: "Community-vetted resources with quality ratings help you find the best learning materials."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Community Sharing",
      description: "Share your discoveries with fellow developers and learners in the CS community."
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "Discussion Forums",
      description: "Engage in discussions about resources and exchange insights with other learners."
    }
  ];

  return (
    <section id="features" className="py-20 bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Powerful Features
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Our platform offers everything you need to discover, share, and learn from the best computer science resources
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuresData.map((feature, index) => (
            <div 
              key={index}
              className="bg-gray-900 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="w-12 h-12 flex items-center justify-center bg-blue-900 text-blue-400 rounded-full mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">
                {feature.title}
              </h3>
              <p className="text-gray-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="inline-block bg-blue-900 bg-opacity-50 px-6 py-2 rounded-full text-blue-400 font-medium text-sm mb-4">
            Ready to get started?
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
            Join thousands of developers discovering CS resources
          </h3>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-300">
            Create Your Account
          </button>
        </div>
      </div>
    </section>
  );
};

export default Features;