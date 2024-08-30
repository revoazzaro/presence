// src/components/Absensi.jsx
import React, { useState } from "react";
import { format } from "date-fns";

const months = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

const currentYear = new Date().getFullYear();

const Absensi = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [dates, setDates] = useState([]);

  const handleMonthChange = (e) => {
    setSelectedMonth(Number(e.target.value));
    updateDates(Number(e.target.value));
  };

  const updateDates = (month) => {
    const daysInMonth = new Date(currentYear, month + 1, 0).getDate();
    const newDates = [];

    for (let i = 1; i <= daysInMonth; i++) {
      newDates.push(new Date(currentYear, month, i));
    }

    setDates(newDates);
  };

  return (
    <>
      <div className=" bg-[#fefefe] mt-12 shadow-xl rounded-md border-[#000] border-[1px] transition-all min-h-full">
          <div className="container mx-auto p-8 text-black">
          <h1 className="text-center text-3xl font-bold mb-4">Pilih Bulan</h1>
          <div className="flex justify-center mb-4">
            <select
              value={selectedMonth}
              onChange={handleMonthChange}
              className="p-2 border border-gray-300 rounded-md text-block bg-white"
            >
              {months.map((month, index) =>  (
                <option key={index} value={index}>
                  {month}
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-7 gap-x-10 gap-y-4 mt-4 justify-center text-center items-center cursor-pointer">
            {dates.map((date, index) => (
              <div
                key={index}
                className="bg-gray-100 p-3 rounded-lg shadow-md text-center font-semibold hover:bg-white hover:border-[1px] "
              >
                {format(date, "dd")}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Absensi;
