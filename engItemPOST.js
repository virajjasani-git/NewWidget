import "dotenv/config";
import auth3DEXPERIENCE from "./auth3DEXPERIENCE.js";
const username = process.env.USERNAME1;
const password = process.env.PASSWORD1;
const passportURL = process.env.PASSPORT;
const spaceURL = process.env.SPACE;
const tenant = process.env.TENANT;
const securityContext = process.env.CONTEXT;
auth3DEXPERIENCE(passportURL, username, password, spaceURL, tenant).then((client) => {
  //console.log("client..." + client);
  fetch(`${spaceURL}/resources/v1/modeler/dseng/dseng:EngItem?$mask=dsmveng:EngItemMask.Details`, {
    redirect: "manual",
    method: "POST",
    headers: {
      Connection: "keep-alive",
      cookie: client.cookie,
      ENO_CSRF_TOKEN: client.csrf.value,
      SecurityContext: securityContext,
      Accept: "application/json",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      items: [
        {
          type: "VPMReference",
          attributes: {
            title: "vj-1234567890",
            description: "Created with WS",
            "dseng:EnterpriseReference": {
              partNumber: "vj-1234567890",
            },
          },
        },
      ],
    }),
  })
    .then((res) => res.json())
    .then((data) => console.log(JSON.stringify(data)));
});
