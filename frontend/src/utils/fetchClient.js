import { data } from "autoprefixer";

export async function fetchDesenvolvedores(query) {
  try {
    const params = new URLSearchParams(query).toString();
    const response = await fetch(`http://localhost:3333/api/desenvolvedores?${params}`, {
      method: 'GET',
    });

    if (!response.ok) {
      return { data: [], meta: { total: 0 }, error: { message: error?.message ?? 'Ocorreu um erro inesperado, contate o Administrador' } };
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return { data: [], meta: { total: 0 }, error: { message: error?.message ?? 'Ocorreu um erro inesperado, contate o Administrador' } };
  }
}