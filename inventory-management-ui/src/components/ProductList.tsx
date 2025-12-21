// src/components/ProductList.tsx

import React from "react";
import type { Product } from "../types/Product";
import { EditImg } from "./images/EditImg";
import { DeleteImg } from "./images/DeleteImg";

interface ProductListProps {
  products: Product[];
  loading: boolean;
  error: string | null;
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  loading,
  error,
  onEdit,
  onDelete,
}) => {
  if (loading) {
    return <div className="p-8 text-center text-blue-400">Carregando...</div>;
  }

  if (error) {
    return <div className="p-8 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="my-5 rounded-lg bg-gray-100 p-6 text-[#111]">
      <h2 className="mb-4 text-center text-xl font-black">Inventário Atual</h2>
      {products.length === 0 ? (
        <p className="py-4 text-center">Nenhum produto encontrado.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-black text-white">
              <tr className="[&>*]:px-6 [&>*]:py-4 [&>*]:text-center [&>*]:text-xs [&>*]:font-black [&>*]:uppercase [&>*]:tracking-widest">
                <th>Nome</th>
                <th>Preço</th>
                <th>Qtd.</th>
                <th className="w-28">Ações</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-300 bg-gray-200">
              {products.map((product) => (
                <tr key={product.id} className="transition hover:bg-gray-300">
                  <td className="px-6 py-4 text-center">{product.name}</td>
                  <td className="px-6 py-4 text-center">
                    {product.price.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </td>
                  <td className="px-6 py-4 text-center">{product.quantity}</td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => onEdit(product)}
                      className="mr-4 transition hover:scale-110"
                    >
                      <EditImg />
                    </button>

                    <button
                      onClick={() => onDelete(product.id)}
                      className="transition-transform hover:scale-110"
                    >
                      <DeleteImg />
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
