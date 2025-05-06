import React, { useState, Fragment, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { X, Youtube, LoaderCircle } from "lucide-react"; // Icon for close button
import YouTube from "react-youtube"; // Import the YouTube component
import { useDispatch, useSelector } from "react-redux"; // Added imports
import { addResource } from "../store/resourceSlice"; // Added import
import { selectCurrentUser } from "../store/userSlice"; // Import user selector
import toast from "react-hot-toast";
import Confetti from "react-confetti";

const apiUrl = import.meta.env.VITE_API_URL;

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
  const [selectedSubject, setSelectedSubject] = useState(""); // Changed from tags
  const [videoId, setVideoId] = useState(null); // State for the video ID
  const [isSubmitting, setIsSubmitting] = useState(false); // Add loading state
  const [submitError, setSubmitError] = useState(null); // Add error state
  const [showConfetti, setShowConfetti] = useState(false); // State for confetti
  const [urlError, setUrlError] = useState(null); // State for URL validation error

  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);

  const handleUrlChange = (e) => {
    const newUrl = e.target.value;
    setYoutubeUrl(newUrl);
    setSubmitError(null); // Clear general submit error on URL change
    setUrlError(null); // Clear URL error initially

    if (newUrl.trim() === "") {
      setVideoId(null); // Clear video preview if URL is empty
      return; // Exit if the URL is empty
    }

    const id = extractVideoId(newUrl);
    if (id) {
      setVideoId(id); // Update the video ID state
    } else {
      setVideoId(null); // Clear video preview if URL is invalid
      setUrlError("Please enter a valid YouTube video URL."); // Set URL error
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!currentUser) {
      setSubmitError("User not logged in. Cannot submit resource.");
      console.error("User ID not found in store");
      return;
    }
    if (!youtubeUrl || !selectedSubject) {
      // Changed from !tags
      setSubmitError("URL and Subject are required.");
      return;
    }
    // Check for URL validation error before submitting
    if (urlError) {
      setSubmitError("Please fix the errors before submitting."); // You could use a more specific error or rely on urlError display
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    // Prepare tags array - now contains only the selected subject
    const tagsArray = selectedSubject ? [selectedSubject] : []; // Changed from tags

    const resourceData = {
      supabaseUserId: currentUser.id,
      url: youtubeUrl,
      type: "video", // Hardcoded as video for now
      tags: tagsArray,
    };

    try {
      const response = await fetch(`${apiUrl}/api/v1/resources/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Add any other required headers like Authorization if needed
        },
        body: JSON.stringify(resourceData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }

      const newResource = await response.json();
      console.log("i am new resource", newResource);
      // Assuming the API returns the newly created resource object
      // Dispatch action to add to store (optional, depends on desired UX)
      if (newResource.data) {
        // Check if data exists in response
        dispatch(addResource(newResource.data));
      }

      // Show success toast
      toast.success("Resource submitted successfully!");

      // Trigger confetti
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000); // Hide confetti after 5 seconds

      // Reset form and close modal on success
      setYoutubeUrl("");
      setSelectedSubject(""); // Changed from setTags
      setVideoId(null);
      closeModal();
    } catch (error) {
      console.error("Failed to submit resource:", error);
      setSubmitError(error.message || "An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Conditionally render Confetti */}
      {showConfetti && (
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      )}

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => !isSubmitting && closeModal()}
        >
          {" "}
          {/* Prevent closing while submitting */}
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
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 p-1 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-50"
                      onClick={closeModal}
                      disabled={isSubmitting}
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
                        disabled={isSubmitting}
                      />
                      {/* Note about supported resources */}
                      <p className="mt-1 text-xs text-gray-500">
                        Note: Currently, only YouTube videos are supported as
                        resources.
                      </p>
                      {/* Display URL validation error */}
                      {urlError && (
                        <p className="mt-1 text-sm text-red-600">{urlError}</p>
                      )}
                      {/* Conditionally render the YouTube preview */}
                      {videoId &&
                        !urlError && ( // Only show preview if ID exists and no error
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
                    {/* Replace Tags Input with Subject Dropdown */}
                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Subject
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={selectedSubject}
                        onChange={(e) => setSelectedSubject(e.target.value)}
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border bg-white" // Added bg-white for consistency
                        disabled={isSubmitting}
                      >
                        <option value="" disabled>
                          Select a subject...
                        </option>
                        <optgroup label="Foundational">
                          <option value="Discrete Mathematics">
                            Discrete Mathematics
                          </option>
                          <option value="Programming Fundamentals">
                            Programming Fundamentals
                          </option>
                          <option value="Calculus">Calculus I & II</option>
                          <option value="Linear Algebra">Linear Algebra</option>
                          <option value="Probability & Statistics">
                            Probability & Statistics
                          </option>
                        </optgroup>
                        <optgroup label="Core">
                          <option value="Data Structures">
                            Data Structures
                          </option>
                          <option value="Algorithms">Algorithms</option>
                          <option value="Digital Logic">Digital Logic</option>
                          <option value="Computer Architecture">
                            Computer Architecture
                          </option>
                          <option value="Operating Systems">
                            Operating Systems
                          </option>
                          <option value="Database Systems">
                            Database Systems
                          </option>
                          <option value="Software Engineering">
                            Software Engineering
                          </option>
                          <option value="Computer Networks">
                            Computer Networks
                          </option>
                          <option value="Theory of Computation">
                            Theory of Computation
                          </option>
                          <option value="Compiler Design">
                            Compiler Design
                          </option>
                        </optgroup>
                        <optgroup label="Advanced">
                          <option value="Artificial Intelligence">
                            Artificial Intelligence (AI)
                          </option>
                          <option value="Machine Learning">
                            Machine Learning (ML)
                          </option>
                          <option value="Cloud Computing">
                            Cloud Computing
                          </option>
                          <option value="Crytography">Cryptography</option>
                          <option value="Cybersecurity">Cybersecurity</option>
                          <option value="Distributed Systems">
                            Distributed Systems
                          </option>
                          <option value="Computer Graphics">
                            Computer Graphics
                          </option>
                          <option value="Human-Computer Interaction">
                            Human-Computer Interaction (HCI)
                          </option>
                          <option value="Natural Language Processing">
                            Natural Language Processing (NLP)
                          </option>
                          <option value="Bioinformatics">Bioinformatics</option>
                          <option value="Robotics">Robotics</option>
                          <option value="Quantum Computing">
                            Quantum Computing
                          </option>
                        </optgroup>
                      </select>
                    </div>
                    {/* End Subject Dropdown */}

                    {/* Display submit error */}
                    {submitError && (
                      <p className="text-sm text-red-600">{submitError}</p>
                    )}

                    <div className="mt-6 flex justify-end">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 mr-2 disabled:opacity-50"
                        onClick={closeModal}
                        disabled={isSubmitting}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={
                          isSubmitting ||
                          !youtubeUrl ||
                          !selectedSubject ||
                          urlError // Add urlError to disabled condition
                        } // Changed from !tags
                      >
                        {isSubmitting ? "Submitting..." : "Submit"}
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ContributeModal;
