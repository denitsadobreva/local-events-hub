import Filter from "@/components/Filter";
import SearchBar from "@/components/SearchBar";

export default function EventsHeader() {
  return (
    <>
      <h1 className="font-semibold text-2xl text-gray-800">Events</h1>
      <SearchBar />
      <Filter />
    </>
  );
}
