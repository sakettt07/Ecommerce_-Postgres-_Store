import React from "react";
import { Link, useResolvedPath } from "react-router-dom";
import {ShoppingBagIcon} from "lucide-react";

const Navbar = () => {
    const {pathname}=useResolvedPath();
    const isHomePage=pathname==="/";
  return (
    <div className=" flex items-center justify-between px-5 py-4 bg-neutral">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <a>Parent</a>
              <ul className="p-2">
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </li>
            <li>
              <a>Item 3</a>
            </li>
          </ul>
        </div>
        <p className="text-3xl">PERNStore 🛒</p>
      </div>
      <div className="flex items-center gap-4">
        {isHomePage&& (
            <div className="indicator">
                <div className="p-2 rounded-full hover:bg-base-100 transition-colors">
                    <ShoppingBagIcon className="size-5" />
                    <span className="badge badge-sm badge-primary indicator-item">8</span>
                </div>
            </div>
        )}

      </div>
    </div>
  );
};

export default Navbar;
