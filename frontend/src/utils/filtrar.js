import { createURLSearch } from "./createURLSearch";

// Função para realizar as buscas na API, gera o link com a função e se o link for diferente do atual ele busca. se não não busca
export function filtrar(route, querys, router) {

  let urlSearch = createURLSearch(route, querys);

  if (urlSearch) {
    router.push(urlSearch);
  }
}

  