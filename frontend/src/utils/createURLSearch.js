"use client"

export function handleDate(data) {
    if (/^\d{4}\-\d{2}\-\d{2}T/.test(data)) {
      return new Date(data).toISOString();
    } else {
      return data;
    }
  }
  

// Função para criar link juntando a rota com as querys. ex: /reservas?motorista=id&veiculo=id&filtro=aberto
export function createURLSearch(route, querys) {

  let searchParams;

  if (typeof window !== "undefined") {
    searchParams = new URLSearchParams(window.location.search);
  }

  let oldLink = `${route}?${searchParams}`;

  for (let query in querys) {

    // variavel para verificar se o valor é o id dentro do objeto ou apenas o valor para validar no if abaixo, pois o id dentro do objeto pode ser vazio também, por isso é usado apenas aqui
    let queryValue = querys[query]?.hasOwnProperty("id") ? querys[query]?.id : querys[query]; 

    // verificar se a query é vazia, undefined, null ou all, o all é porque o shadcnui não recebe string vazia nas options ai o all serve para dizer que seria todas as opções
    if (queryValue === undefined || queryValue === "" || queryValue === null || queryValue === "all") {
      
      if (searchParams.has(query)) {
        searchParams.delete(query);
      }

      continue;
    }

    if (searchParams.has(query) && queryValue === searchParams.get(query)) {
      continue;
    } else if (searchParams.has(query) && queryValue !== searchParams.get(query)) {

      if (typeof querys[query] === "object") {
        searchParams.set(query, queryValue);
      } else {
        if (/^\d{4}\-\d{2}\-\d{2}T?/.test(queryValue)) {
          searchParams.append(query, handleDate(queryValue));
        } else {
          searchParams.set(query, queryValue);
        }
      }

    } else {
      if (typeof querys[query] === "object") {
        searchParams.append(query, queryValue);
      } else {
        if (/^\d{4}\-\d{2}\-\d{2}T?/.test(queryValue)) {
          searchParams.append(query, handleDate(queryValue));
        } else {
          searchParams.append(query, queryValue);
        }
      }
    }
  }

  // verifico se as querys são iguais, a que ja tinha e a nova, se for igual ele apenas retorna falso, se não retorna o link novo
  let newLink = `${route}?${searchParams}`;

  return newLink === oldLink ? false : newLink;
}
