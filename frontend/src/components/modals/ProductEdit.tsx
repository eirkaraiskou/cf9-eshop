import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faSave } from "@fortawesome/free-solid-svg-icons";

interface ProductEditModalProps {
  productId?: number; // undefined for new product
  isOpen: boolean;
  onClose: () => void;
  onUpdated: (updatedProduct: ProductFormData) => void;
}

export interface ProductFormData {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  available: boolean;
  category: string;
  subcategory: string;
  imageUrl: string;
  specifications: string;
}

const categories = [
  "Computers",
  "Mobile & Wearables",
  "TV & Audio",
  "Drones",
  "Accessories",
  "Gaming",
];

const ProductEditModal: React.FC<ProductEditModalProps> = ({
  productId,
  isOpen,
  onClose,
  onUpdated,
}) => {
  const token = localStorage.getItem("token");

  // Initialize product state for new or edit
  const [product, setProduct] = useState<ProductFormData | null>(
    productId === undefined
      ? {
          id: 0,
          name: "",
          description: "",
          price: 0,
          quantity: 0,
          available: true,
          category: categories[0],
          subcategory: "",
          imageUrl: "",
          specifications: "{}",
        }
      : null
  );

  // Fetch existing product if editing
  useEffect(() => {
    if (!isOpen || productId === undefined) return;

    const fetchProduct = async () => {
      try {
        const res = await axios.get<ProductFormData>(
          `http://localhost:8080/api/products/${productId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setProduct(res.data);
      } catch (err) {
        console.error("Failed to fetch product", err);
      }
    };

    fetchProduct();
  }, [productId, isOpen, token]);

  if (!isOpen || !product) return null;

  // Handle input changes safely
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    let value: string | number | boolean = e.target.value;

    if (e.target instanceof HTMLInputElement) {
      if (e.target.type === "checkbox") value = e.target.checked;
      else if (e.target.type === "number") value = e.target.value === "" ? 0 : parseFloat(e.target.value);
    }

    setProduct({ ...product, [e.target.name]: value });
  };

  // Validation before save
  const validate = () => {
    if (!product.name.trim()) {
      toast.error("Product name cannot be empty");
      return false;
    }
    if (product.price < 0) {
      toast.error("Price cannot be negative");
      return false;
    }
    if (product.quantity < 0) {
      toast.error("Quantity cannot be negative");
      return false;
    }
    return true;
  };

  // Handle save for new or existing product
  const handleSave = async () => {
    if (!product || !validate()) return;

    const loadingToast = toast.loading(productId ? "Updating product..." : "Adding product...");

    try {
      let res;
      if (productId === undefined) {
        // Add new product
        res = await axios.post(
          `http://localhost:8080/api/admin/products`,
          product,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.dismiss(loadingToast);
        toast.success("Product added successfully");
      } else {
        // Update existing product
        res = await axios.put(
          `http://localhost:8080/api/admin/products/${product.id}`,
          product,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.dismiss(loadingToast);
        toast.success("Product updated successfully");
      }

      onUpdated(res.data);
      onClose();
    } catch (err) {
      toast.dismiss(loadingToast);
      toast.error(productId ? "Product update failed" : "Product creation failed");
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{productId ? "Edit Product" : "Add Product"}</h2>
          <button className="btn btn-sm btn-ghost" onClick={onClose}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>

        <div className="space-y-4">
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            placeholder="Product Name"
            className="input input-bordered w-full"
          />
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            placeholder="Description"
            className="textarea textarea-bordered w-full"
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              placeholder="Price"
              className="input input-bordered"
            />
            <input
              type="number"
              name="quantity"
              value={product.quantity}
              onChange={handleChange}
              placeholder="Quantity"
              className="input input-bordered"
            />
          </div>
          <select
            name="category"
            value={product.category}
            onChange={handleChange}
            className="select select-bordered w-full"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <input
            type="text"
            name="subcategory"
            value={product.subcategory}
            onChange={handleChange}
            placeholder="Subcategory"
            className="input input-bordered w-full"
          />
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="available"
              checked={product.available}
              onChange={handleChange}
              className="checkbox"
            />
            Available
          </label>
          <input
            type="text"
            name="imageUrl"
            value={product.imageUrl}
            onChange={handleChange}
            placeholder="Image URL"
            className="input input-bordered w-full"
          />
          <textarea
            name="specifications"
            value={product.specifications}
            onChange={handleChange}
            placeholder="Specifications (JSON)"
            className="textarea textarea-bordered w-full"
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2 mt-6">
          <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary flex items-center gap-2" onClick={handleSave}>
            <FontAwesomeIcon icon={faSave} />
            {productId ? "Save" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductEditModal;