import { useState, useEffect } from "react";
import type { Product, ProductFormData } from "@/types";
import { createProduct, updateProduct } from "@/services/api";

interface UseProductFormProps {
  productToEdit: Product | null;
  onSuccess: () => void;
  onCancel: () => void;
}

export function useProductForm({
  productToEdit,
  onSuccess,
  onCancel,
}: UseProductFormProps) {
  const [formData, setFormData] = useState<
    Omit<ProductFormData, "price"> & { price: number }
  >({
    name: "",
    description: "",
    price: 0,
    quantity: 0,
  });
  const [priceInput, setPriceInput] = useState<string>("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (productToEdit) {
      setFormData({
        name: productToEdit.name,
        description: productToEdit.description || "",
        price: productToEdit.price,
        quantity: productToEdit.quantity,
      });

      setPriceInput(productToEdit.price.toString());
    } else {
      setFormData({ name: "", description: "", price: 0, quantity: 0 });
      setPriceInput("");
    }
  }, [productToEdit]);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onCancel();
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onCancel]);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = "The name is required.";
    } else if (formData.name.length > 100) {
      newErrors.name = "The name must be at most 100 characters.";
    }

    if (formData.description && formData.description.length > 500) {
      newErrors.description = "The description must be at most 500 characters.";
    }

    if (formData.quantity < 0) {
      newErrors.quantity = "The quantity cannot be negative.";
    } else if (!Number.isInteger(formData.quantity)) {
      newErrors.quantity = "The quantity must be a whole number.";
    } else if (formData.quantity > 999999) {
      newErrors.quantity = "The maximum allowed quantity is 999,999.";
    }

    const priceValue = parseFloat(priceInput);
    if (!priceInput.trim() || isNaN(priceValue) || priceValue <= 0) {
      newErrors.price = "The price must be a valid positive number.";
    } else if (priceValue > 999999.99) {
      newErrors.price = "The maximum allowed price is $999,999.99.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "price") {
      let sanitized = value.replace(/[^0-9.,]/g, "");
      sanitized = sanitized.replace(",", ".");
      const parts = sanitized.split(".");
      sanitized =
        parts[0] + (parts.length > 1 ? "." + parts.slice(1).join("") : "");
      setPriceInput(sanitized);
    } else if (name === "quantity") {
      setFormData((prev) => ({ ...prev, quantity: Number(value) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    if (errors[name]) {
      setErrors((prev) => {
        const newErrs = { ...prev };
        delete newErrs[name];
        return newErrs;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (!validate()) {
      return;
    }

    const priceValue = parseFloat(priceInput);
    const finalFormData = { ...formData, price: priceValue };

    setSaving(true);
    try {
      if (productToEdit) {
        await updateProduct(productToEdit.id, {
          ...finalFormData,
          id: productToEdit.id,
          createdDate: productToEdit.createdDate,
        });
      } else {
        await createProduct(finalFormData);
      }
      onSuccess();
    } catch (err) {
      console.error("Error saving product:", err);
      setErrors({ form: "Error connecting to the server. Please try again." });
    } finally {
      setSaving(false);
    }
  };

  return {
    formData,
    priceInput,
    errors,
    saving,
    handleChange,
    handleSubmit,
  };
}
