import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import ProductsList from './ProductsList';
import ProductForm from './ProductForm';
import type { Product } from '../../types';

export default function ProductsView() {
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);

  const handleAddProduct = (product: Omit<Product, 'id'>) => {
    setProducts([...products, { ...product, id: Date.now().toString() }]);
    setIsAddingProduct(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Products</h1>
        <button
          onClick={() => setIsAddingProduct(true)}
          className="btn-primary"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Product
        </button>
      </div>

      {isAddingProduct ? (
        <ProductForm onSubmit={handleAddProduct} onCancel={() => setIsAddingProduct(false)} />
      ) : (
        <ProductsList products={products} />
      )}
    </div>
  );
}