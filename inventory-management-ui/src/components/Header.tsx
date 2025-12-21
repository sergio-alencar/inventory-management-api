// src/components/Header.tsx

import { HomeImg } from "./images/HomeImg";

const Header = () => {
  return (
    <header className="grid grid-cols-[auto_1fr_auto] bg-black py-6 font-['Stardos_Stencil'] text-white max-md:grid-cols-1">
      <a
        href="/"
        title="Home"
        className="ml-8 justify-center max-md:ml-1 max-md:hidden"
      >
        <HomeImg />
      </a>
      <h1 className="self-center text-center text-3xl font-black uppercase max-md:text-lg">
        Gestão de Inventário
      </h1>
      <div></div>
    </header>
  );
};

export default Header;
