"use client"; // This is a client component
import Image from "next/image";
import BreweriesList from "./components/BreweriesList";
import SearchBar from "./components/SearchBar";
import React, { useState } from "react";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <main className="flex min-h-screen flex-col px-10 md:px-40 xl:px-96 py-5 mb-10">
      <h1 className="text-xl font-bold text-center pt-5">
        <i>Unofficial </i> Search Page for Rochester Real Beer Expo 2024
      </h1>
      <Image
        className="pt-10 pb-10 mx-auto"
        src="/rochester-real-beer-2024.png"
        height="200"
        width="200"
        alt="Rochester Beer Expo Promotional Image"
        style={{ width: "auto", height: "auto" }}
        priority
      ></Image>

      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <BreweriesList searchTerm={searchTerm} />
    </main>
  );
}
