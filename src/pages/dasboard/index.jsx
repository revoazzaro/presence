import React, { useEffect, useState } from "react";
import LineChart from "../../components/chart";

const Dashboard = ({ isOpen }) => {
  const [dataSiswa, setDataSiswa] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    async function fetchSiswa() {
      try {
        console.log("Token:", token);

        const res = await fetch(`${import.meta.env.VITE_API_SISWA}/featured`, {
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

    fetchSiswa();
  }, [token]);

  if (loading)
    return (
      <div>
        <div>
          <div className="loading-wave">
            <div className="loading-bar"></div>
            <div className="loading-bar"></div>
            <div className="loading-bar"></div>
            <div className="loading-bar"></div>
          </div>
        </div>
      </div>
    );
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div className={`${isOpen ? "ml-52" : ""}`}>
        <div className="text-black pt-12 bottom-0">
          <div className="text-3xl font-semibold">Dashboard</div>
          <div className="flex flex-wrap w-full gap-x-3 gap-y-4 mt-8">
            <div className="md:w-[49%] w-full bg-[#ffffff] md:h-28 h-20 shadow-lg border-[1px] rounded-lg items-center flex justify-between">
              <div className="justify-between w-full">
                <div className="items-center justify-between px-4 flex">
                  <div className="text-lg">
                    <p>Siswa Terdaftar</p>
                    <p className="font-semibold">
                      {dataSiswa.data.siswa_count}
                    </p>
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="48px"
                    viewBox="0 -960 960 960"
                    width="48px"
                    fill="#000000"
                  >
                    <path d="M0-240v-53q0-38.57 41.5-62.78Q83-380 150.38-380q12.16 0 23.39.5t22.23 2.15q-8 17.35-12 35.17-4 17.81-4 37.18v65H0Zm240 0v-65q0-32 17.5-58.5T307-410q32-20 76.5-30t96.5-10q53 0 97.5 10t76.5 30q32 20 49 46.5t17 58.5v65H240Zm540 0v-65q0-19.86-3.5-37.43T765-377.27q11-1.73 22.17-2.23 11.17-.5 22.83-.5 67.5 0 108.75 23.77T960-293v53H780ZM149.57-410q-28.57 0-49.07-20.56Q80-451.13 80-480q0-29 20.56-49.5Q121.13-550 150-550q29 0 49.5 20.5t20.5 49.93q0 28.57-20.5 49.07T149.57-410Zm660 0q-28.57 0-49.07-20.56Q740-451.13 740-480q0-29 20.56-49.5Q781.13-550 810-550q29 0 49.5 20.5t20.5 49.93q0 28.57-20.5 49.07T809.57-410ZM480-480q-50 0-85-35t-35-85q0-51 35-85.5t85-34.5q51 0 85.5 34.5T600-600q0 50-34.5 85T480-480Z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="md:w-[49%] w-full bg-[#ffffff] md:h-28 h-20 shadow-lg border-[1px] rounded-lg items-center flex justify-between">
              <div className="justify-between w-full">
                <div className="items-center justify-between px-4 flex">
                  <div className="text-lg">
                    <p>Siswa Hadir</p>
                    <p className="font-semibold">
                      {dataSiswa.data.presenced_count}
                    </p>
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="48px"
                    viewBox="0 -960 960 960"
                    width="48px"
                    fill="#000000"
                  >
                    <path d="M0-240v-53q0-38.57 41.5-62.78Q83-380 150.38-380q12.16 0 23.39.5t22.23 2.15q-8 17.35-12 35.17-4 17.81-4 37.18v65H0Zm240 0v-65q0-32 17.5-58.5T307-410q32-20 76.5-30t96.5-10q53 0 97.5 10t76.5 30q32 20 49 46.5t17 58.5v65H240Zm540 0v-65q0-19.86-3.5-37.43T765-377.27q11-1.73 22.17-2.23 11.17-.5 22.83-.5 67.5 0 108.75 23.77T960-293v53H780ZM149.57-410q-28.57 0-49.07-20.56Q80-451.13 80-480q0-29 20.56-49.5Q121.13-550 150-550q29 0 49.5 20.5t20.5 49.93q0 28.57-20.5 49.07T149.57-410Zm660 0q-28.57 0-49.07-20.56Q740-451.13 740-480q0-29 20.56-49.5Q781.13-550 810-550q29 0 49.5 20.5t20.5 49.93q0 28.57-20.5 49.07T809.57-410ZM480-480q-50 0-85-35t-35-85q0-51 35-85.5t85-34.5q51 0 85.5 34.5T600-600q0 50-34.5 85T480-480Z" />
                  </svg>
                </div>
              </div>
            </div>
            {dataSiswa.data.last_week_presence ? (
              <div className="w-full md:h-72 h-96">
                <LineChart presenceData={dataSiswa.data.last_week_presence} />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
