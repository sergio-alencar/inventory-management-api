// src/components/Footer.tsx

const Footer = () => {
  return (
    <footer className="w-full py-4 text-center text-xs font-semibold text-indigo-950">
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

export default Footer;
