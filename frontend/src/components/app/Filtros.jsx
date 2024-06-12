"use client"

import { ChevronDown, ChevronUp, Search, Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";
import { Label } from "../ui/label";

export default function Filtros({ isSearching, primeiroCampo, children }) {

  const searchParams = useSearchParams();

  const handleFiltro = searchParams.get("filtro");

  const [windowLoaded, setWindowLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowLoaded(true);
    }
  }, []);

  if (!windowLoaded) {
    return (
      <div className="flex w-full items-center border p-3 rounded-md bg-blue-100/30 justify-between">

        <div className="w-full">

          <div className="flex justify-between items-end mb-1">
            <h1 className="font-semibold text-lg">Filtros</h1>
            <button disabled={true} type="button" className="flex items-center text-sm gap-2 font-semibold">
              Mais filtros <ChevronDown />
            </button>
          </div>


          <div className="w-full flex justify-center items-center mt-2">
            <div className="flex flex-col w-full space-y-2">
              <Label>Carregando...</Label>
              <Skeleton className="w-full h-[40px] bg-white" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (windowLoaded) return (
    <div className="flex w-full items-center border p-3 rounded-md bg-blue-100/30 justify-between">

      <div className="w-full">

        <div className="flex justify-between items-end mb-1">

          <h1 className="font-semibold text-lg">Filtros</h1>
          <button disabled={!windowLoaded} type="button" className="flex items-center text-sm gap-2 font-semibold"
            onClick={() => {
              let queryParams = new URLSearchParams(window.location.search);

              if (handleFiltro === "aberto") {
                queryParams.delete("filtro");
                window.history.pushState({}, "", `${window.location.pathname}?${queryParams}`);
              } else {
                queryParams.append("filtro", "aberto");
                window.history.pushState({}, "", `${window.location.pathname}?${queryParams}`);
              }
            }} title={handleFiltro === "aberto" ? "Menos filtros" : "Mais filtros"}>
            {handleFiltro === "aberto" ? (
              <>Menos filtros <ChevronUp /> </>
            ) : (
              <>Mais filtros <ChevronDown /> </>
            )}
          </button>
        </div>


        <div className="flex items-end">
          <div className="flex w-full items-end gap-2">

            <div className="w-full">
              {primeiroCampo}
            </div>


            {handleFiltro !== "aberto" && (
              <Button
                type="submit"
                title={"Realizar busca"}
                disabled={isSearching || !windowLoaded}>
                {isSearching ? <Loader2 className='mr-2 h-4 w-4 animate-spin' /> : <Search className='mr-2 h-4 w-4' />}
                Pesquisar
              </Button>

            )}
          </div>
        </div>

        <div className="w-full gap-2 flex">
          {handleFiltro === "aberto" && (
            <div className="w-full grid grid-cols-1 items-end 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 gap-2 mt-1">
              {children}
              {handleFiltro === "aberto" && (
                <Button
                  type="submit"
                  className="mt-4 justify-self-end cold-end-auto md:col-end-3 xl:col-end-4 2xl:col-end-5"
                  title={"Realizar busca"}
                  disabled={isSearching}>
                  {isSearching ? <Loader2 className='mr-2 h-4 w-4 animate-spin' /> : <Search className='mr-2 h-4 w-4' />}
                  Pesquisar
                </Button>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
