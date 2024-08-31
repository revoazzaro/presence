import React from "react";

const Table = ({ data }) => {

  return (
    <>
      <div className="overflow-x-auto bg-white text-black p-5 rounded-md">
        <table className="text-left md:text-sm text-xs">
          <thead className="uppercase tracking-wider border-b-2 border-t">
            <tr>
              <th scope="col" className="px-6 py-3 border-x w-1/12">
                NIS
              </th>
              <th scope="col" className="px-6 py-3 border-x w-3/12">
                Nama
              </th>
              <th scope="col" className="px-6 py-3 border-x w-6/12">
                Alamat
              </th>
              <th scope="col" className="px-6 py-3 border-x">
                J.K
              </th>
              <th scope="col" className="px-6 py-3 border-x w-full">
                Kelas
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((siswa) => (
              <tr className="border-black  hover:bg-neutral-100">
                <td scope="row" className="px-6 py-3 border-x ">
                  {siswa}
                </td>
                <td className="px-6 py-3 border-x ">{siswa}</td>
                <td className="px-6 py-3 border-x ">{siswa}</td>
                <td className="px-6 py-3 border-x ">{siswa}</td>
                <td className="px-6 py-3 border-x ">{siswa}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
