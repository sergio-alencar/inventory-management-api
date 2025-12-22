// inventory-management-ui/src/components/Header.tsx

import { HomeImg } from "./images/HomeImg";

const Header = () => {
  return (
    <header className="grid items-center bg-indigo-950 py-4 max-md:grid-cols-1">
      <a
        href="/"
        title="Home"
        className="absolute ml-8 size-10 justify-center fill-slate-50 max-md:ml-1 max-md:hidden"
      >
        <HomeImg />
      </a>

      <h1 className="select-none text-center text-4xl font-black uppercase tracking-wider text-slate-50 max-lg:text-2xl max-md:text-lg">
        Gestão de Inventário
      </h1>
    </header>
  );
};

export default Header;
