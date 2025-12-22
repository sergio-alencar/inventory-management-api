// inventory-management-ui/src/App.tsx

import { useCallback, useEffect, useState } from "react";
import ProductList from "./components/ProductList";
import ProductForm from "./components/ProductForm";
import type { Product } from "./types/Product";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./App.css";
import { deleteProduct, fetchProducts } from "./api";
import ConfirmModal from "./components/ConfirmModal";
import ErrorModal from "./components/ErrorModal";
import Pagination from "./components/Pagination";

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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 5;

  const loadData = useCallback(async (page: number) => {
    try {
      setLoading(true);
      const response = await fetchProducts(page, pageSize);

      if (response.data && response.data.items) {
        setProducts(response.data.items);
        setTotalPages(response.data.totalPages);
        setCurrentPage(response.data.pageNumber);
      }

      setError(null);
    } catch (err) {
      setError("Falha ao procurar produtos.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData(currentPage);
  }, [loadData, currentPage]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleSuccess = () => {
    setShowForm(false);
    setEditingProduct(null);
    setCurrentPage(1);
    loadData(1);
  };

  const requestDelete = (id: number) => {
    setProductIdToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (productIdToDelete) {
      try {
        await deleteProduct(productIdToDelete);
        loadData(currentPage);
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
    <div className="flex min-h-screen flex-col justify-between bg-slate-100">
      <div>
        <Header />
        <div className="mx-auto flex max-w-4xl flex-col p-8">
          <ProductList
            products={products}
            loading={loading}
            error={error}
            onEdit={handleEdit}
            onDelete={requestDelete}
            showForm={showForm}
            onAddClick={() => {
              setEditingProduct(null);
              setShowForm(true);
            }}
          />

          {totalPages > 1 && (
            <Pagination
              current={currentPage}
              total={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>

        {showForm && (
          <ProductForm
            productToEdit={editingProduct}
            onSuccess={handleSuccess}
            onCancel={() => setShowForm(false)}
            onError={showError}
          />
        )}

        <ConfirmModal
          isOpen={isDeleteModalOpen}
          title="Confirmar Exclusão"
          message="Tem certeza que deseja remover este produto?"
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
    </div>
  );
}

export default App;
