// Máscara para formatar a data tanto se for com hora e dia ou só se for apenas a data ano mes e dia
export const formatarData = (dataParam) => {
    if (dataParam) {
        const data = new Date(dataParam);

        const ano = data.getFullYear();
        const mes = String(data.getMonth() + 1).padStart(2, '0');
        const dia = String(data.getDate()).padStart(2, '0');

        if (/^\d{4}\-\d{2}\-\d{2}T/.test(dataParam)) {
            const horas = String(data.getHours()).padStart(2, '0');
            const minutos = String(data.getMinutes()).padStart(2, '0');
            const segundos = String(data.getSeconds());

            return `${dia}/${mes}/${ano}`;
        } else {
            return `${dia}/${mes}/${ano}`;
        }
    }
}


export const mascaraSexo = (sexo) => {
    switch (sexo) {
        case 'M':
            return 'Masculino';
        case 'F':
            return 'Feminino';
        case 'O':
            return 'Outro';
        default:
            return 'Não informado';
    }
}
export const formatarDataInput = (dataParam) => {
    if (dataParam) {
      const data = new Date(dataParam);
  
      const ano = data.getFullYear();
      const mes = String(data.getMonth() + 1).padStart(2, '0');
      const dia = String(data.getDate()).padStart(2, '0');
  
      if (/^\d{4}\-\d{2}\-\d{2}T/.test(dataParam)) {
        const horas = String(data.getHours()).padStart(2, '0');
        const minutos = String(data.getMinutes()).padStart(2, '0');
  
        return `${ano}-${mes}-${dia}`;
      } else {
        return `${ano}-${mes}-${dia}`;
      }
    }
  }
  
