import admin from "$lib/js/firebase_admin.js";
import { dev } from "$app/env";

const secure = dev ? "" : "Secure";
const expiresIn = 1000 * 60 * 60 * 24 * 7;

export const post = async (event) => {
  const { idToken } = await event.request.json();
  try {
    const sessionCookie = await admin
      .auth()
      .createSessionCookie(idToken, { expiresIn });
    return {
      status: 200,
      headers: {
        "set-cookie": `session=${sessionCookie};Max-Age=${expiresIn}; Path=/; HttpOnly; Secure;`,
      },
    };
  } catch {
    status: 500;
  }
};

export const del = async (_) => {
  return {
    status: 200,
    headers: { "set-cookie": `session=_;Path=/;HttpOnly;Max-Age=0;${secure}` },
  };
};
