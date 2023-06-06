"use client"; // This is a client component
import Image from "next/image";
import BreweriesList from "./components/BreweriesList";
import SearchBar from "./components/SearchBar";
import React, { useState } from "react";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-xl font-bold text-center">
        <i>Unofficial </i> Search Page for Rochester Real Beer Expo 2023
      </h1>
      <Image
        className="pt-10 pb-10"
        src="/beerExpoImage.jpeg"
        height="200"
        width="500"
        alt="Rochester Beer Expo Promotional Image"
        priority
      ></Image>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <BreweriesList searchTerm={searchTerm} />
    </main>
  );
}
