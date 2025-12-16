// src/components/ProductForm.tsx

import React, { useEffect, useState } from "react";
import type { Product } from "../types/Product";
import { createProduct, updateProduct } from "../api";

interface ProductFormProps {
  productToEdit: Product | null;
  onSuccess: () => void;
  onCancel: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({
  productToEdit,
  onSuccess,
  onCancel,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    quantity: 0,
  });

  useEffect(() => {
    if (productToEdit) {
      setFormData({
        name: productToEdit.name,
        description: productToEdit.description || "",
        price: productToEdit.price,
        quantity: productToEdit.quantity,
      });
    } else {
      setFormData({
        name: "",
        description: "",
        price: 0,
        quantity: 0,
      });
    }
  }, [productToEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (productToEdit) {
        await updateProduct(productToEdit.id, {
          ...formData,
          id: productToEdit.id,
        });
      } else {
        await createProduct(formData);
      }
      onSuccess();
    } catch (err) {
      console.error("Error saving product:", err);
      alert(
        `Erro ao salvar produto: ${err instanceof Error ? err.message : "Verifique o console."}`,
      );
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;

    setFormData({
      ...formData,
      [name]: type === "number" ? parseFloat(value) || 0 : value,
    });
  };

  return (
    <div className="my-5 rounded-lg bg-gray-100 p-6">
      <h2 className="mb-4 text-xl font-black">
        {productToEdit ? "Editar Produto" : "Adicionar Novo Produto"}
      </h2>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-2 gap-4 [&>*]:mb-2"
      >
        <div className="grid">
          <label htmlFor="name">Nome</label>
          <input
            type="text"
            name="name"
            id="name"
            className="rounded border p-2 focus:border-blue-500 focus:ring-blue-500"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="grid">
          <label htmlFor="description">Descrição</label>
          <input
            type="text"
            name="description"
            id="description"
            className="rounded border p-2 focus:border-blue-500 focus:ring-blue-500"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <div className="grid">
          <label htmlFor="price">Preço</label>
          <input
            type="number"
            name="price"
            id="price"
            step="0.01"
            className="rounded border p-2 focus:border-blue-500 focus:ring-blue-500"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>

        <div className="grid">
          <label htmlFor="quantity">Quantidade</label>
          <input
            type="number"
            name="quantity"
            id="quantity"
            className="rounded border p-2 focus:border-blue-500 focus:ring-blue-500"
            value={formData.quantity}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-span-full mt-2 flex justify-center gap-4">
          <button type="submit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#000"
              className="size-8 self-end transition duration-150 hover:fill-green-700"
            >
              <path d="M840-680v480q0 33-23.5 56.5T760-120H200q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h480l160 160Zm-80 34L646-760H200v560h560v-446ZM480-240q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35ZM240-560h360v-160H240v160Zm-40-86v446-560 114Z" />
              <title>Salvar</title>
            </svg>
          </button>

          <button type="button" onClick={onCancel}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#000"
              className="size-8 transition duration-150 hover:fill-red-700"
            >
              <path d="m336-280 144-144 144 144 56-56-144-144 144-144-56-56-144 144-144-144-56 56 144 144-144 144 56 56ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
              <title>Cancelar</title>
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
