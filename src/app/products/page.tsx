import React from "react";

const Products = () => {
  return (
    <div>
      <h1 className="text-black"> Products</h1>
      <div className="grid grid-cols-12 gap-4 mt-3">
        <div className="col-span-6">
          <input
            style={{
              border: "1px solid #808b96",
              width: "100%",
              color: "black",
              padding: "8px",
            }}
            className="DocSearch-Input p-1 col-span-1"
            aria-autocomplete="list"
            aria-labelledby="docsearch-label"
            id="docsearch-input"
            placeholder="Search docs"
            type="text"
          ></input>
        </div>
      </div>
      <div className="my-4">
        <a href="/products/product_insert">
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            create Product
          </button>
        </a>
      </div>
      {/* <div className="grid grid-cols-12 gap-4">
        <div className="col-span-6 bg-blue-500 p-4 text-white">
          ครึ่งหนึ่งของแถว
        </div>
        <div className="col-span-6 bg-green-500 p-4 text-white">
          ครึ่งหนึ่งของแถว
        </div>
      </div> */}
    </div>
  );
};

export default Products;
