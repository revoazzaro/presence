import Table from "../../components/table";
import useSWRImmutable from "swr/immutable";

const fetcher = (...args) => fetch(...args).then(r => r.json());

const DaftarHadir = () => {
  const apiUrl = `${import.meta.env.VITE_API_SISWA}/kelas`;

  const { data, error, isLoading } = useSWRImmutable(apiUrl, fetcher);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Failed to load: {error.message}</div>;
  console.log(data);

  return (
    <>
      <div className=" bg-[#fefefe] mt-12 shadow-md rounded-md border-[#000] border-[1px] transition-all">
        <div className="md:flex flex-none text-black p-3 md:text-lg text-md font-semibold bg-[#f5f5f5] w-full rounded-t-md border-b-[1px] border-black md:justify-between justify-normal">
          <div className="flex gap-2 text-center items-center md:text-base text-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#000000"
            >
              <path d="M280-400v-80h400v80H280Zm0 160v-80h280v80H280ZM200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Z" />
            </svg>
            <div className="items-center text-center">
              Daftar Kehadiran Siswa
            </div>
          </div>
          <div className="flex items-center md:w-64 w-full md:mt-0 mt-3 rounded-lg py-2 pl-3 pr-4 text-sm bg-[#f5f5f5] border-[1px]">
            <span className="pointer-events-none flex-shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-4 w-4 text-neutral-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </span>
            <input
              id="inputSearch"
              type="text"
              placeholder="Cari..."
              className="pl-3 w-full bg-[#f5f5f5] outline-none"
            />
          </div>
        </div>
        {data.map((d) => (
          console.log(d)
        ))}
      </div>
    </>
  );
};

export default DaftarHadir;
