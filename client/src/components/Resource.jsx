import React from "react";
import { useSelector } from "react-redux";
import {
  selectAllResources,
  selectResourceStatus,
} from "../store/resourceSlice"; // Adjust path if necessary
import { selectCurrentUser } from "../store/userSlice"; // Import user selector

// Remove mockResources array
// const mockResources = [...];

const Resource = ({ selectedFilter, openContributeModal }) => {
  const allResources = useSelector(selectAllResources);
  const status = useSelector(selectResourceStatus);
  const error = useSelector((state) => state.resources.error); // Assuming error is stored like this
  const currentUser = useSelector(selectCurrentUser);
  console.log("i am profile", currentUser);
  if (status === "loading") {
    return (
      <div className="text-white p-4 text-center">Loading resources...</div>
    );
  }
 
  if (status === "failed") {
    return (
      <div className="p-4 text-center text-red-600">
        Error fetching resources: {error}
      </div>
    );
  }

  // Filter resources based on the selected tag
  const filteredResources = selectedFilter
    ? allResources.filter(
        (resource) => resource.tags && resource.tags.includes(selectedFilter)
      )
    : allResources;

  if (!filteredResources || filteredResources.length === 0) {
    return (
      <div className="p-4 text-center text-white">
        {selectedFilter ? (
          <div className="flex flex-col items-center space-y-3">
            <span>
              No resources found for the tag "<strong>{selectedFilter}</strong>
              ". Be the first to add one!
            </span>
            <button
              onClick={openContributeModal}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-200"
            >
              Contribute Now
            </button>
          </div>
        ) : (
          "No resources found."
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-1">
      {filteredResources.map((resource) => (
        <div
          key={resource._id} // Use _id from API data
          className="bg-[#1e2936] rounded-lg shadow-lg overflow-hidden flex flex-col transform transition duration-300 hover:scale-105"
        >
          {/* MOVED & UPDATED: Uploader Info - Placed above thumbnail */}
          {currentUser &&
            currentUser.user_metadata?.user_name &&
            currentUser.user_metadata?.avatar_url && (
              <a
                href={`https://x.com/${currentUser.user_metadata.user_name}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block" // Make the anchor a block element to be clickable
              >
                <div className="flex items-center space-x-2 p-3">
                  {" "}
                  {/* Added padding */}
                  <img
                    src={currentUser.user_metadata.avatar_url} // Use avatar from store
                    alt={`${currentUser.user_metadata.user_name}'s avatar`} // Use username from store
                    className="w-10 h-10 rounded-full border border-gray-300"
                  />
                  <span className="text-white text-sm font-semibold leading-tight">
                    {currentUser.user_metadata.user_name}{" "}
                    {/* Use username from store */}
                  </span>
                </div>
              </a>
            )}

          {/* Thumbnail Image Link */}
          {resource.thumbnailURL && (
            <a href={resource.url} target="_blank" rel="noopener noreferrer">
              <img
                src={resource.thumbnailURL}
                alt={resource.title}
                className="w-full h-40 object-cover"
              />
            </a>
          )}

          {/* Card Content */}
          <div className="p-4 flex flex-col flex-grow">
            {/* Resource Title */}
            <h3 className="text-lg text-white font-semibold mb-2 leading-tight">
              <a
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600 transition duration-200"
              >
                {resource.title}
              </a>
            </h3>
            <p className="text-white text-sm mb-3 flex-grow">
              {/* Truncate long descriptions */}
              {resource.description.length > 100
                ? `${resource.description.substring(0, 100)}...`
                : resource.description}
            </p>
            <div className="mt-auto pt-2 border-t border-gray-200">
              <p className="text-xs text-white mb-4">
                Channel: {resource.channelTitle || "N/A"}
              </p>
              {resource.tags && resource.tags.length > 0 && (
                <div className="flex justify-center flex-wrap gap-1">
                  {resource.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Resource;
