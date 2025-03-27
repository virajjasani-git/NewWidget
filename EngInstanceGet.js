import "dotenv/config";
import auth3DEXPERIENCE from "./auth3DEXPERIENCE.js";
const username = process.env.USERNAME1;
const password = process.env.PASSWORD1;
const passportURL = process.env.PASSPORT;
const spaceURL = process.env.SPACE;
const tenant = process.env.TENANT;
const securityContext = process.env.CONTEXT;
const objectId = "196802D3B413310067E529B4000002C9";
auth3DEXPERIENCE(passportURL, username, password, spaceURL, tenant).then((client) => {
  fetch(`${spaceURL}/resources/v1/modeler/dseng/dseng:EngItem/${objectId}?$mask=dsmveng:EngItemMask.Details`, {
    redirect: "manual",
    method: "GET",
    headers: {
      Connection: "keep-alive",
      cookie: client.cookie,
      ENO_CSRF_TOKEN: client.csrf.value,
      SecurityContext: securityContext,
      Accept: "application/json",
      "content-type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => console.log(JSON.stringify(data)));
});
