import React from "react";
import { FormField } from "@/components/shared/FormField";
import type { ProductFormProps } from "@/types/components/inventory";
import { useProductForm } from "@/hooks/useProductForm";

export const ProductForm: React.FC<ProductFormProps> = ({
  productToEdit,
  onSuccess,
  onCancel,
}) => {
  const { formData, priceInput, errors, saving, handleChange, handleSubmit } =
    useProductForm({ productToEdit, onSuccess, onCancel });

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={onCancel}
    >
      <div
        className="w-full max-w-2xl border-2 border-solid border-b-win98-shadow border-l-win98-highlight border-r-win98-shadow border-t-win98-highlight bg-win98-bg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="window-title">
          <span>{productToEdit ? "Edit Product" : "Add New Product"}</span>
          <button className="retro-btn px-2 py-0 text-xs" onClick={onCancel}>
            ✕
          </button>
        </div>

        <div className="p-6">
          {errors.form && (
            <p className="mb-4 text-sm text-win98-error">{errors.form}</p>
          )}

          <form
            onSubmit={handleSubmit}
            noValidate
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6"
          >
            <FormField
              label="Name"
              name="name"
              className="col-span-full"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
            />
            <FormField
              label="Description"
              name="description"
              className="col-span-full"
              value={formData.description ?? ""}
              onChange={handleChange}
            />
            <FormField
              label="Price"
              name="price"
              type="text"
              value={priceInput}
              onChange={handleChange}
              className="col-span-1"
              error={errors.price}
            />
            <FormField
              label="Quantity"
              name="quantity"
              type="number"
              className="col-span-1"
              value={formData.quantity}
              onChange={handleChange}
              error={errors.quantity}
              min={0}
              max={999999}
            />

            <div className="col-span-full mt-4 flex flex-col justify-end gap-3 sm:flex-row">
              <button type="submit" disabled={saving} className="retro-btn">
                {saving ? "Saving..." : "Save"}
              </button>
              <button
                type="button"
                onClick={onCancel}
                disabled={saving}
                className="retro-btn"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
