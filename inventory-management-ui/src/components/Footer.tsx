// src/components/Footer.tsx

const Footer = () => {
  return (
    <footer className="fixed bottom-0 w-full bg-black py-4 text-center text-sm text-white">
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
