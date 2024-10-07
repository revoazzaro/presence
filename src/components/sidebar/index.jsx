import "../../App.css";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = ({ isOpen, closeMenu }) => {
  const [isSubMenuAbsen, setIsSubMenuAbsen] = useState(false);
  const [isSubMenuSiswa, setIsSubMenuSiswa] = useState(false);
  const token = localStorage.getItem("userRole");

  const navigate = useNavigate();

  const toggleMenuAbsen = () => {
    setIsSubMenuAbsen(!isSubMenuAbsen);
  };

  const toggleMenuSiswa = () => {
    setIsSubMenuSiswa(!isSubMenuSiswa);
  };

  const handleNavigate = (pate) => {
    navigate(pate);
    closeMenu();
  }

  return (
    <>
      <div
        className={`fixed transition-transform ${
          isOpen ? "left-0 sidebar_efek" : "left-[-55%] sidebar_efek"
        } top-[53px] w-screen md:w-1/6 h-full bg-black`}
      >
        <div className="px-4">
          <p className="text-white font-poppinsMedium text-2xl">Absensi</p>
          <ul className="gap-8 flex flex-col pt-8">
            <li className="text-[#595c5f] font-poppinsRegular hover:cursor-pointer hover:text-white text-xl transition-all">
              <Link to={"/"} onClick={handleNavigate} >Dashboard</Link>
            </li>
            <a onClick={toggleMenuAbsen} className="text-[#595c5f] font-medium">
              {isSubMenuAbsen}
              <div className="flex flex-col">
                <div className="flex flex-row justify-between hover:cursor-pointer group/dropdown hover:text-white transition-all font-poppinsRegular text-xl">
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
                      className="hover:cursor-pointer hover:text-white transition-all font-poppinsRegular "
                      onClick={() => handleNavigate("/daftarhadir")}
                    >
                      Daftar hadir
                    </li>
                    <li
                      className="hover:cursor-pointer hover:text-white transition-all font-poppinsRegular"
                      onClick={() => handleNavigate("/download")}
                    >
                      Download
                    </li>
                    <li
                      className="hover:cursor-pointer hover:text-white transition-all font-poppinsRegular"
                      onClick={() => handleNavigate("/jadwal")}
                    >
                      Jadwal
                    </li>
                  </ul>
                )}
              </div>
            </a>
            {token === "admin" || token === "guru" ? <a className="text-[#595c5f] font-poppinsRegular hover:cursor-pointer hover:text-white text-xl transition-all" onClick={() => handleNavigate("/daftarguru")}>
              Daftar Guru
            </a> : null}
            <a onClick={toggleMenuSiswa} className="text-[#595c5f] font-medium">
              {isSubMenuSiswa}
              <div className="flex flex-col">
                <div className="flex flex-row justify-between hover:cursor-pointer group/dropdown hover:text-white transition-all">
                  <p className="text-xl font-poppinsRegular">Siswa</p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#595c5f"
                    className={`${isSubMenuSiswa ? "transform rotate-180 transition-all": ""} group-hover/dropdown:fill-white `}
                  >
                    <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
                  </svg>
                </div>
                {isSubMenuSiswa && (
                  <ul className="pt-2 pl-2 gap-2 flex flex-col text-md">
                    <li className="hover:cursor-pointer hover:text-white transition-all font-poppinsRegular" onClick={() => handleNavigate("/daftarsiswa")}>
                      Daftar Siswa
                    </li>
                    <li className="hover:cursor-pointer hover:text-white transition-all font-poppinsRegular" onClick={() => handleNavigate("/daftarwalimurid")}>
                      Daftar Wali Murid
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
