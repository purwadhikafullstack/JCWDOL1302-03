'use client';

import api from '@/api/apiApp';
import React, { useState, useEffect } from 'react';

interface Category {
    id: number;
    category: string;
}

const Categories = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);
    const [newCategoryName, setNewCategoryName] = useState<string>("");
    const [newCategoryInput, setNewCategoryInput] = useState<string>("");
    const [showAddForm, setShowAddForm] = useState<boolean>(false); // State untuk menunjukkan/menyembunyikan form tambah kategori

    const getListCategories = async () => {
        try {
            const result = await api.get("/api/categories");
            setCategories(result.data.data);
            console.log(result);
        } catch (error) {
            console.error("Failed to fetch categories:", error);
        }
    };

    const deleteCategory = async (id: number) => {
        try {
            await api.delete(`/api/categories/${id}`);
            setCategories(categories.filter(category => category.id !== id));
            console.log(`Deleted category with id: ${id}`);
        } catch (error) {
            console.error("Failed to delete category:", error);
        }
    };

    const startEditing = (category: Category) => {
        setEditingCategory(category);
        setNewCategoryName(category.category);
    };

    const updateCategory = async () => {
        if (!editingCategory) return; // Safety check

        try {
            const updatedCategory = { ...editingCategory, category: newCategoryName };
            await api.patch(`/api/categories/${editingCategory.id}`, updatedCategory);
            setCategories(categories.map(category =>
                category.id === editingCategory.id ? updatedCategory : category
            ));
            setEditingCategory(null);
            setNewCategoryName("");
            console.log(`Updated category with id: ${editingCategory.id}`);
        } catch (error) {
            console.error("Failed to update category:", error);
        }
    };

    const cancelEditing = () => {
        setEditingCategory(null);
        setNewCategoryName("");
    };

    const addCategory = async () => {
        try {
            const result = await api.post("/api/categories", { category: newCategoryInput });
            const newCategory: Category = result.data.data; // Assuming API returns the new category object correctly
            setCategories([...categories, newCategory]);
            setNewCategoryInput(""); // Clear input field after adding
            setShowAddForm(false); // Hide the add form after successful addition
            console.log("Added new category:", newCategory);
        } catch (error) {
            console.error("Failed to add category:", error);
        }
    };

    useEffect(() => {
        getListCategories();
    }, []);

    return (
        <div className="flex flex-col items-center">
            <h1 className="text-2xl font-bold mb-4">List Categories</h1>

            {/* Tombol Create Category */}
            {!showAddForm && (
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
                    onClick={() => setShowAddForm(true)}
                >
                    Create Category
                </button>
            )}

            {/* Form Add Category */}
            {showAddForm && (
                <div className="mt-4 p-4 border rounded bg-gray-100 dark:bg-gray-700">
                    <h2 className="text-lg font-bold mb-2">Add New Category</h2>
                    <input
                        type="text"
                        value={newCategoryInput}
                        onChange={(e) => setNewCategoryInput(e.target.value)}
                        className="border px-2 py-1 mb-2 w-full"
                    />
                    <div className="flex justify-end">
                        <button
                            className="text-green-500 hover:underline"
                            onClick={addCategory}
                        >
                            Add
                        </button>
                        <button
                            className="text-red-500 hover:underline ml-4"
                            onClick={() => setShowAddForm(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            {/* List of Categories */}
            <div className="relative overflow-x-auto w-full lg:w-3/4 xl:w-2/3">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3 rounded-s-lg">
                                Product name
                            </th>
                            <th scope="col" className="px-6 py-3 rounded-e-lg">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((item) => (
                            <tr key={item.id} className="bg-white dark:bg-gray-800">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {item.category}
                                </th>
                                <td className="px-6 py-4">
                                    <button
                                        className="text-blue-500 hover:underline mr-4"
                                        onClick={() => startEditing(item)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="text-red-500 hover:underline"
                                        onClick={() => deleteCategory(item.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Edit Category */}
            {editingCategory && (
                <div className="mt-4 p-4 border rounded bg-gray-100 dark:bg-gray-700">
                    <h2 className="text-lg font-bold mb-2">Edit Category</h2>
                    <input
                        type="text"
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                        className="border px-2 py-1 mb-2 w-full"
                    />
                    <div className="flex justify-end">
                        <button
                            className="text-green-500 hover:underline mr-4"
                            onClick={updateCategory}
                        >
                            Save
                        </button>
                        <button
                            className="text-red-500 hover:underline"
                            onClick={cancelEditing}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}

        </div>
    );
};

export default Categories;
