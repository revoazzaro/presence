import "../../App.css";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = ({ isOpen, closeMenu }) => {
  const [isSubMenuAbsen, setIsSubMenuAbsen] = useState(false);
  const [isSubMenuSiswa, setIsSubMenuSiswa] = useState(false);

  const navigate = useNavigate();

  const toggleMenuAbsen = () => {
    setIsSubMenuAbsen(!isSubMenuAbsen);
  };

  const toggleMenuSiswa = () => {
    setIsSubMenuSiswa(!isSubMenuSiswa);
  };

  return (
    <>
      <div
        className={`fixed transition-transform ${
          isOpen ? "left-0 sidebar_efek" : "left-[-55%] sidebar_efek"
        } top-[53px] w-screen md:w-1/6 h-full bg-black`}
      >
        <div className="px-4">
          <p className="text-white font-semibold text-2xl">Absensi</p>
          <ul className="gap-8 flex flex-col pt-8">
            <li className="text-[#595c5f] font-medium hover:cursor-pointer hover:text-white text-lg transition-all">
              <Link to={"/"}>Dasboard</Link>
            </li>
            <a onClick={toggleMenuAbsen} className="text-[#595c5f] font-medium">
              {isSubMenuAbsen}
              <div className="flex flex-col">
                <div className="flex flex-row justify-between hover:cursor-pointer group/dropdown hover:text-white transition-all">
                  <p className="text-lg">Absensi</p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#595c5f"
                    className={`${isSubMenuAbsen ? "transform rotate-180 transition-all": ""} group-hover/dropdown:fill-white `}
                  >
                    <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
                  </svg>
                </div>
                {isSubMenuAbsen && (
                  <ul className="pt-2 pl-2 gap-2 flex flex-col text-md">
                    <li
                      className="hover:cursor-pointer hover:text-white transition-all"
                      onClick={() => navigate("/daftarhadir")}
                    >
                      Daftar hadir
                    </li>
                    <li
                      className="hover:cursor-pointer hover:text-white transition-all"
                      onClick={() => navigate("/download")}
                    >
                      Download
                    </li>
                    <li
                      className="hover:cursor-pointer hover:text-white transition-all"
                      onClick={() => navigate("/jadwal")}
                    >
                      Jadwal
                    </li>
                  </ul>
                )}
              </div>
            </a>
            <a className="text-[#595c5f] font-medium hover:cursor-pointer hover:text-white text-lg transition-all" onClick={() => navigate("/daftarguru")}>
              Daftar Guru
            </a>
            <a onClick={toggleMenuSiswa} className="text-[#595c5f] font-medium">
              {isSubMenuSiswa}
              <div className="flex flex-col">
                <div className="flex flex-row justify-between hover:cursor-pointer group/dropdown hover:text-white transition-all">
                  <p className="text-lg">Siswa</p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#595c5f"
                    className={`${isSubMenuAbsen ? "transform rotate-180 transition-all": ""} group-hover/dropdown:fill-white `}
                  >
                    <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
                  </svg>
                </div>
                {isSubMenuSiswa && (
                  <ul className="pt-2 pl-2 gap-2 flex flex-col text-md">
                    <li className="hover:cursor-pointer hover:text-white transition-all" onClick={() => navigate("/daftarsiswa")}>
                      Daftar Siswa
                    </li>
                    <li className="hover:cursor-pointer hover:text-white transition-all" onClick={() => navigate("/daftarwalimurid")}>
                      Daftar Wali Murid
                    </li>
                    <li className="hover:cursor-pointer hover:text-white transition-all">
                      Daftar Kartu
                    </li>
                  </ul>
                )}
              </div>
            </a>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
