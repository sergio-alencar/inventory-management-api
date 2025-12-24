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

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onCancel();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onCancel]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={onCancel}
    >
      <div
        className="dark:bg-card-dark bg-brand-light w-full max-w-2xl transform overflow-hidden rounded-2xl p-8 shadow-2xl transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-6 flex flex-col items-center md:flex-row md:justify-between">
          <h2 className="text-card-dark dark:text-surface-light text-left text-2xl font-black">
            {productToEdit ? "Editar Produto" : "Adicionar Novo Produto"}
          </h2>
          <button
            onClick={onCancel}
            className="dark:hover:text-surface-light order-first self-end font-black text-slate-400 hover:text-slate-600 md:order-2 md:self-center dark:text-slate-300"
          >
            ✕
          </button>
        </div>

        {errors.form && (
          <p className="text-error-dark mb-4 text-sm font-bold">
            {errors.form}
          </p>
        )}

        <form
          onSubmit={handleSubmit}
          noValidate
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6"
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
            className="col-span-1"
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
            className="col-span-1"
            value={formData.quantity}
            onChange={handleChange}
            error={errors.quantity}
          />

          <div className="pt6 col-span-full mt-6 flex flex-col justify-end gap-3 sm:flex-row">
            <button
              type="submit"
              title="Salvar"
              className="bg-brand-darker shadow-brand-dark text-surface-light hover:bg-brand-dark dark:bg-brand-dark dark:shadow-brand-darker flex items-center justify-center gap-2 rounded-lg px-6 py-2 font-bold shadow-md transition-all hover:scale-105"
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
              className="dark:hover:bg-slate-60 hover:bg-card-light flex items-center justify-center gap-2 rounded-lg px-4 py-2 font-semibold text-slate-500 transition-colors dark:text-slate-400 dark:hover:bg-slate-700"
            >
              <div className="size-6 fill-slate-400">
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
