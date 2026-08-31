import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faForward, faShoppingBasket, faTrashCan } from "@fortawesome/free-solid-svg-icons";

type Product = {
  id: number;
  name: string;
  description: string;
  category: string;
  subcategory: string;
  price: number;
  imageUrl: string;
};

const WishlistPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const fetchWishlist = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/wishlist", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch wishlist");

        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchWishlist();
  }, []);

  const handleRemove = async (e: React.MouseEvent, productId: number) => {
    e.stopPropagation();

    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      await fetch(`http://localhost:8080/api/wishlist/${productId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProducts((prev) => prev.filter((p) => p.id !== productId));
    } catch (err) {
      console.error("Failed to remove from wishlist", err);
    }
  };

  const handleAddAllToCart = () => {
    console.log("Add all to cart:", products);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">My Wishlist</h1>

      {products.length === 0 ? (
        <p className="text-gray-500">No products in wishlist.</p>
      ) : (
        <>
          <div className="space-y-4">
            {products.map((product) => (
              <div key={product.id} onClick={() => navigate(`/product/${product.id}`)} className="border rounded-lg p-4 flex flex-col sm:flex-row gap-4 hover:shadow-lg hover:cursor-pointer transition">
               
                <img  src={`/${product.imageUrl}`} alt={product.name} className="w-full sm:w-32 h-32 object-cover rounded" />

                <div className="flex flex-col justify-between flex-1">
                  <div>
                    <h2 className="text-lg font-semibold">{product.name}</h2>
                    
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">{product.description}</p>

                    <p className="text-sm mt-1">
                      <FontAwesomeIcon className="ml-2 mr-2" icon={faForward} />
                      {product.category} / {product.subcategory}
                    </p>
                  </div>

                  <p className="font-bold mt-3 text-primary"> ${product.price}</p>

                  <div className="mt-3">
                    <button onClick={(e) => handleRemove(e, product.id)} className="btn btn-error btn-sm flex items-center gap-2">
                      <FontAwesomeIcon icon={faTrashCan} />
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <button onClick={handleAddAllToCart} className="btn btn-primary px-8 normal-case flex items-center gap-2">
              <FontAwesomeIcon icon={faShoppingBasket} />
              Add all to cart
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default WishlistPage;