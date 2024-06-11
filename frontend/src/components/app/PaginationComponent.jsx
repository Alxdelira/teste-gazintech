"use client"

import { useEffect, useState } from "react";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, PaginationEllipsis } from "../ui/pagination";

export default function PaginationComponent({ maxPageComponent = 3, totalPages, currentPage, querys, route, wordQueryPage = "pagina" }) {

  const [paginas, setPaginas] = useState([]);

  function paginationFunction(maxPageComponent, currentPage, totalPages) {
    let pages = [];
    let metade = Math.floor(maxPageComponent / 2);
    let pinicio = parseInt(currentPage) - metade;
    let pfim = parseInt(currentPage) + metade;

    if (pinicio <= 0) {
      pfim += 1 - pinicio;
      pinicio = 1;
    }

    if (pfim > totalPages) {
      pinicio += totalPages - pfim;
      pfim = totalPages;
    }

    for (let i = pinicio; i <= pfim; i++) {
      if (i <= 0 || i > totalPages) continue;

      let link = gerarLink(querys, i);

      pages.push({ id: i, page: i, active: Number(currentPage) === i ? true : false, link: link });
    }

    return pages;
  }

  function gerarLink(querys, page) {
    let link = route;

    if (page) querys = { ...querys, ...{ [wordQueryPage]: page } };

    let newQuerys = new URLSearchParams(querys);

    link = link + `?${newQuerys.toString()}`

    return link;
  }

  useEffect(() => {
    setPaginas(paginationFunction(maxPageComponent, currentPage, totalPages));
  }, [querys, currentPage, totalPages]);

  function encontrarNumero(numero) {
    if (paginas.find(n => Number(n.page) === numero)) return true;

    return false;
  }

  return (
    <Pagination className={"m-4"}>
      <PaginationContent>

        <PaginationItem>
          <PaginationPrevious
            title={"Ir para página anterior"}
            href={gerarLink(querys, currentPage - 1)}
            aria-disabled={Number(currentPage) === 1}
            className={Number(currentPage) === 1 ? "pointer-events-none opacity-50" : undefined}
          />
        </PaginationItem>

        {!encontrarNumero(1) && (
          <PaginationItem>
            <PaginationLink href={gerarLink(querys, 1)} title={"Ir para página 1"}>
              1
            </PaginationLink>
          </PaginationItem>
        )}

        {!paginas.find((page) => page.page - 1 == 1) && paginas.length >= maxPageComponent && (
          <PaginationEllipsis />
        )}

        {paginas?.map((pagina) => (
          <PaginationItem key={pagina?.id}>
            <PaginationLink isActive={pagina.active} href={pagina?.link} title={`Ir para página ${pagina?.page}`}>
              {pagina?.page}
            </PaginationLink>
          </PaginationItem>
        ))}

        {!paginas.find((page) => page.page + 1 == totalPages) && paginas.length >= maxPageComponent && (
          <PaginationEllipsis />
        )}

        {!encontrarNumero(totalPages) && (
          <PaginationItem>
            <PaginationLink href={gerarLink(querys, totalPages)} title={`Ir para página ${totalPages}`}>
              {totalPages}
            </PaginationLink>
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationNext
            title={"Ir para próxima página"}
            href={gerarLink(querys, currentPage + 1)}
            aria-disabled={Number(currentPage) === totalPages}
            className={Number(currentPage) === totalPages ? "pointer-events-none opacity-50" : undefined}
          />
        </PaginationItem>

      </PaginationContent>
    </Pagination>
  )
}
