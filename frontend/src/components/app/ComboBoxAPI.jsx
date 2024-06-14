"use client"

import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Check, ChevronsUpDown, Search, Loader2 } from "lucide-react"
import { useEffect, useState, useTransition } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { fetchApi } from "@/utils/fetchClient";

export default function ComboboxAPI({
  endpointPrimary,
  endpointSecondary,
  endpointGetForId,
  selecionado,
  setSelecionado,
  placeholderInputSearch,
  placeholderUnselected,
  selectedField,
  apiResponseAccess = "data",
  renderOption,
  idGetForId
}) {

  const [open, setOpen] = useState(false);
  const [response, setResponse] = useState();
  const [inputValue, setInputValue] = useState("");
  const [isPending, startTransition] = useTransition();

  const debouncedApiCall = () => {
    startTransition(async () => {

      let responsePrimary = await fetchApi(endpointPrimary?.replace("input", inputValue), "GET");
      let responseSecondary;

      if (endpointSecondary) {
        responseSecondary = await fetchApi(endpointSecondary?.replace("input", inputValue), "GET");
      }

      if (responsePrimary && !responseSecondary) {
        setResponse(responsePrimary);
      } else if (responsePrimary[apiResponseAccess].length > 0 && responseSecondary[apiResponseAccess].length > 0) {
        responsePrimary[apiResponseAccess] = responsePrimary[apiResponseAccess].concat(responseSecondary[apiResponseAccess]);
        setResponse(responsePrimary);
      } else if (responsePrimary[apiResponseAccess].length > 0 && responseSecondary[apiResponseAccess].length === 0) {
        setResponse(responsePrimary);
      } else {
        setResponse(responseSecondary);
      }
    })
  }

  async function getForId() {
    const response = await fetchApi(endpointGetForId?.replace("id", idGetForId), "GET");
    console.log(response);
    if (Array.isArray(response)) {
      setResponse({ data: response });
      setSelecionado(response);
    } else {
      setResponse({ data: [response] });
      setSelecionado(response);
    }
  }

  useEffect(() => {

    let getApi = setTimeout(() => {
      debouncedApiCall();
    }, 1000);

    return () => clearTimeout(getApi);

  }, [inputValue]);

  useEffect(() => {
    if (idGetForId && endpointGetForId) {
      getForId();
    }
  }, [idGetForId]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          <span className="overflow-hidden text-ellipsis">
            {selectedField(selecionado) ?? placeholderUnselected}
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height] p-0">
        <Command>
          <div className="flex items-center gap-1 py-2 px-2 border-b border-zinc-300">
            <Search className="w-[16px] text-zinc-400" />
            <input
              type="text"
              className="w-full focus:outline-none text-sm p-1"
              placeholder={placeholderInputSearch}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              autoFocus
              autoComplete="off"
            />
          </div>

          {!isPending && !response?.error && response?.data?.length === 0 && (
            <CommandEmpty>Nenhum resultado encontrado!</CommandEmpty>
          )}

          <CommandList>
            <CommandGroup>
              {!isPending && !response?.error && response?.data?.map((dados, index) => (
                <CommandItem
                  key={dados?._id ?? index}
                  onSelect={() => {
                    dados?._id === selecionado?._id ? setSelecionado() : setSelecionado(dados);
                    setOpen(false);
                  }}
                  value={dados?._id}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selecionado?._id === dados?._id ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {renderOption ? renderOption(dados) : null}
                </CommandItem>
              ))}

              {isPending && (
                <div className="flex justify-center items-center mt-1">
                  <Loader2 className='mr-2 h-6 w-6 animate-spin' color="gray" />
                </div>
              )}

              {!isPending && !response?.error && !response?.data && (
                <div className="flex items-center mt-1">
                  <span className="text-sm p-1">Digite pelo menos 1 caractere</span>
                </div>
              )}

              {!isPending && response?.error && (
                <div className="flex items-center mt-1">
                  <span className="text-sm text-red-600 p-1">Ocorreu um erro ao buscar os dados!</span>
                </div>
              )}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
