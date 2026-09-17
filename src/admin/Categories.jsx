import React, { useState } from 'react';
import { Plus, Edit, Trash2, Layers } from 'lucide-react';
import { useCategories } from '../hooks/useCategories';
import { Modal } from '../components/Modal';
import { Toast } from '../components/Toast';

export function Categories() {
  const { categories, addCategory, updateCategory, deleteCategory } = useCategories();
  
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleOpenAdd = () => {
    setEditingCategory(null);
    setName('');
    setDescription('');
    setModalOpen(true);
  };

  const handleOpenEdit = (cat) => {
    setEditingCategory(cat);
    setName(cat.name);
    setDescription(cat.description || '');
    setModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) return;

    if (editingCategory) {
      updateCategory(editingCategory.id, { name, description });
      setToastMessage(`Category "${name}" updated.`);
    } else {
      addCategory({ name, description });
      setToastMessage(`Category "${name}" created.`);
    }
    setModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    if (deleteId) {
      deleteCategory(deleteId);
      setDeleteId(null);
      setToastMessage("Category removed.");
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Toast
        isOpen={!!toastMessage}
        message={toastMessage}
        type="success"
        onClose={() => setToastMessage('')}
      />

      <div className="bg-white border border-gray-200 p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-[#0B1F3A] uppercase tracking-wide">
            Category Management
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Organize stationery lines (Pens, Notebooks, Geometry, School Essentials, etc.).
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-1.5 bg-[#0B1F3A] text-white text-xs font-bold px-4 py-2 hover:bg-[#071325]"
        >
          <Plus className="w-4 h-4" />
          <span>Add Category</span>
        </button>
      </div>

      <div className="bg-white border border-gray-200 shadow-xs overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#F8F8F6] text-gray-600 font-bold uppercase tracking-wider border-b border-gray-200">
            <tr>
              <th className="p-3.5">Category Name</th>
              <th className="p-3.5">Slug</th>
              <th className="p-3.5">Description</th>
              <th className="p-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 font-medium">
            {categories.map((cat) => (
              <tr key={cat.id} className="hover:bg-gray-50">
                <td className="p-3.5 font-bold text-[#0B1F3A]">{cat.name}</td>
                <td className="p-3.5 font-mono text-gray-500">{cat.slug}</td>
                <td className="p-3.5 text-gray-600 max-w-xs truncate">{cat.description}</td>
                <td className="p-3.5 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => handleOpenEdit(cat)}
                      className="p-1 text-gray-500 hover:text-blue-600"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setDeleteId(cat.id)}
                      className="p-1 text-gray-500 hover:text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add / Edit Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingCategory ? "Edit Category" : "Add New Category"}
      >
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-gray-700 uppercase tracking-wider mb-2">
              Category Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Calligraphy & Inks"
              className="w-full p-2.5 bg-[#F8F8F6] border border-gray-200 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-gray-700 uppercase tracking-wider mb-2">
              Description
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description for category landing page..."
              className="w-full p-2.5 bg-[#F8F8F6] border border-gray-200 focus:outline-none resize-none"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="px-4 py-2 border text-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#0B1F3A] text-white font-bold"
            >
              Save Category
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Modal */}
      <Modal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        title="Confirm Category Deletion"
      >
        <div className="space-y-4 text-xs">
          <p className="text-gray-600">Are you sure you want to delete this category?</p>
          <div className="flex justify-end gap-3 pt-2">
            <button onClick={() => setDeleteId(null)} className="px-4 py-2 border">Cancel</button>
            <button onClick={handleDeleteConfirm} className="px-4 py-2 bg-red-600 text-white font-bold">Delete</button>
          </div>
        </div>
      </Modal>

    </div>
  );
}
