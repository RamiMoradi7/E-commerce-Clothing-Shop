import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import React from "react";
import { AudienceModel } from "../../../../Models/AudienceModel";
import { CategoryModel } from "../../../../Models/CategoryModel";
import TrendyThreadsLogo from "../../../Assets/Images/TrendyThreadsLogo.png";

import { NavLink } from "react-router-dom";
import MenuItems from "./MobileMenuItems";

interface MobileMenuProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
  audiences: AudienceModel[];
  categories: CategoryModel[];
  activeAudience: string | null;
  setActiveAudience: React.Dispatch<React.SetStateAction<string | null>>;
  handleSelectChange: (categoryId: string, subCategoryId?: string) => void;
}

export default function MobileMenu({
  isMenuOpen,
  toggleMenu,
  audiences,
  categories,
  activeAudience,
  setActiveAudience,
  handleSelectChange,
}: MobileMenuProps): JSX.Element {
  return (
    <>
      <Transition show={isMenuOpen}>
        <Dialog className="relative z-50" onClose={toggleMenu}>
          <TransitionChild
            enter="transform ease-in-out duration-500 sm:duration-700"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transform ease-in-out duration-500 sm:duration-700"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </TransitionChild>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 left-0 flex max-w-full pr-10">
                <TransitionChild
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="-translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <DialogPanel className="pointer-events-auto w-screen max-w-md">
                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                        <div className="flex items-start justify-between">
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                              onClick={() => toggleMenu()}
                            >
                              <span className="absolute -inset-0.5" />
                              <span className="sr-only">Close panel</span>
                              <XMarkIcon
                                className="h-6 w-6"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                          <NavLink
                            to={"/"}
                            className="lg:hidden flex items-center"
                          >
                            <span className="sr-only">Trendy Threads</span>
                            <img
                              src={TrendyThreadsLogo}
                              alt="Trendy-Threads logo"
                              className="h-10 w-auto max-w-full"
                            />
                          </NavLink>
                        </div>

                        <div className="mt-8">
                          <MenuItems
                            toggleMenu={toggleMenu}
                            activeAudience={activeAudience}
                            setActiveAudience={setActiveAudience}
                            audiences={audiences}
                            categories={categories}
                            handleSelectChange={handleSelectChange}
                          />
                          <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                            <div className="flow-root">
                              <NavLink
                                to={"/register"}
                                className="-m-2 block p-2 font-medium text-gray-900"
                              >
                                Create an account
                              </NavLink>
                            </div>
                            <div className="flow-root">
                              <NavLink
                                to={"/login"}
                                className="-m-2 block p-2 font-medium text-gray-900"
                              >
                                Sign in
                              </NavLink>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900"></div>
                    </div>
                  </DialogPanel>
                </TransitionChild>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
