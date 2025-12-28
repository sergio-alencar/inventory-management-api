// inventory-management-ui/src/components/Header.tsx

import { HomeImg } from "./images/HomeImg";

export const Header = () => {
  return (
    <header className="grid grid-cols-[auto_2fr_auto] items-center py-6">
      <a href="/" title="Home">
        <HomeImg className="dark:fill-gray-light ml-8 size-10 justify-center max-md:ml-1 max-md:hidden" />
      </a>

      <h1 className="dark:text-gray-light select-none text-center text-xl font-black uppercase tracking-wider md:text-4xl">
        Gestão de Inventário
      </h1>
    </header>
  );
};
