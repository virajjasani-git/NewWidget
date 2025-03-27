const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));
function parseCookies(response) {
  const raw = response.headers.raw()["set-cookie"];
  return raw
    .map((entry) => {
      const parts = entry.split(";");
      const cookiePart = parts[0];
      return cookiePart;
    })
    .join(";");
}
async function auth3DEXPERIENCE(passportURL, username, password, spaceURL, tenant) {
  let cookies = "";
  const lt = await fetch(`${passportURL}/login?action=get_auth_params`)
    .then((res) => {
      cookies = parseCookies(res);
      return res.json();
    })
    .then((data) => data.lt);
  const options = {
    redirect: "manual",
    method: "POST",
    headers: {
      cookie: cookies,
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
    body: `lt=${lt}&username=${username}&password=${password}`,
  };
  cookies = cookies + ";" + (await fetch(`${passportURL}/login`, options).then((res) => parseCookies(res)));
  let csrf = await fetch(`${spaceURL}/resources/v1/application/CSRF?tenant=${tenant}`, {
    method: "GET",
    headers: { cookie: cookies },
  })
    .then((res) => {
      cookies = cookies + ";" + parseCookies(res);
      return res.json();
    })
    .then((data) => {
      console.log(data);
      return data.csrf;
    });
  return { cookie: cookies, csrf: csrf };
}
export default auth3DEXPERIENCE;
