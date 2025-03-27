import "dotenv/config";
import auth3DEXPERIENCE from "./auth3DEXPERIENCE.js";
const username = process.env.USERNAME1;
const password = process.env.PASSWORD1;
const passportURL = process.env.PASSPORT;
const spaceURL = process.env.SPACE;
const tenant = process.env.TENANT;
const securityContext = process.env.CONTEXT;
const searchStr = "RWX"; // search term atleast 3 characters
auth3DEXPERIENCE(passportURL, username, password, spaceURL, tenant).then((client) => {
  fetch(
    `${spaceURL}/resources/v1/modeler/dseng/dseng:EngItem/search?tenant=${tenant}&$searchStr=${searchStr}&$
top=2&$skip=0`,
    {
      method: "GET",
      headers: {
        Connection: "keep-alive",
        cookie: client.cookie,
        ENO_CSRF_TOKEN: client.csrf,
        SecurityContext: securityContext,
        Accept: "application/json",
      },
    }
  )
    .then((res) => res.json())
    .then((data) => console.log(JSON.stringify(data)));
});
