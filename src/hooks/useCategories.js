import { useLocalStorage } from './useLocalStorage';
import { INITIAL_CATEGORIES } from '../data/categories';

export function useCategories() {
  const [categories, setCategories] = useLocalStorage('tenra_categories', INITIAL_CATEGORIES);

  const addCategory = (categoryData) => {
    const slug = categoryData.slug || categoryData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const newCategory = {
      id: categoryData.id || slug,
      name: categoryData.name,
      slug: slug,
      description: categoryData.description || '',
      itemCount: '0 Products',
      featured: categoryData.featured || false,
      image: categoryData.image || "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=800"
    };

    setCategories(prev => [...prev, newCategory]);
    return newCategory;
  };

  const updateCategory = (id, fields) => {
    setCategories(prev => prev.map(c => c.id === id ? { ...c, ...fields } : c));
  };

  const deleteCategory = (id) => {
    setCategories(prev => prev.filter(c => c.id !== id));
  };

  return {
    categories,
    addCategory,
    updateCategory,
    deleteCategory
  };
}
