// src/App.tsx

import { useCallback, useEffect, useState } from "react";
import ProductList from "./components/ProductList";
import ProductForm from "./components/ProductForm";
import AddProductButton from "./components/AddProductButton";
import type { Product } from "./types/Product";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./App.css";
import { deleteProduct, fetchProducts } from "./api";
import ConfirmModal from "./components/ConfirmModal";
import ErrorModal from "./components/ErrorModal";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState<number | null>(
    null,
  );
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetchProducts();
      setProducts(response.data);
      setError(null);
    } catch (err) {
      setError("Falha ao procurar produtos.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleSuccess = () => {
    setShowForm(false);
    loadData();
  };

  const requestDelete = (id: number) => {
    setProductIdToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (productIdToDelete) {
      try {
        await deleteProduct(productIdToDelete);
        loadData();
      } catch (err) {
        setErrorMessage("Erro ao excluir produto.");
        setIsErrorModalOpen(true);
      } finally {
        setIsDeleteModalOpen(false);
        setProductIdToDelete(null);
      }
    }
  };

  const showError = (message: string) => {
    setErrorMessage(message);
    setIsErrorModalOpen(true);
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-900 p-8 text-[#eeeeee]">
        <div className="mx-auto flex max-w-4xl flex-col">
          <h1 className="mb-8 text-center text-4xl font-extrabold text-blue-400">
            Gestão de Inventário
          </h1>

          {!showForm ? (
            <AddProductButton
              onClick={() => {
                setEditingProduct(null);
                setShowForm(true);
              }}
              isLoading={loading}
            />
          ) : (
            <ProductForm
              productToEdit={editingProduct}
              onSuccess={handleSuccess}
              onCancel={() => setShowForm(false)}
              onError={showError}
            />
          )}

          <ProductList
            products={products}
            loading={loading}
            error={error}
            onEdit={handleEdit}
            onDelete={requestDelete}
          />
        </div>

        <ConfirmModal
          isOpen={isDeleteModalOpen}
          title="Confirmar Exclusão"
          message="Tem certeza que deseja remover este produto? Esta ação não pode ser desfeita."
          onConfirm={confirmDelete}
          onCancel={() => setIsDeleteModalOpen(false)}
        />

        <ErrorModal
          isOpen={isErrorModalOpen}
          message={errorMessage}
          onClose={() => setIsErrorModalOpen(false)}
        />
      </div>

      <Footer />
    </>
  );
}

export default App;
