// inventory-management-ui/src/components/Header.tsx

import { HomeImg } from "./images/HomeImg";

const Header = () => {
  return (
    <header className="bg-brand-darker grid items-center py-4">
      <a
        href="/"
        title="Home"
        className="fill-surface-light absolute ml-8 size-10 justify-center max-md:ml-1 max-md:hidden"
      >
        <HomeImg />
      </a>

      <h1 className="text-surface-light select-none text-center text-xl font-black uppercase tracking-wider md:text-4xl">
        Gestão de Inventário
      </h1>
    </header>
  );
};

export default Header;
