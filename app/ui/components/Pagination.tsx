import Link from "next/link";

type SearchParams = {
  [key: string]: string | string[] | undefined;
};

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  searchParams: SearchParams;
};

function buildHref(page: number, searchParams: SearchParams) {
  const params = new URLSearchParams();

  Object.entries(searchParams).forEach(([key, value]) => {
    if (!value || key === "page") return;

    if (Array.isArray(value)) {
      value.forEach((v) => params.append(key, v));
    } else {
      params.set(key, value);
    }
  });

  params.set("page", String(page));

  const queryString = params.toString();
  return queryString ? `?${queryString}` : "?";
}

export default function Pagination({
  currentPage,
  totalPages,
  searchParams,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;

  return (
    <nav
      aria-label="Pagination"
      className="mt-6 flex items-center justify-center gap-2"
    >
      {hasPrev ? (
        <Link
          href={buildHref(currentPage - 1, searchParams)}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 transition-colors rounded cursor-pointer"
        >
          Previous
        </Link>
      ) : (
        <span className="px-4 py-2 bg-gray-200 hover:bg-gray-300 transition-colors rounded cursor-pointer">
          Previous
        </span>
      )}

      {pages.map((page) => (
        <Link
          key={page}
          href={buildHref(page, searchParams)}
          aria-current={page === currentPage ? "page" : undefined}
          className={`px-4 py-2 text-sm rounded ${
            page === currentPage
              ? "font-semibold bg-gray-800 text-white"
              : "bg-white hover:bg-gray-200 transition-colors"
          }`}
        >
          {page}
        </Link>
      ))}

      {hasNext ? (
        <Link
          href={buildHref(currentPage + 1, searchParams)}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 transition-colors rounded cursor-pointer"
        >
          Next
        </Link>
      ) : (
        <span className="px-4 py-2 bg-gray-200 hover:bg-gray-300 transition-colors rounded cursor-pointer">
          Next
        </span>
      )}
    </nav>
  );
}
