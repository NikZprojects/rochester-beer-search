import Link from "next/link";

export default function SearchBar({ searchTerm, setSearchTerm, section }) {
  return (
    <div className="w-100">
      <h1 className="text-center text-lg font-semibold">
        Search Breweries, Beers & Styles
        {section ? ` in Section ${section.toUpperCase()}` : ""}:
      </h1>
      <input
        className="mt-3 peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-sky-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
        type="text"
        placeholder="Search..."
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
        value={searchTerm}
        autoFocus
      />
      {section && (
        <div className="w-100 mt-8 text-center">
          <Link className="text-sky-600" href="/">
            Back to All Beers
          </Link>
        </div>
      )}
    </div>
  );
}
