"use client"; // This is a client component
import Image from "next/image";
import React, { useState } from "react";
import BreweriesList from "../../components/BreweriesList";
import SearchBar from "../../components/SearchBar";

const section = "e";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <main className="flex min-h-screen flex-col px-10 md:px-40 xl:px-96 py-5 mb-10">
      <h1 className="text-xl font-bold text-center pt-5">
        Beer Section {section.toUpperCase()}
      </h1>
      <Image
        className="pt-10 pb-10 mx-auto"
        src={`/maps/rochester-real-beer-map-${section}.jpg`}
        height="250"
        width="500"
        alt={`Rochester Beer Expo Map ${section}`}
        style={{ width: "auto", height: "auto" }}
        priority
      ></Image>

      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        section={section}
      />
      <BreweriesList searchTerm={searchTerm} section={section} />
    </main>
  );
}
