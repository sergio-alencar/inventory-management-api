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
    <div className="mb-5 p-6">
      <div className="mb-6 flex items-center justify-between border-b border-slate-300 pb-4">
        <h2 className="text-left text-xl font-black text-slate-950">
          Inventário Atual
        </h2>
        {!showForm && (
          <AddProductButton onClick={onAddClick} isLoading={loading} />
        )}
      </div>
      {products.length === 0 ? (
        <p className="py-4 text-center italic text-slate-950">
          O inventário está vazio.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-md">
          <table className="min-w-full">
            <thead className="bg-indigo-950 text-slate-50">
              <tr className="[&>*]:px-6 [&>*]:py-4 [&>*]:text-center [&>*]:text-xs [&>*]:font-black [&>*]:uppercase [&>*]:tracking-widest">
                <th>Nome</th>
                <th>Preço</th>
                <th>Qtd.</th>
                <th className="w-28">Ações</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-300 bg-slate-200">
              {products.map((product) => (
                <tr
                  key={product.id}
                  className="text-slate-950 transition hover:bg-slate-300 [&>*]:px-6 [&>*]:py-4 [&>*]:text-center"
                >
                  <td>{product.name}</td>
                  <td>
                    {product.price.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </td>
                  <td>{product.quantity}</td>
                  <td className="[&>*]:size-6 [&>*]:fill-slate-950 [&>*]:transition-transform hover:[&>*]:scale-110">
                    <button onClick={() => onEdit(product)} className="mr-4">
                      <EditImg />
                    </button>

                    <button onClick={() => onDelete(product.id)}>
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
