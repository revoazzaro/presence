import { useEffect, useState } from "react";

const DaftarHadir = () => {
  const [dataKelas, setDataKelas] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    async function fetchKelas() {
      try {
        console.log("Token:", token);

        const res = await fetch(`${import.meta.env.VITE_API_SISWA}/kelas`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          credentials: "include",
        });

        if (!res.ok) {
          const errorText = await res.text();
          console.error("API Error:", errorText);
          throw new Error(
            `Network response was not ok. Status: ${res.status}, Message: ${errorText}`
          );
        }

        const json = await res.json();
        setDataKelas(json);
      } catch (error) {
        console.error("Fetch error:", error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchKelas();
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
                    className="py-2 px-3 ps-9 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none bg-white border text-black font-poppinsRegular"
                    placeholder="Search for items"
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
              <div className="relative">
                <table className="text-left w-full divide-y divide-gray-200 table-fixed font-poppinsRegular">
                  <thead className="bg-gray-50 justify-between ml-10">
                    <tr>
                      <th
                        scope="col"
                        className="pl-3 md:px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase"
                        >
                        id jurusan
                      </th>
                      <th
                        scope="col"
                        className="text-xs text-center font-medium text-gray-500 uppercase"
                        >
                        id kelas
                      </th>
                      <th
                        scope="col"
                        className="md:px-6 px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase"
                        >
                        kelas
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {dataKelas.data.map((item) => (
                      <tr
                        className="hover:bg-gray-100 hover:cursor-pointer transition-all"
                        key={item.kelas}
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium text-gray-800">
                          {item.id_jurusan}
                        </td>
                        <td className="pl-3 md:px-6 py-4 text-sm text-center min-w-52 text-gray-800 whitespace-normal break-words">
                          {item.id_kelas}
                        </td>
                        <td className="py-4 text-sm text-gray-800 text-center min-w-80 whitespace-normal break-words">
                          {item.kelas}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DaftarHadir;
