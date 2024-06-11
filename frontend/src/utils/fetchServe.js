export const fetchServer = async (route, method, dados, ...props) => {
    const URL_API = "http://localhost:3340/api/";
  
    try {
      if (method === "GET" && dados) {
        const urlSearch = new URLSearchParams(dados);
        route = `${route}?${urlSearch}`;
      }
  
      const methodsWithBody = ["POST", "PUT", "PATCH"];
      const shouldHaveBody = methodsWithBody.includes(method);
  
      const headers = {
        "Content-Type": "application/json",
        "accept": "application/json",
        ...props.headers,
      };
  
      const response = await fetch(`${URL_API}${route}`, {
        ...props,
        method: method,
        headers: headers,
        body: shouldHaveBody && dados ? JSON.stringify(dados) : null,
      });
  
      if (!response.ok) {
        return {
          data: [],
          error: true,
          errors: [{ message: `HTTP error! status: ${response.status}` }],
        };
      }
  
      let responseData;
      try {
        responseData = await response.json();
      } catch (jsonError) {
        responseData = { error: true, message: "Failed to parse response as JSON" };
      }
  
      if (responseData?.error) {
        return {
          data: [],
          error: true,
          errors: responseData?.errors ?? [{ message: "Não foi possível identificar o erro, contate o Administrador" }],
        };
      } else {
        return responseData;
      }
    } catch (error) {
      return {
        data: [],
        error: true,
        errors: [{ message: error?.message ?? "Ocorreu um erro inesperado, contate o Administrador" }],
      };
    }
  };
  
  