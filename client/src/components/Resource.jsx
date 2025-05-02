import React from "react";

const mockResources = [
  {
    id: 1,
    title: "React Basics",
    description: "Introduction to React components, state & props.",
  },
  {
    id: 2,
    title: "JavaScript Deep Dive",
    description: "In-depth guide to modern JavaScript features.",
  },
  {
    id: 3,
    title: "TypeScript Handbook",
    description: "Understanding static types in TypeScript.",
  },
  {
    id: 4,
    title: "Node.js Crash Course",
    description: "A quick start guide to building Node.js servers.",
  },
  {
    id: 5,
    title: "Python for Data Science",
    description: "Getting started with Python in data analysis.",
  },
  {
    id: 6,
    title: "CSS Grid & Flexbox",
    description: "Learn modern layout techniques with CSS.",
  },
  {
    id: 7,
    title: "Machine Learning 101",
    description: "Basics of machine learning algorithms and workflows.",
  },
  {
    id: 8,
    title: "System Design Fundamentals",
    description: "Principles of scalable and resilient architectures.",
  },
];

const Resource = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {mockResources.map((resource) => (
        <div
          key={resource.id}
          className="bg-white rounded-lg shadow-md p-6 flex flex-col"
        >
          <h3 className="text-lg font-semibold mb-2">{resource.title}</h3>
          <p className="text-gray-600 flex-grow">{resource.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Resource;
