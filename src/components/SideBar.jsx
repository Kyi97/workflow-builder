import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { navigation } from "../utils/constant";
import { UserIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

const Sidebar = () => {
  const location = useLocation();
  const [active, setActive] = useState(() =>
    navigation.find((item) => item.href === location.pathname)
  );
  const handleNavigation = (item) => setActive(item);

  return (
    <div className="flex min-h-screen fixed inset-y-0">
      <nav className="w-20 md:w-64 default-bg">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-center h-16 bg-gray-900 text-white">
            <img
              alt="Builder"
              src="https://tailwindui.com/plus/img/logos/mark.svg?color=white"
              className="h-8 w-auto"
            />
            <span className="hidden md:inline text-lg font-bold">
              Workflow Builder
            </span>
          </div>

          <div className="flex-grow p-6 space-y-5">
            {/* Navigation */}
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => handleNavigation(item)}
                className={clsx(
                  item === active ? "bg-gray-900 text-white" : "text-[#000]",
                  "block rounded-md px-4 py-2 font-medium items-center"
                )}
                aria-label={`Navigate to ${item.name}`}
              >
                <span className="flex items-center justify-center">
                  <item.icon className="w-6 h-6 flex-shrink-0" />
                  <span className="ml-3 hidden md:inline">{item.name}</span>
                </span>
              </Link>
            ))}
          </div>

          {/* Profile */}
          <div className="p-6 border-t border-gray-200">
            <Link className="flex items-center justify-center rounded-md px-4 py-2 font-medium bg-gray-900 text-white">
              <div className="flex items-center justify-center w-8 h-8  ">
                <UserIcon className="w-5 h-5 flex-shrink-0 " />
              </div>
              <span className="ml-3 hidden md:inline">Profile</span>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
