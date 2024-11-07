"use client";

import { useState } from "react";

export default function UserProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "grcantikk",
    email: "grcantik@gmail.com",
    phone: "0822****",
    address: "Bojongsoangtos",
    bio: "_Whatever you are, Be a good one_",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const toggleEdit = () => setIsEditing(!isEditing);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <div className="w-full lg:w-1/4 p-6 bg-gray-800">
        <h2 className="text-xl font-semibold mb-6">Account Settings</h2>
        <ul className="space-y-4">
          <li className="hover:text-blue-500 cursor-pointer">Public Profile</li>
          <li className="hover:text-blue-500 cursor-pointer">Account</li>
          <li className="hover:text-blue-500 cursor-pointer">Appearance</li>
          <li className="hover:text-blue-500 cursor-pointer">Accessibility</li>
          <li className="hover:text-blue-500 cursor-pointer">Notifications</li>
          {/* Tambahkan item lain sesuai kebutuhan */}
        </ul>
      </div>

      {/* Konten Utama Profil */}
      <div className="flex-grow p-6">
        <div className="flex flex-col lg:flex-row lg:justify-between items-start lg:items-center mb-8">
          <h1 className="text-2xl font-bold text-white mb-4 lg:mb-0">Public Profile</h1>
          <button
            type="button"
            onClick={toggleEdit}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all"
          >
            {isEditing ? "Selesai" : "Edit Profil"}
          </button>
        </div>

        {/* Foto Profil dan Informasi */}
        <div className="flex flex-col lg:flex-row items-start lg:space-x-8">
          {/* Foto Profil */}
          <div className="flex-shrink-0 mb-6 lg:mb-0">
            <img
              src="/profile.jpg" // Ganti dengan URL gambar profil Anda
              alt="Foto Profil"
              className="w-36 h-36 rounded-full border-2 border-gray-300"
            />
            {isEditing && (
              <button className="mt-2 text-blue-500 hover:underline">Edit</button>
            )}
          </div>

          {/* Informasi Profil */}
          <div className="flex-grow space-y-4 w-full">
            <div>
              <label className="block text-sm font-medium text-gray-400">Nama</label>
              <p className="text-lg font-semibold">
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    className="w-full px-4 py-2 border border-gray-700 bg-gray-800 rounded-lg mt-1 focus:outline-none focus:border-blue-500"
                    value={profile.name}
                    onChange={handleInputChange}
                  />
                ) : (
                  profile.name
                )}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400">Bio</label>
              <p className="text-gray-300">
                {isEditing ? (
                  <textarea
                    name="bio"
                    className="w-full px-4 py-2 border border-gray-700 bg-gray-800 rounded-lg mt-1 focus:outline-none focus:border-blue-500"
                    rows="3"
                    value={profile.bio}
                    onChange={handleInputChange}
                  />
                ) : (
                  profile.bio
                )}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400">Email</label>
              <p className="text-gray-300">
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    className="w-full px-4 py-2 border border-gray-700 bg-gray-800 rounded-lg mt-1 focus:outline-none focus:border-blue-500"
                    value={profile.email}
                    onChange={handleInputChange}
                  />
                ) : (
                  profile.email
                )}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400">Nomor Telepon</label>
              <p className="text-gray-300">
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    className="w-full px-4 py-2 border border-gray-700 bg-gray-800 rounded-lg mt-1 focus:outline-none focus:border-blue-500"
                    value={profile.phone}
                    onChange={handleInputChange}
                  />
                ) : (
                  profile.phone
                )}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400">Alamat</label>
              <p className="text-gray-300">
                {isEditing ? (
                  <input
                    type="text"
                    name="address"
                    className="w-full px-4 py-2 border border-gray-700 bg-gray-800 rounded-lg mt-1 focus:outline-none focus:border-blue-500"
                    value={profile.address}
                    onChange={handleInputChange}
                  />
                ) : (
                  profile.address
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
