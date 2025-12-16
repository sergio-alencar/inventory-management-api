// src/components/ProductList.tsx

import React, { useEffect, useState } from "react";
import type { Product } from "../types/Product";
import { fetchProducts, deleteProduct } from "../api";

interface ProductListProps {
  onEdit: (product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({ onEdit }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const response = await fetchProducts();
      setProducts(response.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch API products.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Tem certeza que deseja excluir este produto?")) {
      try {
        await deleteProduct(id);
        setProducts(products.filter((p) => p.id !== id));
      } catch (err) {
        alert("Erro ao excluir o produto.");
        console.error(err);
      }
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  if (loading) {
    return (
      <div className="p-8 text-center text-blue-400">
        Carregando produtos...
      </div>
    );
  }

  if (error) {
    return <div className="p-8 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="my-5 rounded-lg bg-gray-100 p-6 text-black">
      <h2 className="mb-4 text-xl font-black">Inventário Atual</h2>

      {products.length === 0 ? (
        <p className="py-8 text-center">
          Nenhum produto cadastrado. Clique em "Adicionar Produto" para começar.
        </p>
      ) : (
        <div className="overflow-hidden rounded-lg shadow-sm">
          <table className="min-w-full">
            <thead className="bg-black text-white">
              <tr className="[&>*]:text-md [&>*]:px-6 [&>*]:py-3 [&>*]:text-center [&>*]:font-bold [&>*]:uppercase [&>*]:tracking-wider">
                <th>Nome</th>
                <th>Preço</th>
                <th>Qtd.</th>
                <th></th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-300 bg-gray-200 text-black">
              {products.map((product) => (
                <tr
                  key={product.id}
                  className="[&>*]:px-6 [&>*]:py-4 [&>*]:text-center [&>*]:text-lg [&>*]:transition [&>*]:duration-150 [&>*]:hover:bg-gray-300"
                >
                  <td>{product.name}</td>
                  <td>
                    {product.price.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </td>
                  <td>{product.quantity}</td>
                  <td>
                    <button
                      onClick={() => onEdit(product)}
                      className="mr-4 [&>*]:transition [&>*]:duration-150"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        fill="#000"
                        className="hover:fill-yellow-500"
                      >
                        <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
                        <title>Editar</title>
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="hover:filter"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        fill="#000"
                        className="hover:fill-red-700"
                      >
                        <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                        <title>Deletar</title>
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProductList;
