import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { ChevronFirst, ChevronLast } from 'lucide-react';

const MAX_PAGE_LIMIT = 500;

export default function VodPagination({
  currentPage,
  baseUrl,
  totalPages = 0,
  paramPrefix = '?',
}: {
  currentPage: number;
  baseUrl: string;
  totalPages?: number;
  paramPrefix?: string;
}) {
  if (totalPages <= 1) return null;
  const total = totalPages > MAX_PAGE_LIMIT ? MAX_PAGE_LIMIT : totalPages;
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationLink
            aria-disabled={currentPage === 1}
            tabIndex={currentPage === 1 ? -1 : undefined}
            className={
              currentPage === 1 ? 'pointer-events-none opacity-50' : undefined
            }
            href={`${baseUrl}${paramPrefix}page=1`}
          >
            <ChevronFirst size={16} />
          </PaginationLink>
        </PaginationItem>
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
        {currentPage > 3 && (
          <PaginationItem>
            <PaginationLink href={`${baseUrl}${paramPrefix}page=1`}>
              1
            </PaginationLink>
          </PaginationItem>
        )}
        {currentPage > 3 && <PaginationItem>...</PaginationItem>}
        {currentPage > 2 && (
          <PaginationItem>
            <PaginationLink
              href={`${baseUrl}${paramPrefix}page=${currentPage - 2}`}
            >
              {currentPage - 2}
            </PaginationLink>
          </PaginationItem>
        )}
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
        {currentPage < total && (
          <PaginationItem>
            <PaginationLink
              href={`${baseUrl}${paramPrefix}page=${currentPage + 1}`}
            >
              {currentPage + 1}
            </PaginationLink>
          </PaginationItem>
        )}
        {currentPage + 1 < total && (
          <PaginationItem>
            <PaginationLink
              href={`${baseUrl}${paramPrefix}page=${currentPage + 2}`}
            >
              {currentPage + 2}
            </PaginationLink>
          </PaginationItem>
        )}
        {currentPage < total - 3 && <PaginationItem>...</PaginationItem>}
        {currentPage < total - 2 && (
          <PaginationItem>
            <PaginationLink href={`${baseUrl}${paramPrefix}page=${total}`}>
              {total}
            </PaginationLink>
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationNext
            aria-disabled={currentPage >= total}
            tabIndex={currentPage >= total ? -1 : undefined}
            className={
              currentPage >= total
                ? 'pointer-events-none opacity-50'
                : undefined
            }
            href={`${baseUrl}${paramPrefix}page=${currentPage + 1}`}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            aria-disabled={currentPage === total}
            tabIndex={currentPage === total ? -1 : undefined}
            className={
              currentPage === total
                ? 'pointer-events-none opacity-50'
                : undefined
            }
            href={`${baseUrl}${paramPrefix}page=${total}`}
          >
            <ChevronLast size={16} />
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
