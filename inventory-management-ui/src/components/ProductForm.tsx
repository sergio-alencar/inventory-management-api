// inventory-management-ui/src/components/ProductForm.tsx

import React, { useEffect, useState } from "react";
import type { Product } from "../types/Product";
import { createProduct, updateProduct } from "../api";
import { SaveImg } from "./images/SaveImg";
import { CancelImg } from "./images/CancelImg";
import FormField from "./FormField";

interface ProductFormProps {
  productToEdit: Product | null;
  onSuccess: () => void;
  onCancel: () => void;
  onError: (message: string) => void;
}

const maskCurrency = (value: string) => {
  const onlyDigits = value.replace(/\D/g, "");
  const numericValue = Number(onlyDigits) / 100;

  return new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numericValue);
};

const ProductForm: React.FC<ProductFormProps> = ({
  productToEdit,
  onSuccess,
  onCancel,
  onError,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    quantity: 0,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

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

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = "O nome é obrigatório.";
    }

    if (formData.price <= 0) {
      newErrors.price = "O preço deve ser maior que zero.";
    }

    if (formData.quantity < 0) {
      newErrors.quantity = "A quantidade não pode ser negativa.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (!validate()) return;

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
      setErrors({ form: "Erro ao conectar com o servidor. Tente novamente." });
      onError(
        `Erro ao salvar produto: ${err instanceof Error ? err.message : "Verifique o console."}`,
      );
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "price") {
      const formatted = maskCurrency(value);
      const numericValue = Number(
        formatted.replace(/\./g, "").replace(",", "."),
      );

      setFormData((prev) => ({ ...prev, price: numericValue }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: name === "quantity" ? Number(value) : value,
      }));
    }

    if (errors[name]) {
      setErrors((prev) => {
        const newErrs = { ...prev };
        delete newErrs[name];
        return newErrs;
      });
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={onCancel}
    >
      <div
        className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-indigo-50 p-8 shadow-2xl transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-left text-2xl font-black text-slate-800">
            {productToEdit ? "Editar Produto" : "Adicionar Novo Produto"}
          </h2>
          <button
            onClick={onCancel}
            className="text-slate-400 hover:text-slate-600"
          >
            ✕
          </button>
        </div>

        {errors.form && (
          <p className="mb-4 text-sm font-bold text-red-900">{errors.form}</p>
        )}

        <form
          onSubmit={handleSubmit}
          noValidate
          className="grid grid-cols-2 gap-6"
        >
          <FormField
            label="Nome"
            name="name"
            className="col-span-full"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
          />

          <FormField
            label="Descrição"
            name="description"
            className="col-span-full"
            value={formData.description}
            onChange={handleChange}
          />

          <FormField
            label="Preço"
            name="price"
            type="text"
            value={new Intl.NumberFormat("pt-BR", {
              minimumFractionDigits: 2,
            }).format(formData.price)}
            onChange={handleChange}
            error={errors.price}
          />

          <FormField
            label="Quantidade"
            name="quantity"
            type="number"
            value={formData.quantity}
            onChange={handleChange}
            error={errors.quantity}
          />

          <div className="col-span-full mt-6 flex justify-center gap-6 pt-6">
            <button
              type="submit"
              title="Salvar"
              className="flex items-center gap-2 rounded-lg bg-indigo-900 px-6 py-2 font-bold text-slate-50 shadow-md shadow-indigo-800 transition-all hover:scale-105 hover:bg-indigo-800"
            >
              <div className="size-6 fill-slate-50">
                <SaveImg />
              </div>
              Salvar
            </button>

            <button
              type="button"
              onClick={onCancel}
              title="Cancelar"
              className="flex items-center gap-2 rounded-lg px-4 py-2 font-semibold text-slate-500 transition-colors hover:bg-slate-200"
            >
              <div className="size-6 fill-slate-500">
                <CancelImg />
              </div>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
