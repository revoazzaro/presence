import React, { useEffect, useState } from "react";

const DaftarSiswa = () => {
  const [dataSiswa, setDataSiswa] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSiswa, setSelectedSiswa] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    async function fetchSiswa() {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_SISWA}/siswa`, {
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
        setDataSiswa(json);
      } catch (error) {
        console.error("Fetch error:", error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    if (token) {
      fetchSiswa();
    }
  }, [token]);

  if (loading)
    return (
      <div>
        <div class="loading-wave">
          <div class="loading-bar"></div>
          <div class="loading-bar"></div>
          <div class="loading-bar"></div>
          <div class="loading-bar"></div>
        </div>
      </div>
    );
  if (error) return <div>Error: {error}</div>;

  const cardSiswa = (item) => {
    setSelectedSiswa(item);
  };

  const closePop = () => {
    setSelectedSiswa(null);
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    const {
      id_jurusan,
      id_kelas,
      nis,
      nama,
      alamat,
      jenis_kelamin,
      ttl,
      tel,
      card,
    } = selectedSiswa;

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_SISWA}/siswa/${id_jurusan}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          credentials: "include",
          body: JSON.stringify({
            id_jurusan,
            id_kelas,
            nis: String(nis),
            nama,
            alamat,
            jenis_kelamin,
            ttl,
            tel: String(tel),
            card,
          }),
        }
      );

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(
          `Update failed. Status: ${res.status}, Message: ${errorText}`
        );
      }

      const updateSiswa = await res.json();

      console.log("Updated siswa data from API:", updateSiswa);

      setSelectedSiswa(updateSiswa);

      setDataSiswa((prevState) => ({
        ...prevState,
        data: prevState.data.map((siswa) =>
          siswa.nis === selectedSiswa.nis
            ? { ...selectedSiswa, ...updateSiswa }
            : siswa
        ),
      }));

      setSelectedSiswa(null);
    } catch (error) {
      console.error("Error Updating Siswa:", error.message);
    }
  };

  const filterSiswa = dataSiswa.data.filter(
    (siswa) =>
      siswa.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      siswa.nis.toString().includes(searchTerm) ||
      siswa.kelas.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                    type="search"
                    name="hs-table-search"
                    id="hs-table-search"
                    className="py-2 px-3 ps-9 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none bg-white border text-black"
                    placeholder="Cari berdasarkan NIS, Nama, dan Kelas"
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
                        Nama
                      </th>
                      <th
                        scope="col"
                        className="py-3 text-start text-xs font-medium text-gray-500 uppercase"
                      >
                        Alamat
                      </th>
                      <th
                        scope="col"
                        className="py-3 text-start text-xs font-medium text-gray-500 uppercase"
                      >
                        Jenis Kelamin
                      </th>
                      <th
                        scope="col"
                        className="pl-8 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                      >
                        Kelas
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filterSiswa.length > 0 ? (
                      filterSiswa?.map((item) => (
                        <tr
                          className="hover:bg-gray-100 hover:cursor-pointer transition-all"
                          onClick={() => cardSiswa(item)}
                          key={item.nis}
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 text-start">
                            {item.nis}
                          </td>
                          <td className="pl-3 md:px-6 py-4 text-sm min-w-52 text-gray-800 text-start whitespace-normal break-words">
                            {item.nama}
                          </td>
                          <td className="py-4 text-sm text-gray-800 text-start min-w-80 whitespace-normal break-words">
                            {item.alamat}
                          </td>
                          <td className="py-4 whitespace-nowrap text-sm text-gray-800 text-start">
                            {item.jenis_kelamin}
                          </td>
                          <td className="pl-8 pr-4 py-4 whitespace-nowrap text-sm text-gray-800 text-start">
                            {item.kelas}
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
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full">
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
              <form onSubmit={handleUpdate} className="grid grid-cols-2 gap-3">
                <div className="flex-col">
                  <label htmlFor="nama" className="text-gray-600 mb-3">
                    Nama
                  </label>
                  <input
                    className="py-2 px-3 block w-full border-gray-200 shadow-sm rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 bg-white border text-black"
                    type="text"
                    value={selectedSiswa.nama || ""}
                    onChange={(e) =>
                      setSelectedSiswa({
                        ...selectedSiswa,
                        nama: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="flex-col">
                  <label htmlFor="alamat" className="text-gray-600 mb-3">
                    Alamat
                  </label>
                  <input
                    className="py-2 px-3 block w-full border-gray-200 shadow-sm rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 bg-white border text-black"
                    type="text"
                    value={selectedSiswa.alamat || ""}
                    onChange={(e) =>
                      setSelectedSiswa({
                        ...selectedSiswa,
                        alamat: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="flex-col">
                  <label htmlFor="ttl" className="text-gray-600 mb-3">
                    TTL
                  </label>
                  <input
                    className="py-2 px-3 block w-full border-gray-200 shadow-sm rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 bg-white border text-black"
                    type="text"
                    value={selectedSiswa.ttl || ""}
                    onChange={(e) =>
                      setSelectedSiswa({
                        ...selectedSiswa,
                        ttl: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="flex-col">
                  <label htmlFor="nis" className="text-gray-600 mb-3">
                    nis
                  </label>
                  <input
                    className="py-2 px-3 block w-full border-gray-200 shadow-sm rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 bg-white border text-black"
                    type="text"
                    value={selectedSiswa.nis || ""}
                    onChange={(e) =>
                      setSelectedSiswa({
                        ...selectedSiswa,
                        nis: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="flex-col">
                  <label htmlFor="id_kelas" className="text-gray-600 mb-3">
                    Id Kelas
                  </label>
                  <input
                    className="py-2 px-3 block w-full border-gray-200 shadow-sm rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 bg-white border text-black"
                    type="text"
                    value={selectedSiswa.id_kelas || ""}
                    onChange={(e) =>
                      setSelectedSiswa({
                        ...selectedSiswa,
                        id_kelas: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="flex-col">
                  <label htmlFor="id_kelas" className="text-gray-600 mb-3">
                    Kelas
                  </label>
                  <input
                    className="py-2 px-3 block w-full border-gray-200 shadow-sm rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 bg-white border text-black"
                    type="text"
                    value={selectedSiswa.kelas || ""}
                    onChange={(e) =>
                      setSelectedSiswa({
                        ...selectedSiswa,
                        kelas: e.target.value,
                      })
                    }
                    readOnly
                  />
                </div>
                <div className="flex-col">
                  <label htmlFor="id_jurusan" className="text-gray-600 mb-3">
                    Id Jurusan
                  </label>
                  <input
                    className="py-2 px-3 block w-full border-gray-200 shadow-sm rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 bg-white border text-black"
                    type="text"
                    value={selectedSiswa.id_jurusan || ""}
                    onChange={(e) =>
                      setSelectedSiswa({
                        ...selectedSiswa,
                        id_jurusan: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="flex-col">
                  <label htmlFor="jenis_kelamin" className="text-gray-600 mb-3">
                    Jenis Kelamin
                  </label>
                  <input
                    className="py-2 px-3 block w-full border-gray-200 shadow-sm rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 bg-white border text-black"
                    type="text"
                    value={selectedSiswa.jenis_kelamin || ""}
                    onChange={(e) =>
                      setSelectedSiswa({
                        ...selectedSiswa,
                        jenis_kelamin: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="flex-col">
                  <label htmlFor="card" className="text-gray-600 mb-3">
                    Card
                  </label>
                  <input
                    className="py-2 px-3 block w-full border-gray-200 shadow-sm rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 bg-white border text-black"
                    type="text"
                    value={selectedSiswa.card || ""}
                    onChange={(e) =>
                      setSelectedSiswa({
                        ...selectedSiswa,
                        card: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="flex-col">
                  <label htmlFor="no_tel" className="text-gray-600 mb-3">
                    No Telepon
                  </label>
                  <input
                    className="py-2 px-3 block w-full border-gray-200 shadow-sm rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 bg-white border text-black [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    type="number"
                    inputMode="numeric"
                    value={selectedSiswa.tel || ""}
                    onChange={(e) =>
                      setSelectedSiswa({
                        ...selectedSiswa,
                        tel: e.target.value,
                      })
                    }
                  />
                </div>
                <button
                  type="submit"
                  className="col-span-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-64 max-w-full mx-auto justify-center"
                >
                  Update
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DaftarSiswa;
