export const deJSAFechaAmericana = (date) => {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();
  if (month.length < 2)
    month = '0' + month;
  if (day.length < 2)
    day = '0' + day;
  return [year, month, day].join('-');
}

export function dateConvertByHand(fecha) {
  const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  const fechaJS = new Date(fecha);
  return fechaJS.getDate() + 1 + " de " + meses[fechaJS.getMonth()] + " de " + fechaJS.getFullYear();
}

export const sortByCantidadAndFirstLetters = (array, group) => {
  return array.sort((a, b) => group[b].cantidad - group[a].cantidad || group[a].tag.text.charCodeAt(0) - group[b].tag.text.charCodeAt(0) || group[a].tag.text.charCodeAt(1) - group[b].tag.text.charCodeAt(1))
}

export function authHeader() {
  // return authorization header with jwt token
  let token = JSON.parse(localStorage.getItem('token'));
  let header = new Headers({ "Content-Type": "application/json" });
  if (token) {
    //return { 'Authorization': 'Bearer ' + token };

    header.append("Authorization", `Bearer ${token}`)

    return header;
  }

  return header;
}

export function validarMail(mail) {
  let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!mail.match(mailformat)) {
    return false;
  }
  return true;
}

export function isValidUrl(url) {
  const regexp =  /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
  if (regexp.test(url))
    return true;

  return false;
}

export function setCookie(cookieName, cookieValue, cookieExdays) {
  let d = new Date();
  d.setTime(d.getTime() + (cookieExdays * 24 * 60 * 60 * 1000));
  const expires = "expires=" + d.toUTCString();
  document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/";
}

export function getCookie(cookieName) {
  const name = cookieName + "=";
  const ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}