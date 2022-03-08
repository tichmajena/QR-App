import cookie from "cookie";
import { v4 as uuid } from "@lukeed/uuid";
import admin from "$lib/js/firebase_admin";

// export const handle = async ({ event, resolve }) => {
//   const cookies = cookie.parse(event.request.headers.get("cookie") || "");
//   event.locals.userid = cookies.userid || uuid();

//   const response = await resolve(event);

//   if (!cookies.userid) {
//     // if this is the first time the user has visited this app,
//     // set a cookie so that we recognise them when they return
//     response.headers.set(
//       "set-cookie",
//       cookie.serialize("userid", event.locals.userid, {
//         path: "/",
//         httpOnly: true,
//       })
//     );
//   }

//   return response;
// };

export const getSession = async (event) => {
  const { session } = cookie.parse(event.request.headers.get("cookie") || "");
  try {
    const claims = admin.auth().verifySessionCookie(session);
    return {
      user: {
        exists: true,
        ...claims,
      },
    };
  } catch {
    return {
      user: {
        exsists: false,
      },
    };
  }
};
