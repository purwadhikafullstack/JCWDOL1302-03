'use client';

import api from '@/api/apiApp';
import Container from '@/components/Container';
import React, { useState, useEffect } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { GoTrash } from 'react-icons/go';

interface Role {
  id: number;
  role: string;
}

const Role = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [newRoleName, setNewRoleName] = useState<string>('');
  const [newRoleInput, setNewRoleInput] = useState<string>('');
  const [showAddForm, setShowAddForm] = useState<boolean>(false); // State untuk menunjukkan/menyembunyikan form tambah role

  const getListRoles = async () => {
    try {
      const result = await api.get('/api/role');
      setRoles(result.data.data);
      console.log(result);
    } catch (error) {
      console.error('Failed to fetch Roles:', error);
    }
  };

  const deleteRoles = async (id: number) => {
    try {
      await api.delete(`/api/role/${id}`);
      setRoles(roles.filter((role) => role.id !== id));
      console.log(`Deleted role with id: ${id}`);
    } catch (error) {
      console.error('Failed to delete role:', error);
    }
  };

  const startEditing = (role: Role) => {
    setEditingRole(role);
    setNewRoleName(role.role);
  };

  const addRole = async () => {
    try {
      const result = await api.post('/api/role', {
        role: newRoleInput,
      });
      const newRole: Role = result.data.data; // Assuming API returns the new role object correctly
      setRoles([...roles, newRole]);
      setNewRoleInput(''); // Clear input field after adding
      setShowAddForm(false); // Hide the add form after successful addition
      console.log('Added new role:', newRole);
    } catch (error) {
      console.error('Failed to add role:', error);
    }
  };

  useEffect(() => {
    getListRoles();
  }, []);

  return (
    <Container>
      <div className="mt-10">
        <div className="grid grid-cols-1 mb-6 sm:grid-cols-2">
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-gray-900">
              Role
              <a className="text-accentDark"> Management</a>
            </h1>
          </div>
          {/* Tombol Create Role */}
          <div className=" md:justify-self-end">
            {!showAddForm && (
              <button
                className="bg-accentDark hover:bg-accent text-white font-bold py-2 px-4 rounded mb-4"
                onClick={() => setShowAddForm(true)}
              >
                Create Role
              </button>
            )}

            {/* Form Add Category */}
            {showAddForm && (
              <div className="mt-4 p-4 border rounded bg-white dark:bg-white border-accentDark">
                <h2 className="text-lg font-bold mb-2 text-accentDark">
                  Add New Role
                </h2>
                <input
                  type="text"
                  value={newRoleInput}
                  onChange={(e) => setNewRoleInput(e.target.value)}
                  className="border px-2 py-1 mb-2 w-full"
                />
                <div className="flex justify-end">
                  <button
                    className="text-accent hover:underline"
                    onClick={addRole}
                  >
                    Add
                  </button>
                  <button
                    className="text-cheeryred hover:underline ml-4"
                    onClick={() => setShowAddForm(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center">
        {/* List of Roles */}
        <div className="relative overflow-x-auto w-full lg:w-3/4 xl:w-2/3">
          <table className="w-full text-sm text-left rtl:text-right divide-y">
            <thead className="text-xs text-white uppercase bg-accent">
              <tr>
                <th scope="col" className="px-6 py-3 ">
                  Role
                </th>
                <th scope="col" className="px-6 py-3 ">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {roles.map((item) => (
                <tr key={item.id} className="bg-white ">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black"
                  >
                    {item.role}
                  </th>
                  <td className="px-6 py-4 space-x-2">
                    <button
                      className="bg-cheeryred hover:bg-[#ff2b2bec] text-white font-bold py-2 px-4 rounded"
                      onClick={() => deleteRoles(item.id)}
                    >
                      <GoTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Container>
  );
};

export default Role;
