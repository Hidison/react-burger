export function setCookie(name: string, value: string, props: any) {
  props = props || {};
  let exp = props.expires;
  if (typeof exp == "number" && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp && exp.toUTCString) {
    props.expires = exp.toUTCString();
  }
  value = encodeURIComponent(value);
  let updatedCookie = name + "=" + value;
  for (const propName in props) {
    updatedCookie += "; " + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }
  document.cookie = updatedCookie;
}

export function getCookie(name: string) {
  const matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function deleteCookie(name: string) {
  setCookie(name, "", {
    "max-age": -1,
  });
}

export function getIngIdFromLocation(pathname: string) {
  return pathname.replace(/ingredients/, "").replace(/[^a-zа-яё0-9\s]/gi, "");
}

export function getOrderFromLocation(pathname: string) {
  return pathname
    .replace(/feed/, "")
    .replace(/profile/, "")
    .replace(/orders/, "")
    .replace(/[^a-zа-яё0-9\s]/gi, "");
}

export const checkResponse = (res: any) => {
  if (res.ok) {
    return res.json();
  } else {
    return res.json().then((err: string) => Promise.reject(err));
  }
};

export function request(url: string, options: any) {
  return fetch(url, options).then(checkResponse);
}
