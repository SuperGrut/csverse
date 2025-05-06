import React, { useState, Fragment } from "react";
import { Link } from "react-router-dom";
import { Popover, Transition } from "@headlessui/react";
import {
  UserCircle,
  BookOpen,
  LogOut,
  PlusCircle,
  LogIn,
  Code,
} from "lucide-react";
import ContributeModal from "./ContributeModal";

const Navbar = ({ user, signOut, signInWithTwitter }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const userAvatar = user?.user_metadata?.avatar_url;
  const userName = user?.user_metadata?.user_name || user?.user_metadata?.name;

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-40 flex justify-between items-center p-4 bg-gray-600 shadow-md">
        <div>
          <Link to="/" className="text-xl font-bold text-white">
            <div className="flex items-center space-x-2">
              <Code className="h-8 w-8 text-csblue" />
              <span className="text-xl font-bold text-white">CSVerse</span>
            </div>
          </Link>
        </div>
        <div className="flex gap-4 items-center">
          {user && (
            <Link to="/leaderboard" className="text-white hover:text-gray-300">
              Leaderboard
            </Link>
          )}

          {user ? (
            <Popover className="relative">
              {({ open, close }) => (
                <>
                  <Popover.Button
                    className={`
                      ${open ? "text-indigo-600" : "text-gray-700"}
                      group inline-flex items-center rounded-full text-base font-medium hover:text-indigo-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
                  >
                    {userAvatar ? (
                      <img
                        src={userAvatar}
                        alt={userName || "User Avatar"}
                        className="h-8 w-8 rounded-full object-cover"
                      />
                    ) : (
                      <UserCircle className="h-8 w-8" aria-hidden="true" />
                    )}
                  </Popover.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <Popover.Panel className="absolute right-0 z-10 mt-3 w-56 transform px-4 sm:px-0">
                      <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                        <div className="relative grid gap-1 bg-white p-2">
                          {userName && (
                            <div className="px-2 py-2 text-sm font-medium text-gray-700 border-b mb-1">
                              Hi, {userName}
                            </div>
                          )}

                          {/* <a
                            href="#"
                            onClick={close}
                            className="flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                          >
                            <BookOpen
                              className="h-5 w-5 text-indigo-500 mr-3"
                              aria-hidden="true"
                            />
                            Score
                          </a> */}
                          <button
                            onClick={() => {
                              openModal();
                              close();
                            }}
                            className="flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50 w-full text-left"
                          >
                            <PlusCircle
                              className="h-5 w-5 text-indigo-500 mr-3"
                              aria-hidden="true"
                            />
                            Contribute Resources
                          </button>
                          <button
                            onClick={() => {
                              signOut();
                              close();
                            }}
                            className="flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50 w-full text-left"
                          >
                            <LogOut
                              className="h-5 w-5 text-indigo-500 mr-3"
                              aria-hidden="true"
                            />
                            Sign Out
                          </button>
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>
          ) : (
            <button
              onClick={signInWithTwitter}
              className="flex items-center px-3 py-1.5 border border-transparent text-base font-medium rounded-md text-white bg-black hover:bg-gray-800 transition duration-150 ease-in-out"
            >
              <LogIn className="h-5 w-5 mr-2" />
              Sign In
            </button>
          )}
        </div>
      </nav>

      {user && <ContributeModal isOpen={isModalOpen} closeModal={closeModal} />}
    </>
  );
};

export default Navbar;
