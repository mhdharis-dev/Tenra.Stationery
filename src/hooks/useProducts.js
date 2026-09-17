import { useLocalStorage } from './useLocalStorage';
import { INITIAL_PRODUCTS } from '../data/products';

/**
 * Custom hook to manage TENRA stationery products.
 * Includes Phase 2 integration readiness comments.
 */
export function useProducts() {
  const [products, setProducts] = useLocalStorage('tenra_products', INITIAL_PRODUCTS);

  // Phase 2: Replace local state with API fetch call (e.g. GET /api/v1/products)
  const getProductById = (id) => {
    return products.find(p => p.id === id) || null;
  };

  const getProductsByCategory = (categorySlug) => {
    if (!categorySlug || categorySlug === 'all') return products;
    return products.filter(p => 
      p.categorySlug?.toLowerCase() === categorySlug.toLowerCase() ||
      p.category?.toLowerCase() === categorySlug.toLowerCase()
    );
  };

  // Phase 2: Connect to POST /api/v1/products
  const addProduct = (newProductData) => {
    const newId = `tnr-${Date.now().toString().slice(-4)}`;
    const productToAdd = {
      id: newId,
      status: 'active',
      featured: false,
      price: newProductData.price ? parseFloat(newProductData.price) : null,
      images: newProductData.images && newProductData.images.length > 0 ? newProductData.images : [
        "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=1000"
      ],
      specifications: newProductData.specifications || {},
      categorySlug: newProductData.category ? newProductData.category.toLowerCase().replace(/[^a-z0-9]+/g, '-') : 'general',
      sku: newProductData.sku || `TNR-${Math.floor(100 + Math.random() * 900)}`,
      ...newProductData
    };

    setProducts(prev => [productToAdd, ...prev]);
    return productToAdd;
  };

  // Phase 2: Connect to PUT /api/v1/products/:id
  const updateProduct = (id, updatedFields) => {
    setProducts(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, ...updatedFields };
      }
      return item;
    }));
  };

  // Phase 2: Connect to DELETE /api/v1/products/:id
  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(item => item.id !== id));
  };

  const resetToDefault = () => {
    setProducts(INITIAL_PRODUCTS);
  };

  return {
    products,
    getProductById,
    getProductsByCategory,
    addProduct,
    updateProduct,
    deleteProduct,
    resetToDefault
  };
}
