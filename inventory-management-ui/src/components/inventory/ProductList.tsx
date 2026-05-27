import React from "react";
import { AddProductButton } from "./AddProductButton";
import { Pagination } from "../shared/Pagination";
import type { ProductListProps } from "@/types/components/inventory";

export const ProductList: React.FC<ProductListProps> = ({
  products,
  loading,
  error,
  onEdit,
  onDelete,
  onAddClick,
  showForm,
  currentPage,
  totalPages,
  onPageChange,
  handleSortChange,
  sortBy,
  sortDirection,
}) => {
  const effectiveSortBy = sortBy ?? "name";
  const effectiveSortDirection = sortDirection ?? "asc";
  const handleSort = handleSortChange ?? (() => {});

  return (
    <>
      <div className="mb-4 flex flex-col items-center justify-between gap-4 md:flex-row md:gap-0">
        {!showForm && (
          <AddProductButton onClick={onAddClick} isLoading={loading} />
        )}
      </div>

      {loading && products.length === 0 && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {!loading && !error && products.length === 0 && <p>Empty inventory.</p>}

      {loading && products.length > 0 && (
        <div className="mb-2 text-center text-xs text-win98-dark">
          Updating...
        </div>
      )}

      {!error && products.length > 0 && (
        <>
          {/* desktop table */}
          <div
            className={`hidden w-full overflow-x-auto md:block ${
              loading ? "pointer-events-none opacity-70" : ""
            }`}
          >
            <table className="retro-table w-full table-fixed">
              <thead>
                <tr>
                  <th
                    onClick={() => handleSort("name")}
                    className="w-2/5 cursor-pointer select-none"
                  >
                    Name{" "}
                    <span className="inline-block w-4 scale-75 text-center">
                      {effectiveSortBy === "name"
                        ? effectiveSortDirection === "asc"
                          ? "▲"
                          : "▼"
                        : "\u00A0"}
                    </span>
                  </th>

                  <th
                    onClick={() => handleSort("price")}
                    className="w-1/5 cursor-pointer select-none"
                  >
                    Price{" "}
                    <span className="inline-block w-4 scale-75 text-center">
                      {effectiveSortBy === "price"
                        ? effectiveSortDirection === "asc"
                          ? "▲"
                          : "▼"
                        : "\u00A0"}
                    </span>
                  </th>

                  <th
                    onClick={() => handleSort("quantity")}
                    className="w-1/5 cursor-pointer select-none"
                  >
                    Quantity{" "}
                    <span className="inline-block w-4 scale-75 text-center">
                      {effectiveSortBy === "quantity"
                        ? effectiveSortDirection === "asc"
                          ? "▲"
                          : "▼"
                        : "\u00A0"}
                    </span>
                  </th>

                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr
                    key={product.id}
                    onClick={() => onEdit(product)}
                    className="cursor-pointer hover:bg-[#ffff99]"
                  >
                    <td>{product.name}</td>
                    <td>
                      {product.price.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </td>
                    <td>{product.quantity}</td>
                    <td>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onEdit(product);
                        }}
                        className="retro-btn mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDelete(product.id);
                        }}
                        className="retro-btn"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* mobile cards */}
          <div
            className={`grid grid-cols-1 gap-4 md:hidden ${loading ? "pointer-events-none opacity-70" : ""}`}
          >
            {products.map((product) => (
              <div
                key={product.id}
                onClick={() => onEdit(product)}
                className="flex cursor-pointer justify-between border-2 border-solid border-b-win98-shadow border-l-win98-highlight border-r-win98-shadow border-t-win98-highlight bg-white p-4"
              >
                <div className="flex flex-col items-start gap-2">
                  <p className="text-sm font-semibold">{product.name}</p>
                  <p className="text-sm">
                    {product.price.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </p>
                  <p className="text-sm">{product.quantity} units</p>
                </div>
                <div className="flex flex-col justify-between py-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit(product);
                    }}
                    className="retro-btn mb-1"
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(product.id);
                    }}
                    className="retro-btn"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-4 border-t-2 border-t-win98-shadow pt-4">
              <Pagination
                current={currentPage}
                total={totalPages}
                onPageChange={onPageChange}
              />
            </div>
          )}
        </>
      )}
    </>
  );
};
