// inventory-management-ui/src/components/ProductList.tsx

import React from "react";
import type { Product } from "../types/Product";
import { EditImg } from "./images/EditImg";
import { DeleteImg } from "./images/DeleteImg";
import AddProductButton from "./AddProductButton";

interface ProductListProps {
  products: Product[];
  loading: boolean;
  error: string | null;
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
  onAddClick: () => void;
  showForm: boolean;
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  loading,
  error,
  onEdit,
  onDelete,
  onAddClick,
  showForm,
}) => {
  if (loading) {
    return <div className="p-8 text-center text-indigo-950">Carregando...</div>;
  }

  if (error) {
    return <div className="p-8 text-center text-red-900">{error}</div>;
  }

  if (!products || !Array.isArray(products)) {
    return (
      <div className="p-8 text-center text-slate-600">
        Nenhum produto encontrado.
      </div>
    );
  }

  return (
    <div className="mb-5 p-4 md:p-6">
      <div className="mb-6 flex flex-col items-center justify-between gap-4 border-b border-card-light pb-4 dark:border-card-dark md:flex-row md:gap-0">
        <h2 className="text-left text-xl font-black text-surface-dark dark:text-surface-light">
          Inventário Atual
        </h2>
        {!showForm && (
          <AddProductButton onClick={onAddClick} isLoading={loading} />
        )}
      </div>

      {products.length === 0 ? (
        <p className="py-4 text-center italic text-surface-dark dark:text-surface-light">
          O inventário está vazio.
        </p>
      ) : (
        <>
          <div className="hidden overflow-x-auto rounded-md md:block">
            <table className="min-w-full">
              <thead className="bg-brand-darker text-surface-light">
                <tr>
                  <th className="px-6 py-4 text-center text-xs font-black uppercase tracking-widest">
                    Nome
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-black uppercase tracking-widest">
                    Preço
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-black uppercase tracking-widest">
                    Qtd.
                  </th>
                  <th className="w-28 px-6 py-4 text-center text-xs font-black uppercase tracking-widest">
                    Ações
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-card-medium bg-card-light dark:divide-slate-700 dark:bg-card-dark">
                {products.map((product) => (
                  <tr
                    key={product.id}
                    className="text-surface-dark transition hover:bg-card-medium dark:text-slate-50 dark:hover:bg-slate-700"
                  >
                    <td className="px-6 py-4 text-center">{product.name}</td>
                    <td className="px-6 py-4 text-center">
                      {product.price.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {product.quantity}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => onEdit(product)}
                        className="mr-4 size-6 fill-surface-dark transition-transform hover:scale-110 dark:fill-card-medium"
                      >
                        <EditImg />
                      </button>

                      <button
                        onClick={() => onDelete(product.id)}
                        className="size-6 fill-surface-dark transition-transform hover:scale-110 dark:fill-card-medium"
                      >
                        <DeleteImg />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 gap-4 md:hidden">
            {products.map((product) => (
              <div
                key={product.id}
                className="flex justify-between rounded-lg border-l-4 border-brand-darker bg-card-light p-4 shadow-sm dark:border-l-brand-dark dark:bg-card-dark"
              >
                <div className="flex flex-col items-start gap-2">
                  <p className="font-semibold text-surface-dark dark:text-surface-light">
                    {product.name}
                  </p>
                  <p>
                    {product.price.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </p>
                  <p>{product.quantity} un.</p>
                </div>

                <div className="flex flex-col justify-between py-2 text-sm">
                  <button
                    onClick={() => onEdit(product)}
                    className="size-7 fill-surface-dark dark:fill-card-medium"
                  >
                    <EditImg />
                  </button>
                  <button
                    onClick={() => onDelete(product.id)}
                    className="size-7 fill-surface-dark dark:fill-card-medium"
                  >
                    <DeleteImg />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ProductList;
