// inventory-management-ui/src/components/Footer.tsx

export const Footer = () => {
  return (
    <footer className="text-blue-darker dark:text-gray-light w-full py-4 text-center text-xs font-semibold">
      <p>
        &copy;{" "}
        <a
          href="https://github.com/sergio-alencar"
          target="_blank"
          title="Meu GitHub"
        >
          Sérgio de Alencar
        </a>{" "}
        - {new Date().getFullYear()}
      </p>
    </footer>
  );
};
