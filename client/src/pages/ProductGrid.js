import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getProducts } from "../helper/productHelper";

import men from "../images/HomePage/Men.jpg";
import { useAllCategory } from "../context/categoryContext";
import { allBrand } from "../default/defaultConstant";
import { allSize } from "../default/defaultConstant";

const ProductGrid = () => {
    const [queryFilter, setQueryFilter] = useSearchParams();

    const { allCategory } = useAllCategory();

    const [page, setPage] = useState(queryFilter.get("page") || 1);
    const [category, setCategory] = useState(queryFilter.get("category") || "");
    const [products, setProducts] = useState([]);
    const [brand, setBrand] = useState(queryFilter.get("brand") || "");
    const [nextPageButton, setNextPageButton] = useState(true);
    const [size, setSize] = useState(queryFilter.get("size") || "");
    const [sortprice, setSortprice] = useState(queryFilter.get("sort") || "");

    useEffect(() => {
        const getProductList = async () => {
            const res = await getProducts(queryFilter);
            setProducts(res?.products || []);
            if (res?.products.length) setNextPageButton(false);
            else setNextPageButton(true);
        };

        getProductList();
    }, [queryFilter, nextPageButton]);

    return (
        <div className="flex flex-col justify-center items-center pb-5 px-5 pt-24 sm:pt-36 sm:px-28 lg:pt-36 lg:px-28">
            {/*All Product Grid */}
            <div className=" w-full  text-center sm:flex-wrap sm:flex sm:justify-between sm:items-center">
                {/*category filter */}
                <div className="sm:flex">
                    <div>
                        <select
                            value={category}
                            onChange={(e) => {
                                setCategory(e.target.value);
                                queryFilter.set("category", e.target.value);
                                setQueryFilter(queryFilter);
                            }}
                            className="m-1 p-2 border-gray-800 border-2 rounded-md"
                        >
                            <option value={""}>Filter Catagory</option>
                            {allCategory?.map((c) => (
                                <option key={c._id} value={c._id}>
                                    {`Category:${c.name}`}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/*brand*/}
                    <div>
                        <select
                            value={brand}
                            onChange={(e) => {
                                setBrand(e.target.value);
                                queryFilter.set("brand", e.target.value);
                                setQueryFilter(queryFilter);
                            }}
                            className="m-1 p-2 border-gray-800 border-2 rounded-md"
                        >
                            <option value={""}>Filter Brand</option>
                            {allBrand?.map((b, i) => (
                                <option key={i} value={b}>
                                    {`Brand:${b}`}
                                </option>
                            ))}
                        </select>
                    </div>
                    {/*Size */}
                    <div>
                        <select
                            value={size}
                            onChange={(e) => {
                                setSize(e.target.value);
                                queryFilter.set("size", e.target.value);
                                setQueryFilter(queryFilter);
                            }}
                            className="m-1 p-2 border-gray-800 border-2 rounded-md"
                        >
                            <option value={""}>Filter Size</option>
                            {allSize?.map((b, i) => (
                                <option key={i} value={b}>
                                    {`Size:UK ${b}`}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                {/*Sort */}
                <div>
                    <select
                        value={sortprice}
                        onChange={(e) => {
                            setSortprice(e.target.value);
                            queryFilter.set("sortprice", e.target.value);
                            setQueryFilter(queryFilter);
                        }}
                        className="p-2 m-1 border-gray-800 border-2 rounded-md"
                    >
                        <option value={""}>SortBy:Price</option>
                        <option value="asc">SortBy:Price Low to High</option>
                        <option value="desc">SortBy:Price High to Low</option>
                    </select>
                </div>
            </div>
            <div className="mt-6 p-2 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
                {products.map((product) => (
                    <Link
                        to={`/product/${product.slug}?pid=${product._id}`}
                        key={product._id}
                        className="hover:opacity-75"
                    >
                        <div className=" w-full overflow-hidden rounded-md bg-gray-200  lg:h-80">
                            <img
                                src={men}
                                alt="Front of men's Basic Tee in black."
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

export default ProductGrid;
