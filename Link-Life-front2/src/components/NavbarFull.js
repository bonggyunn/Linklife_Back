import React from "react";
import {
  FaSearch,
  FaCalendarAlt,
  FaHashtag,
  FaAngleLeft,
  FaUserCircle,
  FaUserFriends,
  FaUserPlus,
} from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import logo from "../images/logo_Link-Life(1).png";

const NavbarFull = () => {
  return (
    <nav className="flex justify-between px-4 py-3 bg-white border">
      <div className="items-center px-3 py-2.5 text-xl">
        <span className="font-semibold text-white">
          <img src={logo} alt="link-life logo" className="h-5 w-25" />
        </span>
      </div>

      <div className="relative md:w-96"></div>

      <div className="flex items-center m-1 gap-x-5">
        {/* 1. 친구 */}
        <div className="relative">
          <button className="text-black group">
            <FaUserFriends className="w-6 h-6 mt-1" />
            <div className="absolute z-10 hidden w-20 bg-gray-200 rounded-lg shadow -right-7 group-hover:block top-full">
              <ul className="py-2 text-xs text-gray-950">
                <li>
                  <a href="" className="hover:text-blue-600 hover:font-bold">
                    로그아웃
                  </a>
                </li>
              </ul>
            </div>
          </button>
        </div>

        {/* 2. 그룹 */}
        <div className="relative">
          <button className="text-black group">
            <FaPeopleGroup className="w-6 h-6 mt-1" />
            <div className="absolute z-10 hidden w-20 bg-gray-200 rounded-lg shadow -right-7 group-hover:block top-full">
              <ul className="py-2 text-xs text-gray-950">
                <li>그룹</li>
              </ul>
            </div>
          </button>
        </div>

        {/* 3. 로그아웃 */}
        <div className="relative">
          <button className="text-black group">
            <FaUserCircle className="w-6 h-6 mt-1" />
            <div className="absolute right-0 z-10 hidden w-20 bg-gray-200 rounded-lg shadow group-hover:block group-focus:block top-full">
              <ul className="py-2 text-xs text-gray-950">
                <li>로그아웃</li>
              </ul>
            </div>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavbarFull;
