import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getProducts } from "../../helper/productHelper";
import men from "../../images/HomePage/Men.jpg";
//import kid from "../../images/HomePage/Kid.jpg";

const ProductsEdit = () => {
    const [queryFilter, setQueryFilter] = useSearchParams();
    const [search, setSearch] = useState(queryFilter.get("search") || "");
    const [page, setPage] = useState(Number(queryFilter.get("page")) || 1);
    const [products, setProducts] = useState([]);
    const [nextPageButton, setNextPageButton] = useState(true);

    useEffect(() => {
        const getProductList = async () => {
            const res = await getProducts(queryFilter);
            setProducts(res?.products);
            if (res?.products.length) setNextPageButton(false);
            else setNextPageButton(true);
        };

        getProductList();
    }, [queryFilter, nextPageButton]);

    const handleSearchEdit = async (e) => {
        e.preventDefault();
        const res = await getProducts(queryFilter);
        setProducts(res.products);
    };

    return (
        <div className="flex flex-col justify-center items-center">
            <div className="font-bold text-3xl ">Edit Product</div>
            <form className="p-5" onSubmit={handleSearchEdit}>
                <input
                    placeholder="Search Product For Edit"
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        queryFilter.set("search", e.target.value);
                        setQueryFilter(queryFilter);
                    }}
                    className="p-3 m-1 border-2 rounded-lg"
                />
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
                >
                    Search
                </button>
            </form>
            {/*All Product Grid */}
            <div className="mt-6 p-2 grid  gap-x-6 gap-y-10 grid-cols-2 lg:grid-cols-4">
                {products.map((product) => (
                    <Link
                        to={`/dashboard/admin/product-edit/${product.slug}?pid=${product._id}`}
                        key={product._id}
                        className="hover:opacity-75"
                    >
                        <div className=" w-full overflow-hidden rounded-md bg-gray-200  lg:h-80">
                            <img
                                src={product?.image?.url}
                                alt="product"
                                className="h-full w-full object-cover object-center"
                            />
                        </div>
                        <div className="mt-4 flex justify-between">
                            <div>
                                <h3 className="text-sm text-gray-700">
                                    {product.name}
                                </h3>
                                <p className="mt-1 text-sm text-gray-500">
                                    {product.brand}
                                </p>
                            </div>
                            <p className="text-sm font-medium text-gray-900">
                                <span>&#8377;</span>
                                {product.price}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
            {products?.length === 0 && (
                <div className="p-6 font-medium text-xl">No More Result</div>
            )}
            <div>
                <button
                    onClick={() => {
                        queryFilter.set("page", page - 1);
                        setPage(page - 1);
                        setQueryFilter(queryFilter);
                    }}
                    disabled={page <= 1}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
                >
                    Prev
                </button>
                <button
                    onClick={() => {
                        queryFilter.set("page", page + 1);
                        setPage(page + 1);
                        setQueryFilter(queryFilter);
                    }}
                    disabled={nextPageButton}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default ProductsEdit;
