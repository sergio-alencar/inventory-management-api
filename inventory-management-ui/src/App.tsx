// src/App.tsx

import { useState } from "react";
import ProductList from "./components/ProductList";
import ProductForm from "./components/ProductForm";
import AddProductButton from "./components/AddProductButton";
import type { Product } from "./types/Product";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleAddNewProduct = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  const handleSuccess = () => {
    setShowForm(false);
    setEditingProduct(null);
    setRefreshKey((old) => old + 1);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100">
        <Header />
        <div className="mx-auto my-6 flex max-w-4xl flex-col">
          <ProductList key={refreshKey} onEdit={handleEdit} />
          {!showForm ? (
            <AddProductButton onClick={handleAddNewProduct} />
          ) : (
            <ProductForm
              productToEdit={editingProduct}
              onSuccess={handleSuccess}
              onCancel={handleCancel}
            />
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
