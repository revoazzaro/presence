import React, { useState } from "react";
import { format } from "date-fns";
import { id } from "date-fns/locale";

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

const Download = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [dates, setDates] = useState([]);

  const handleYearChange = (e) => {
    setSelectedYear(Number(e.target.value));
    updateDates(selectedMonth, Number(e.target.value));
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(Number(e.target.value));
    updateDates(Number(e.target.value), selectedYear);
  };

  const updateDates = (month, year) => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const newDates = [];

    for (let i = 1; i <= daysInMonth; i++) {
      newDates.push(new Date(year, month, i));
    }

    setDates(newDates);
  };

  return (
    <>
      <div className="bg-[#fefefe] mt-12 shadow-xl rounded-lg border-[#c1c1c1] border-[1px] transition-all min-h-full font-poppinsRegular">
        <div className="container mx-auto p-8 text-black">
          <h1 className="text-center text-3xl font-poppinsSemiBold mb-4">
            Pilih Tahun dan Bulan
          </h1>
          <div className="flex justify-center mb-4 gap-4">
            <select
              value={selectedMonth}
              onChange={handleMonthChange}
              className="p-2 border border-gray-300 rounded-md text-block bg-white"
            >
              {months.map((month, index) => (
                <option key={index} value={index}>
                  {month}
                </option>
              ))}
            </select>
            <input
              type="number"
              value={selectedYear}
              onChange={handleYearChange}
              className="p-2 border border-gray-300 rounded-md text-block bg-white"
              min="2024"
              max="2024"
            />
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 gap-x-8 gap-y-4 justify-center">
            {dates.map((date, index) => (
              <div
                key={index}
                className="bg-gray-100 p-4 rounded-lg shadow-md text-center font-semibold hover:bg-white hover:border-[1px] cursor-pointer transition-all"
              >
                {format(date, "dd", { locale: id })}
              </div>
            ))}
          </div>
        </div>
        <div className="w-full justify-center items-center mb-6 flex">
          <button
            type="button"
            className="text-white py-3 px-5 rounded-full bg-slate-950 hover:bg-slate-700 flex gap-2 text-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#e8eaed"
            >
              <path d="M260-160q-91 0-155.5-63T40-377q0-78 47-139t123-78q17-72 85-137t145-65q33 0 56.5 23.5T520-716v242l64-62 56 56-160 160-160-160 56-56 64 62v-242q-76 14-118 73.5T280-520h-20q-58 0-99 41t-41 99q0 58 41 99t99 41h480q42 0 71-29t29-71q0-42-29-71t-71-29h-60v-80q0-48-22-89.5T600-680v-93q74 35 117 103.5T760-520q69 8 114.5 59.5T920-340q0 75-52.5 127.5T740-160H260Zm220-358Z" />
            </svg>
            Download
          </button>
        </div>
      </div>
    </>
  );
};

export default Download;

{
  /* <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#000000"
            >
              <path d="M260-160q-91 0-155.5-63T40-377q0-78 47-139t123-78q17-72 85-137t145-65q33 0 56.5 23.5T520-716v242l64-62 56 56-160 160-160-160 56-56 64 62v-242q-76 14-118 73.5T280-520h-20q-58 0-99 41t-41 99q0 58 41 99t99 41h480q42 0 71-29t29-71q0-42-29-71t-71-29h-60v-80q0-48-22-89.5T600-680v-93q74 35 117 103.5T760-520q69 8 114.5 59.5T920-340q0 75-52.5 127.5T740-160H260Zm220-358Z" />
            </svg>
            <div className="items-center text-center text-black">Download</div> */
}
