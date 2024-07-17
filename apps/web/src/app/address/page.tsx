'use client';

import api from '@/api/apiApp';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { FaAddressBook, FaTrash, FaEdit } from 'react-icons/fa';

// Interface untuk data alamat
interface Address {
  id: string;
  city: string;
  postalCode: string;
  country: string;
  province: string;
  subdistrict: string;
  address: string;
  isPrimary: boolean;
}

const Address: React.FC = () => {
  const [address, setAddress] = useState<Address[]>([]);
  const [city, setCity] = useState('');
  const [editAddress, setEditAddress] = useState<Address | null>(null); // State untuk menyimpan data alamat yang sedang diedit
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null); // State untuk menyimpan data alamat yang sedang ditampilkan detailnya

  // Fungsi untuk mengambil daftar alamat dari API
  const getListAddress = async () => {
    try {
      const result = await api.get('/api/address');
      setAddress(result.data.data);
    } catch (error) {
      console.error('Error fetching address:', error);
    }
  };

  // Memanggil getListAddress saat komponen dimuat
  useEffect(() => {
    getListAddress();
  }, []);

  // Fungsi untuk menghapus alamat
  const handleDeleteAddress = async (id: string) => {
    try {
      await api.delete(`/api/address/${id}`);
      // Update local state after deletion
      const updatedAddress = address.filter((item) => item.id !== id);
      setAddress(updatedAddress);
      console.log('Address deleted successfully!');
    } catch (error) {
      console.error('Error deleting address:', error);
    }
  };

  // Fungsi untuk menyiapkan data alamat yang akan diedit
  const handleEditAddress = (item: Address) => {
    setEditAddress(item);
  };

  // Fungsi untuk mengubah nilai input dalam form edit
  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editAddress) {
      const { name, value } = e.target;
      setEditAddress({ ...editAddress, [name]: value });
    }
  };

  // Fungsi untuk menyimpan perubahan pada alamat yang diedit
  const handleSubmitEdit = async () => {
    try {
      if (editAddress) {
        await api.patch(`/api/address/${editAddress.id}`, editAddress);
        // Update local state after edit
        const updatedAddress = address.map((item) =>
          item.id === editAddress.id ? editAddress : item,
        );
        setAddress(updatedAddress);
        console.log('Address updated successfully!');
        setEditAddress(null); // Menutup form edit setelah disimpan
      }
    } catch (error) {
      console.error('Error updating address:', error);
    }
  };

  // Fungsi untuk menampilkan detail alamat
  const handleShowAddressDetail = (item: Address) => {
    setSelectedAddress(item);
  };

  // Fungsi untuk menampilkan Update AKifasi alamat
  const handleUpdateStatus = async (item: Address) => {
    try {
      await api.patch(`/api/address/status/${item.id}`, { isPrimary: true });
      // Update local state after edit

      localStorage.setItem('city', item.city);
      await getListAddress();
    } catch (error) {
      console.error('Error updating address:', error);
    }
  };

  // Fungsi untuk menangani klik pada kota
  const handleCityClick = (item: Address) => {
    localStorage.setItem('city', item.city);
    setCity(item.city);
  };

  return (
    <div className="flex flex-col items-center mt-12">
      {/* jumlah address {address.length} */}
      <div className="flex flex-row flex-wrap justify-center w-full mb-6">
        {address.map((item, index) => (
          <div key={index} className="flex justify-center mb-6">
            <div className="hover:bg-gray-100 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-4">
              <div
                className="w-7 h-7 text-gray-500 dark:text-gray-400 mb-3"
                aria-hidden="true"
              >
                <FaAddressBook size={30} />
              </div>
              <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                {item.province}{' '}
              </h5>
              <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
                {item.city}
              </p>
              <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
                {item.subdistrict}
              </p>
              <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
                {item.postalCode}
              </p>
              <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
                {item.address}
              </p>
              <div className="flex justify-between items-center mt-4">
                <div className="flex space-x-4">
                  <button
                    onClick={() => {
                      handleEditAddress(item);
                    }}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <FaEdit size={20} />
                  </button>
                  <button
                    onClick={() => {
                      handleDeleteAddress(item.id);
                    }}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash size={20} />
                  </button>
                  <button
                    onClick={() => {
                      handleShowAddressDetail(item);
                    }}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    View Detail
                  </button>
                  {!item.isPrimary ? (
                    <button
                      onClick={() => {
                        handleUpdateStatus(item);
                      }}
                    >
                      Aktifkan
                    </button>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <a
        href={'/addAddress'}
        className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
      >
        Add Address
      </a>

      {/* Modal/Edit Form */}
      {editAddress && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-xl font-semibold mb-4">Edit Address</h2>
            <div className="mb-4">
              <label
                htmlFor="editCountry"
                className="block text-sm font-medium text-gray-700"
              >
                Country
              </label>
              <input
                type="text"
                id="editCountry"
                name="country"
                value={editAddress.country}
                onChange={handleEditInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="editProvince"
                className="block text-sm font-medium text-gray-700"
              >
                Province
              </label>
              <input
                type="text"
                id="editProvince"
                name="province"
                value={editAddress.province}
                onChange={handleEditInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="editCity"
                className="block text-sm font-medium text-gray-700"
              >
                City
              </label>
              <input
                type="text"
                id="editCity"
                name="city"
                value={editAddress.city}
                onChange={handleEditInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="editSubdistrict"
                className="block text-sm font-medium text-gray-700"
              >
                Subdistrict
              </label>
              <input
                type="text"
                id="editSubdistrict"
                name="subdistrict"
                value={editAddress.subdistrict}
                onChange={handleEditInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="editPostalCode"
                className="block text-sm font-medium text-gray-700"
              >
                PostalCode
              </label>
              <input
                type="text"
                id="editPostalCode"
                name="postalCode"
                value={editAddress.postalCode}
                onChange={handleEditInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleSubmitEdit}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setEditAddress(null);
                }}
                className="ml-2 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal/Detail Address */}
      {selectedAddress && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-xl font-semibold mb-4">Address Detail</h2>
            <p className="mb-2">
              <span className="font-semibold">Country:</span>{' '}
              {selectedAddress.country}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Province:</span>{' '}
              {selectedAddress.province}
            </p>
            <p className="mb-2">
              <span className="font-semibold">City:</span>{' '}
              {selectedAddress.city}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Subdistrict:</span>{' '}
              {selectedAddress.subdistrict}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Postal Code:</span>{' '}
              {selectedAddress.postalCode}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Address:</span>{' '}
              {selectedAddress.address}
            </p>

            <div className="flex justify-end">
              <button
                onClick={() => {
                  setSelectedAddress(null);
                }}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Address;
