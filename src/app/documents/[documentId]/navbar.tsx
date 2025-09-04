import React from "react";
import Image from "next/image";
import Link from "next/link";

const NavBar = () => {
  return (
    <header>
      <nav className="flex items-center justify-between">
        <div className="flex gap-2 items-center">
          <Link href={"/"}>
            <Image src="/logo.svg" alt="Logo" width={36} height={46} />
          </Link>
          <div className="flex flex-col">
            {/* DocumentInput */}
            {/* MenuBar */}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
