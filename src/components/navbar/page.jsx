import { useEffect, useRef, useState } from "react";
import Sidebar from "../sidebar/page";
import { useNavigate } from "react-router-dom";

const Navbar = ({ isMenuOpen, setIsMenuOpen }) => {
  const [isdropdownOpen, setIsdropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const iconRef = useRef(null);
  const navigate = useNavigate();

  const togglemenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsdropdownOpen(false);
  };

  const toggledropdown = (event) => {
    event.stopPropagation();
    setIsdropdownOpen((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      iconRef.current &&
      !iconRef.current.contains(event.target)
    ) {
      setIsdropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <nav className="fixed bg-black w-screen top-0 left-0">
        <div className="flex px-4 py-3 justify-between">
          <div
            id="menu-button"
            className="hover:cursor-pointer"
            onClick={togglemenu}
          >
            <span
              className={`button-menu transition duration-300 ease-in-out origin-top-left block ${
                isMenuOpen ? "transform rotate-45" : ""
              }`}
            ></span>
            <span
              className={`button-menu transition duration-300 ease-in-out block ${
                isMenuOpen ? "scale-0" : ""
              }`}
            ></span>
            <span
              className={`button-menu transition duration-300 ease-in-out origin-bottom-left block ${
                isMenuOpen ? "transform -rotate-45" : ""
              }`}
            ></span>
          </div>
          <div
            ref={iconRef}
            className="justify-between items-center my-auto hover:cursor-pointer mr-4 flex"
            onClick={toggledropdown}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#e8eaed"
            >
              <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Z" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#e8eaed"
              className={`${
                isdropdownOpen ? "transform rotate-180 transition-all" : "transition-all transform"
              }`}
            >
              <path d="M480-360 280-560h400L480-360Z" />
            </svg>
          </div>
          {isdropdownOpen && (
            <div
              ref={dropdownRef}
              className="dropdown-menu bg-white shadow-2xl w-44 justify-start border-[1px] rounded-md"
            >
              <ul>
                <li
                  className="dropdown-item text-black"
                  onClick={() => {
                    navigate("/profile");
                    setIsdropdownOpen(false);
                  }}
                >
                  Profile
                </li>
                <li
                  className="dropdown-item text-black"
                  onClick={() => {
                    navigate("/logout");
                    setIsdropdownOpen(false);
                  }}
                >
                  Log Out
                </li>
              </ul>
            </div>
          )}
          {isMenuOpen && (
            <>
              <Sidebar isOpen={isMenuOpen} />
            </>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
