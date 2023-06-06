export default function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div>
      <h1>Search Beers & Styles:</h1>
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => {
          setSearchTerm(
            e.target.value
              .replace(/[\r\n'*#@]+/gm, "")
              .toLowerCase()
              .trim()
          );
        }}
        value={searchTerm}
        autoFocus
      />
    </div>
  );
}
