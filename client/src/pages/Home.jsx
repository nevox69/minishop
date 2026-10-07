import ProductCard from "../components/ProductCard";
import useFetch from "../hooks/useFetch";
import { useState } from "react";

const Home = () => {
  const [search, setSearch] = useState("");

  const { data, loading, error, reFetch } = useFetch("/products", {
    products: [],
  });

  const products = data.products;

  const filterProducts = products.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase()),
  );

  // it basically
  //   (p) => {
  //   return p.title.toLowerCase().includes(search.toLowerCase());
  // }

  // const loadProduct = async () => {
  //   try {
  //     const response = await api.get("/products");
  //     console.log(response.data);

  //     if (response.data.products) {
  //       setProducts(response.data.products);
  //     } else {
  //       setProducts([]);
  //     }
  //   } catch (err) {
  //     console.log(err.response?.data?.message);
  //   }
  // };

  // useEffect(() => {
  //   loadProduct();
  // }, []);

  if (loading) {
    return <p>Loading .............</p>;
  }
  if (error) {
    return <p>something went wrong.</p>;
  }
  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {products.length === 0 ? (
        <div className="flex min-h-[60vh] items-center justify-center">
          <h1 className="text-2xl font-semibold text-gray-400">
            There are No Products
          </h1>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filterProducts.map((product) => (
            <ProductCard
              product={product}
              key={product._id}
              onUpdate={reFetch}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
