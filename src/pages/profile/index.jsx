import React, { useState, useEffect } from "react";

const ProfileItem = ({ label, value }) => {
  return (
    <li className="py-3 sm:py-4">
      <div className="flex items-center">
        <div className="flex-1 min-w-0 ms-4">
          <p className="text-sm font-medium text-gray-900 truncate ">
            {label} :
          </p>
        </div>
        <div className="inline-flex items-center text-base font-semibold text-gray-900">
          {value}
        </div>
      </div>
    </li>
  );
};

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    async function fetchProfile() {
      try {
        console.log("Token:", token);

        const res = await fetch(`${import.meta.env.VITE_API_SISWA}/me`, {
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
        console.log("Profile data:", json);
        setProfileData(json);
      } catch (error) {
        console.error("Fetch error:", error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
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
      <div className="w-full mx-auto h-76 max-w-md mt-12 p-4 bg-[#fefefe] border border-gray-200 rounded-lg shadow sm:p-8">
        <div className="flex items-center justify-between mb-4">
          <p className="text-2xl font-bold leading-none text-gray-900">
            Profile
          </p>
        </div>
        <div className="flow-root">
          <ul role="list" className="divide-y divide-gray-200">
            {!!profileData.data.username ? (
              <ProfileItem
                label={"Username"}
                value={profileData.data.username}
              />
            ) : null}
            {!!profileData.data.nama ? (
              <ProfileItem label={"Nama"} value={profileData.data.nama} />
            ) : null}
            {!!profileData.data.nis ? (
              <ProfileItem label={"NIS"} value={profileData.data.nis} />
            ) : null}
            {!!profileData.data.tel ? (
              <ProfileItem label={"No. Telpon"} value={profileData.data.tel} />
            ) : null}
            {!!profileData.data.kelas ? (
              <ProfileItem label={"Kelas"} value={profileData.data.kelas} />
            ) : null}
            {!!profileData.data.ttl ? (
              <ProfileItem label={"TTL"} value={profileData.data.ttl} />
            ) : null}
            {!!profileData.data.role ? (
              <ProfileItem label={"Role"} value={profileData.data.role} />
            ) : null}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Profile;
