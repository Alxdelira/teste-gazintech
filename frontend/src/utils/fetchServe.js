
// se o método for get os dados serão querys (params) se não será dados mesmo tipo body para post ou patch etc...

export const fetchServer = async (route, method, dados,  ...props) => {
    try {
      let urlApi = "http://localhost:3340/api/";  
  
      if (method === "GET" && dados) {
        let urlSearch = new URLSearchParams(dados);
        route = `${route}?${urlSearch}`;
      }        
  
      let headers = {
        "Content-Type": "application/json",
        "accept": "application/json",
      }
  
      const response = await fetch(`${urlApi}${route}`, {
        ...props,
        method: method,
        headers: headers,
        body: method !== "GET" && dados ? JSON.stringify(dados) : null
      })
  
      const responseData = await response.json();
  
      // se erro retorna o array de dados vazio
      if (responseData?.error) {
        return { data: [], error: true, errors: responseData?.errors ?? [{ message: "Não foi possível identificar o erro, contate o Administrador" }] };
      } else {
        return responseData;
      }
  
    } catch (error) {
      // se erro retorna o array de dados vazio
  
      return { data: [], error: true, errors: [{ message: error?.message ?? "Ocorreu um erro inesperado, contate o Administrador" }] };
    }
  }
  