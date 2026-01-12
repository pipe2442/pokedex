import { PaginationProps } from "@/types/pokemon";

export default function Pagination({
  page,
  totalPages,
  onPageChange,
}: PaginationProps) {
  return (
    <div className="flex justify-center items-center gap-6 pb-10">
      <button
        disabled={page === 1}
        onClick={() => onPageChange(Math.max(1, page - 1))}
        className="cursor-pointer px-6 py-2 bg-[#DC0A2D] text-white rounded-full font-bold shadow-md disabled:bg-gray-300 transition-all hover:scale-105 active:scale-95"
      >
        Prev
      </button>

      <span className="font-medium text-[#666666]">
        Page {page} of {totalPages}
      </span>

      <button
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
        className="cursor-pointer px-6 py-2 bg-[#DC0A2D] text-white rounded-full font-bold shadow-md transition-all hover:scale-105 active:scale-95 disabled:bg-gray-300"
      >
        Next
      </button>
    </div>
  );
}
