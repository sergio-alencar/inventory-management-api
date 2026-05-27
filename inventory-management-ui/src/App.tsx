import { useEffect, useState } from "react";
import { DesktopIcon } from "./components/desktop/DesktopIcon";
import { InventoryWindow } from "./components/windows/InventoryWindow";
import { ProductForm } from "./components/inventory/ProductForm";
import { ConfirmModal } from "./components/shared/ConfirmModal";
import { ErrorModal } from "./components/shared/ErrorModal";
import { Footer } from "./components/taskbar/Footer";
import { useProducts } from "./hooks/useProducts";
import { FolderIcon } from "./components/icons/FolderIcon";
import type { Product } from "./types";
import "./App.css";
import { Notepad } from "./components/windows/Notepad";
import notepadIcon from "./assets/images/notepad-icon.png";
import { useWindowManager } from "./hooks/useWindowManager";

function App() {
  const {
    windows,
    activeWindow,
    isMaximized,
    open,
    close,
    minimize,
    toggleMaximize,
    handleTaskbarClick,
    activate,
  } = useWindowManager();

  const {
    products,
    loading,
    error,
    currentPage,
    totalPages,
    handlePageChange,
    handleDelete,
    refresh,
    sortBy,
    sortDirection,
    handleSortChange,
  } = useProducts();

  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState<number | null>(
    null,
  );
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);

  const requestDelete = (id: number) => {
    setProductIdToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (productIdToDelete) {
      const errMsg = await handleDelete(productIdToDelete);

      if (errMsg) {
        setErrorMessage(errMsg);
        setIsErrorModalOpen(true);
      }

      setIsDeleteModalOpen(false);
      setProductIdToDelete(null);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleSuccess = () => {
    setShowForm(false);
    setEditingProduct(null);
    refresh();
  };

  const showError = (message: string) => {
    setErrorMessage(message);
    setIsErrorModalOpen(true);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        if (selectedIcon === "inventory") {
          open("inventory");
        } else if (selectedIcon === "readme") {
          open("readme");
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIcon, open]);

  return (
    <div className="flex min-h-screen flex-col bg-win98-desktop">
      <main
        className="relative flex-1 overflow-hidden"
        onClick={() => setSelectedIcon(null)}
      >
        <div className="absolute left-4 top-4 flex flex-col gap-4">
          <DesktopIcon
            icon={<FolderIcon className="h-10 w-10" />}
            label="Inventory"
            selected={selectedIcon === "inventory"}
            onClick={() => setSelectedIcon("inventory")}
            onDoubleClick={() => open("inventory")}
          />
          <DesktopIcon
            icon={<img src={notepadIcon} alt="Notepad" className="h-10 w-10" />}
            label="README"
            selected={selectedIcon === "readme"}
            onClick={() => setSelectedIcon("readme")}
            onDoubleClick={() => open("readme")}
          />
        </div>

        <InventoryWindow
          isOpen={windows.inventory.isOpen}
          onClose={() => close("inventory")}
          onMinimize={() => minimize("inventory")}
          onMaximize={toggleMaximize}
          isMaximized={isMaximized}
          products={products}
          loading={loading}
          error={error}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          onEdit={handleEdit}
          onDelete={requestDelete}
          onAddClick={() => {
            setEditingProduct(null);
            setShowForm(true);
          }}
          showForm={showForm}
          isActive={activeWindow === "inventory"}
          onActivate={() => activate("inventory")}
          zIndex={activeWindow === "inventory" ? 20 : 10}
          isMinimized={windows.inventory.isMinimized}
          sortBy={sortBy}
          sortDirection={sortDirection}
          handleSortChange={handleSortChange}
        />

        <Notepad
          isOpen={windows.readme.isOpen}
          onClose={() => close("readme")}
          isActive={activeWindow === "readme"}
          onActivate={() => activate("readme")}
          zIndex={activeWindow === "readme" ? 20 : 10}
          onMinimize={() => minimize("readme")}
          isMinimized={windows.readme.isMinimized}
        />
      </main>

      {showForm && (
        <ProductForm
          productToEdit={editingProduct}
          onSuccess={handleSuccess}
          onCancel={() => setShowForm(false)}
          onError={showError}
        />
      )}

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        title="Confirm Deletion"
        message="Are you sure you want to remove this product?"
        onConfirm={confirmDelete}
        onCancel={() => setIsDeleteModalOpen(false)}
      />

      <ErrorModal
        isOpen={isErrorModalOpen}
        message={errorMessage}
        onClose={() => setIsErrorModalOpen(false)}
      />

      <Footer
        onOpenInventory={() => open("inventory")}
        onOpenReadMe={() => open("readme")}
        windows={[
          {
            id: "inventory",
            label: "Inventory",
            isOpen: windows.inventory.isOpen,
            isActive: activeWindow === "inventory",
            onClick: () => handleTaskbarClick("inventory"),
            icon: <FolderIcon className="mr-1 inline-block h-3 w-3" />,
          },
          {
            id: "readme",
            label: "README",
            isOpen: windows.readme.isOpen,
            isActive: activeWindow === "readme",
            onClick: () => handleTaskbarClick("readme"),
            icon: (
              <img
                src={notepadIcon}
                alt=""
                className="mr-1 inline-block h-3 w-3"
              />
            ),
          },
        ]}
      />
    </div>
  );
}

export default App;
