import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

export default function VodPagination({
  currentPage,
  baseUrl,
  paramPrefix = '?',
}: {
  currentPage: number;
  baseUrl: string;
  paramPrefix?: string;
}) {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            aria-disabled={currentPage <= 1}
            tabIndex={currentPage <= 1 ? -1 : undefined}
            className={
              currentPage <= 1 ? 'pointer-events-none opacity-50' : undefined
            }
            href={`${baseUrl}${paramPrefix}page=${currentPage - 1}`}
          />
        </PaginationItem>
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationLink
              href={`${baseUrl}${paramPrefix}page=${currentPage - 1}`}
            >
              {currentPage - 1}
            </PaginationLink>
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationLink isActive href='#'>
            {currentPage}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            href={`${baseUrl}${paramPrefix}page=${currentPage + 1}`}
          >
            {currentPage + 1}
          </PaginationLink>
        </PaginationItem>
        {currentPage <= 1 && (
          <PaginationItem>
            <PaginationLink
              href={`${baseUrl}${paramPrefix}page=${currentPage + 2}`}
            >
              {currentPage + 2}
            </PaginationLink>
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationNext
            href={`${baseUrl}${paramPrefix}page=${currentPage + 1}`}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
