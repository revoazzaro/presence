import React, { useEffect, useState } from "react";

const DaftarWaliMurid = () => {
  const [dataWali, setDataWali] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSiswa, setSelectedSiswa] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    async function fetchSiswa() {
      try {
        console.log("Token:", token);

        const res = await fetch(
          `${import.meta.env.VITE_API_SISWA}/wali-murid`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
            credentials: "include",
          }
        );

        if (!res.ok) {
          const errorText = await res.text();
          console.error("API Error:", errorText);
          throw new Error(
            `Network response was not ok. Status: ${res.status}, Message: ${errorText}`
          );
        }

        const json = await res.json();
        setDataWali(json);
      } catch (error) {
        console.error("Fetch error:", error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchSiswa();
  }, [token]);

  if (loading) return <div>
    <div>
      <div className="loading-wave">
        <div className="loading-bar"></div>
        <div className="loading-bar"></div>
        <div className="loading-bar"></div>
        <div className="loading-bar"></div>
      </div>
    </div>
  </div>;
  if (error) return <div>Error: {error}</div>;

  const cardSiswa = (item) => {
    setSelectedSiswa(item);
  };

  const closePop = () => {
    setSelectedSiswa(null);
  };

  const filterWaliMurid = dataWali.data.filter((wali) => 
    wali.nama?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    wali.nis.toString().includes(searchTerm) ||
    wali.siswa.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <>
      <div className="flex flex-col mt-12">
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="border rounded-lg divide-y divide-gray-200">
              <div className="py-3 px-4">
                <div className="relative max-w-xs">
                  <label htmlFor="hs-table-search" className="sr-only">
                    Search
                  </label>
                  <input
                    type="text"
                    name="hs-table-search"
                    id="hs-table-search"
                    className="py-2 px-3 ps-9 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none bg-white border text-black"
                    placeholder="Search for items"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-3">
                    <svg
                      className="size-4 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="11" cy="11" r="8"></circle>
                      <path d="m21 21-4.3-4.3"></path>
                    </svg>
                  </div>
                </div>
              </div>
              <div className="overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                      >
                        NIS
                      </th>
                      <th
                        scope="col"
                        className="md:px-6 px-3 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                      >
                        Nama siswa
                      </th>
                      <th
                        scope="col"
                        className="py-3 text-start text-xs font-medium text-gray-500 uppercase"
                      >
                        kelas
                      </th>
                      <th
                        scope="col"
                        className="py-3 text-start text-xs font-medium text-gray-500 uppercase"
                      >
                        nama wali
                      </th>
                      <th
                        scope="col"
                        className="py-3 text-start text-xs font-medium text-gray-500 uppercase"
                      >
                        no telepon
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filterWaliMurid.length > 0 ? (
                      filterWaliMurid.map((item) => (
                        <tr
                        className="hover:bg-gray-100 hover:cursor-pointer transition-all"
                        onClick={() => cardSiswa(item)}
                        key={item.nis}
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 text-start">
                          {item.nis}
                        </td>
                        <td className="pl-3 md:px-6 py-4 text-sm max-w-52 text-gray-800 text-start whitespace-normal break-words">
                          {item.siswa}
                        </td>
                        <td className="py-4 text-sm text-gray-800 text-start min-w-32 whitespace-normal break-words">
                          {item.kelas}
                        </td>
                        <td className="py-4 whitespace-nowrap text-sm text-gray-800 text-start">
                          {item.nama ? item.nama : "-"}
                        </td>
                        <td className="whitespace-nowrap text-sm text-gray-800 text-start">
                          {item.tel ? item.tel : "-"}
                        </td>
                      </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="6"
                          className="text-center py-4 text-sm text-gray-500"
                        >
                          Tidak ada data yang sesuai dengan pencarian.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        {selectedSiswa && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
              <button
                className="text-gray-500 hover:text-gray-700 float-right"
                onClick={closePop}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#b9bbbd"
                >
                  <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                </svg>
              </button>
              <div className="text-center">
                <h2 className="text-xl text-gray-600 font-bold mb-2 pl-6 text-center">
                  {selectedSiswa.nama ? selectedSiswa.nama : "-"}
                </h2>
                <p className="text-gray-600 mb-3 text-center">{selectedSiswa.tel ? selectedSiswa.tel : "-"}</p>
                <tr>
                  <td className="text-gray-600 mb-3 text-start">Nama Siswa</td>
                  <td className="text-gray-600 mb-3 text-start pl-4 whitespace-normal break-words ml-2">
                    {selectedSiswa.siswa}
                  </td>
                </tr>
                <tr>
                  <td className="text-gray-600 mb-3 text-start">NIS</td>
                  <td className="text-gray-600 mb-3 text-start pl-4 whitespace-normal break-words ml-2">
                    {selectedSiswa.nis}
                  </td>
                </tr>
                <tr>
                  <td className="text-gray-600 mb-3 text-start">
                    Kelas
                  </td>
                  <td className="text-gray-600 mb-3 text-start pl-4">
                    {selectedSiswa.kelas}
                  </td>
                </tr>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                  onClick={closePop}
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DaftarWaliMurid;
