import React from "react";
import Link from "next/link";
import Image from "next/image";
import SearchInput from "./_components/SearchInput";

const NavBar = () => {
  return (
    <nav className="flex items-center justify-between h-full w-full">
      <div className="flex gap-3 items-center shrink-0 pr-3 mt-1">
        <Link href={"/"}>
          <Image
            className=""
            src={"/logo.svg"}
            alt="logo"
            width={36}
            height={36}
          />
        </Link>
        <span className="text-xl">Doczilla</span>
      </div>
      <SearchInput />
      <div></div> {/* Avatar (login/logout) */}
    </nav>
  );
};

export default NavBar;
