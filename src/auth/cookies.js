import cookie from "js-cookie";

// Set the cookie
export const setCookie = (key, value) => {
  cookie.set(key, value, {
    expires: 7,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
};

// Remove the cookie
export const removeCookie = (key) => {
  cookie.remove(key);
};

// Check if the cookie exists on client side or server side and get it
export const getCookie = (key, req) => {
  return process.browser
    ? getCookieFromBrowser(key)
    : getCookieFromServer(key, req);
};

// Get the cookie from client side
export const getCookieFromBrowser = (key) => {
  return cookie.get(key);
};

// Get the cookie on server side
export const getCookieFromServer = (key, req) => {
  if (!req.headers.cookie) {
    return undefined;
  }
  const rawCookie = req.headers.cookie
    .split(";")
    .find((c) => c.trim().startsWith(`${key}=`));
  if (!rawCookie) {
    return undefined;
  }
  return rawCookie.split("=")[1];
};

// Redirect on server side
export const redirectServerSide = (context) => {
  if (context.req.headers.cookie) {
    const token = getCookie("authToken", context.req);
    if (token) {
      context.res.statusCode = 302;
      context.res.setHeader("Location", `/`);
    }
  }
};
