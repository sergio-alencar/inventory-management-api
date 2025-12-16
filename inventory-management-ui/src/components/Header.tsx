// src/components/Header.tsx

const Header = () => {
  return (
    <header className="grid grid-cols-[auto_1fr_auto] bg-black py-6 font-['Stardos_Stencil'] text-white max-md:grid-cols-1">
      <a
        href="/"
        title="Home"
        className="ml-8 justify-center max-md:ml-1 max-md:hidden"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#ffffff"
          className="size-10"
        >
          <path d="M200-80q-33 0-56.5-23.5T120-160v-451q-18-11-29-28.5T80-680v-120q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v120q0 23-11 40.5T840-611v451q0 33-23.5 56.5T760-80H200Zm0-520v440h560v-440H200Zm-40-80h640v-120H160v120Zm200 280h240v-80H360v80Zm120 20Z" />
        </svg>
      </a>
      <h1 className="self-center text-center text-3xl font-black uppercase max-md:text-lg">
        Gestão de Inventário
      </h1>
      <div></div>
    </header>
  );
};

export default Header;
