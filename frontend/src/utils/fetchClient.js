
// Função para verificar se onde a função está sendo chamada esta do lado do servidor ou esta do lado do cliente
const verificarRenderizacao = () => {
  if (typeof window !== "undefined") {
    return process.env.NEXT_PUBLIC_API_URL;
  } else {
    "use server";

    return process.env.API_URL;
  }
}

// Função fetchApi criada para garantir que todas requisições passem por aqui, garantir mesmo retorno e facilitar as validações em um único lugar

// se o método for get os dados serão querys (params) se não será dados mesmo tipo body para post ou patch etc...
// o isFile é para verificar se está utilizando para requisições de imagem mudar os headers
export const fetchApi = async (route, method, data, ...props) => {
  try {
    // chama  função para pegar o env da API
    let urlApi = verificarRenderizacao();

    // se for método GET recebe as querys e cria uma URL já com encode
    if (method === "GET" && data) {
      let urlSearch = new URLSearchParams(data);
      route = `${route}?${urlSearch}`;
    }

    let headers = {
      "Content-Type": "application/json"
    };


    const response = await fetch(`${urlApi}${route}`, {
      ...props,
      method: method,
      headers: headers,
      body: method !== "GET" && data ? JSON.stringify(data) : null,
      cache: "no-cache"
    })

    const responseData = await response.json();

    // se erro retorna o array de dados vazio
    if (responseData?.error) {
      return {
        data: [],
        meta: responseData?.meta ?? {},
        error: true,
        errors: responseData?.error ?? [{ message: "Não foi possível identificar o erro, contate o Administrador" }]
      };

    } else {
      return responseData;
    }

  } catch (error) {
    // se erro retorna o array de dados vazio

    return {
      data: [],
      error: true,
      errors: [{ message: error?.message ?? "Ocorreu um erro inesperado, contate o Administrador" }]
    };
  }
}

