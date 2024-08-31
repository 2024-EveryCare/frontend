export const setCookie = (
  name: string,
  value: string,
  minutes: number,
  session = true,
) => {
  const date = new Date();
  date.setTime(date.getTime() + minutes * 60 * 1000); // minutes를 밀리초로 변환
  const expires = session ? '' : `; expires=${date.toUTCString()}`;
  // 쿠키 값을 인코딩하여 설정
  document.cookie = `${name}=${encodeURIComponent(value || '')}${expires}; path=/`;
};

// 쿠키 가져오기 함수
export const getCookie = (name: string) => {
  const nameEQ = `${name}=`;
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) {
      // 쿠키 값을 디코딩하여 반환
      return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }
  }
  return null;
};

// 쿠키 삭제 함수
export const eraseCookie = (name: string) => {
  document.cookie = `${name}=; Max-Age=-99999999;`;
};

export const isCookieExpired = (name: string): boolean => {
  const cookieValue = getCookie(name);

  if (cookieValue === null) {
    // 쿠키가 없으면 삭제
    eraseCookie(name);
    eraseCookie('JSESSIONID');
    return false; // 만료된 것으로 간주
  }

  return true; // 유효한 쿠키
};
