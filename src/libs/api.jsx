export const ApiSiswa = async (path) => {
    const res = await fetch(`${import.meta.env.VITE_API_SISWA}/${path}`);
    const data = await res.json();
    return data
}