import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faEdit,
  faTrash,
  faCaretLeft,
  faCaretRight,
  faUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";
import ProductEditModal from "../../components/modals/ProductEdit";
import type { ProductFormData } from "../../components/modals/ProductEdit";

library.add(faPlus, faEdit, faTrash, faCaretLeft, faCaretRight, faUpRightFromSquare);

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  available: boolean;
  category: string;
  subcategory: string;
  imageUrl: string;
}

const ProductManagementPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [editingProductId, setEditingProductId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const itemsPerPage = 10;

  // Fetch products with safe async effect
  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get<Product[]>(
          "http://localhost:8080/api/products",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Failed to fetch products", error);
      }
    })();
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:8080/api/admin/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Failed to delete product", error);
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = products.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  // Open modal for new product
  const handleAddProduct = () => {
    setEditingProductId(null); // null indicates new product
    setIsModalOpen(true);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Product Management</h1>
        <button
          className="btn btn-primary flex items-center gap-2"
          onClick={handleAddProduct}
        >
          <FontAwesomeIcon icon="plus" /> Add Product
        </button>
      </div>

      {/* Products Table */}
      <div className="overflow-x-auto">
        <table className="table w-full table-zebra">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Available</th>
              <th>Category</th>
              <th>Subcategory</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td className="flex items-center gap-2">
                  <Link
                    to={`/product/${product.id}`}
                    className="text-blue-600 hover:underline flex items-center gap-1"
                    target="_blank"
                  >
                    <FontAwesomeIcon icon={faUpRightFromSquare} /> {product.name}
                  </Link>
                </td>
                <td>${product.price.toFixed(2)}</td>
                <td>{product.quantity}</td>
                <td>{product.available ? "Yes" : "No"}</td>
                <td>{product.category}</td>
                <td>{product.subcategory}</td>
                <td className="flex gap-2">
                  <button
                    className="btn btn-sm btn-warning flex items-center gap-1"
                    onClick={() => {
                      setEditingProductId(product.id);
                      setIsModalOpen(true);
                    }}
                  >
                    <FontAwesomeIcon icon="edit" /> Edit
                  </button>
                  <button
                    className="btn btn-sm btn-error flex items-center gap-1"
                    onClick={() => handleDelete(product.id)}
                  >
                    <FontAwesomeIcon icon="trash" /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-4 space-x-4">
        <button
          className="btn btn-sm"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          <FontAwesomeIcon icon="caret-left" />
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="btn btn-sm"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          <FontAwesomeIcon icon="caret-right" />
        </button>
      </div>

      {/* Product Edit Modal */}
      {isModalOpen && (
        <ProductEditModal
          productId={editingProductId ?? undefined} // undefined = new product
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onUpdated={(updatedProduct: ProductFormData) => {
            if (editingProductId === null) {
              // New product
              setProducts((prev) => [updatedProduct, ...prev]);
            } else {
              // Existing product updated
              setProducts((prev) =>
                prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
              );
            }
            setIsModalOpen(false);
            setEditingProductId(null);
          }}
        />
      )}
    </div>
  );
};

export default ProductManagementPage;