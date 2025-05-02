import React, { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { X } from "lucide-react"; // Icon for close button
import YouTube from "react-youtube"; // Import the YouTube component

// Helper function to extract YouTube video ID from various URL formats
const extractVideoId = (url) => {
  if (!url) return null;
  // Regular expression to find YouTube video ID
  const regExp =
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);

  if (match && match[2].length === 11) {
    return match[2];
  } else {
    // Handle cases like shorts (e.g., https://www.youtube.com/shorts/VIDEO_ID)
    const shortsRegExp = /shorts\/([^#\&\?]+)/;
    const shortsMatch = url.match(shortsRegExp);
    if (shortsMatch && shortsMatch[1].length === 11) {
      return shortsMatch[1];
    }
    return null; // Return null if no valid ID is found
  }
};

const ContributeModal = ({ isOpen, closeModal }) => {
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [tags, setTags] = useState("");
  const [videoId, setVideoId] = useState(null); // State for the video ID

  const handleUrlChange = (e) => {
    const newUrl = e.target.value;
    setYoutubeUrl(newUrl);
    const id = extractVideoId(newUrl);
    setVideoId(id); // Update the video ID state
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle the form submission logic here
    console.log("Submitting resource:", { youtubeUrl, tags });
    // You might want to clear the form and close the modal upon success
    setYoutubeUrl("");
    setTags("");
    setVideoId(null); // Reset video ID on submit
    closeModal(); // Close the modal after submission
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 flex justify-between items-center"
                >
                  Contribute Resource
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 p-1 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={closeModal}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </Dialog.Title>
                <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                  <div>
                    <label
                      htmlFor="youtubeUrl"
                      className="block text-sm font-medium text-gray-700"
                    >
                      YouTube URL
                    </label>
                    <input
                      type="url"
                      name="youtubeUrl"
                      id="youtubeUrl"
                      value={youtubeUrl}
                      onChange={handleUrlChange}
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                      placeholder="https://www.youtube.com/watch?v=..."
                    />
                    {/* Conditionally render the YouTube preview */}
                    {videoId && (
                      <div className="mt-4">
                        <YouTube
                          videoId={videoId}
                          opts={{
                            height: "195", // Smaller height for preview
                            width: "100%", // Make it responsive
                            playerVars: {
                              // https://developers.google.com/youtube/player_parameters
                              autoplay: 0, // Don't autoplay
                            },
                          }}
                          className="rounded-md overflow-hidden" // Add some styling
                        />
                      </div>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="tags"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Tags (comma-separated)
                    </label>
                    <input
                      type="text"
                      name="tags"
                      id="tags"
                      value={tags}
                      onChange={(e) => setTags(e.target.value)}
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                      placeholder="e.g., react, javascript, tutorial"
                    />
                  </div>

                  <div className="mt-6 flex justify-end">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 mr-2"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ContributeModal;
