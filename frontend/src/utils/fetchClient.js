
import axios from 'axios';

export async function getData(route, query) {
  try {
    const params = new URLSearchParams(query).toString();
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}${route}?${params}`);

    if (!response.data) {
      return { data: [], meta: { total: 0 }, error: { message: 'Ocorreu um erro inesperado, contate o Administrador' } };
    }

    return response.data;
  } catch (error) {
    return { data: [], meta: { total: 0 }, error: { message: 'Ocorreu um erro inesperado, contate o Administrador' } };
  }
}


export async function postData(route, data) {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}${route}`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.data) {
      return { data: [], error: { message: 'Ocorreu um erro inesperado, contate o Administrador' } };
    }

    return response.data;
  } catch (error) {
    return { data: [], error: { message: error?.message ?? 'Ocorreu um erro inesperado, contate o Administrador' } };
  }
}

export async function editData(route, data, id) {
  try {
    const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}${route}/${id}`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    );

    if (!response.data) {
      return { data: [], error: { message: 'Ocorreu um erro inesperado, contate o Administrador' } };
    }

    return response.data;
  } catch (error) {
    return { data: [], error: { message: error?.message ?? 'Ocorreu um erro inesperado, contate o Administrador' } };
  }
}

export async function deleteData(route) {
  try {
    const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}${route}`);

    if (!response.data) {
      return { data: [], error: { message: 'Ocorreu um erro inesperado, contate o Administrador' } };
    }

    return response.data;
  } catch (error) {
    return { data: [], error: { message: error?.message ?? 'Ocorreu um erro inesperado, contate o Administrador' } };
  }
}

