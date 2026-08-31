import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import { WishlistContext } from "./WishlistContext";
import { useAuth } from "../hooks/useAuth";

type Props = {
  children: ReactNode;
};

type WishlistProduct = {
  id: number;
};

export const WishlistProvider = ({ children }: Props) => {
  const { logout } = useAuth();
  const [wishlist, setWishlist] = useState<number[]>([]);

  // Get wishlist
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setWishlist([]);
      return;
    }

    const fetchWishlist = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/wishlist", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 401 || res.status === 403) {
            logout();
            return;
        }

        if (!res.ok) throw new Error("Failed to fetch wishlist");

        const data: WishlistProduct[] = await res.json();

        const ids = data.map((product) => product.id);

        setWishlist(ids);
      } catch (err) {
        console.error("Wishlist fetch error:", err);
      }
    };

        fetchWishlist();
    }, [logout]);

    const addToWishlist = async (id: number) => {
        const token = localStorage.getItem("token");
        if (!token) return;

        try {
            const res = await fetch(`http://localhost:8080/api/wishlist/${id}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            });

            if (res.status === 401 || res.status === 403) {
                logout();
                return;
            }
            
            if (!res.ok) throw new Error("Failed to add to wishlist");

            setWishlist((prev) => {
            if (prev.includes(id)) return prev;
            return [...prev, id];
            });
        } catch (err) {
            console.error("Add to wishlist failed:", err);
        }
    };

    const removeFromWishlist = async (id: number) => {
        const token = localStorage.getItem("token");
        if (!token) return;

        try {
            const res = await fetch(`http://localhost:8080/api/wishlist/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            });

            if (res.status === 401 || res.status === 403) {
                logout();
                return;
            }
            
            if (!res.ok) throw new Error("Failed to remove from wishlist");

            setWishlist((prev) => prev.filter((item) => item !== id));
        } catch (err) {
            console.error("Remove from wishlist failed:", err);
        }
    };

    const isInWishlist = (id: number) => {
        return wishlist.includes(id);
    };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        setWishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};