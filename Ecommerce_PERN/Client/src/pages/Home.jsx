import React, { useEffect } from "react";
import { useProductStore } from "../store/useProductStore";
import { RefreshCwIcon } from "lucide-react";

const Home = () => {
  const { products, loading, error, fetchProducts } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  console.log(products);
  return (
    <main>
      <div>
        <button>Add Product</button>
        <button>
          <RefreshCwIcon />
        </button>
      </div>

      {error && <p className="text-red-500">{error}</p>}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="loading loading-spinner loading-lg" />
        </div>
      ) : (
        <div></div>
      )}
    </main>
  );
};

export default Home;
