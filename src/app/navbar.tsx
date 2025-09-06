import React from "react";
import Link from "next/link";
import Image from "next/image";
import SearchInput from "./_components/SearchInput";
import { UserButton } from "@clerk/nextjs";

const NavBar = () => {
  return (
    <nav className="flex items-center justify-between h-full w-full px-4">
      <div className="shrink-0 pr-3">
        <Link href={"/"} className="flex gap-3 items-center">
          <Image
            className=""
            src={"/logo.svg"}
            alt="logo"
            width={32}
            height={32}
          />
          <span className="text-lg">Doczilla</span>
        </Link>
      </div>
      <SearchInput />
      <UserButton />
    </nav>
  );
};

export default NavBar;
