export function valorCookie(nombre){
      let valor = document.cookie;

      if (valor.length > 0){
            valor = valor.split('; ')
            .find((row) => row.startsWith(nombre + "="))
            .split('=')[1];
      }
      
      return valor;
}

export function borrarCookie(nombre){
      document.cookie = nombre + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}