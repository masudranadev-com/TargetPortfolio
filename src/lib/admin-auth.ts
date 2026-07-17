import { cookies } from "next/headers";

const adminCookieName = "mr_admin_session";
const adminCookieValue = "mr-admin-authenticated";

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  return cookieStore.get(adminCookieName)?.value === adminCookieValue;
}

export async function createAdminSession() {
  const cookieStore = await cookies();
  cookieStore.set(adminCookieName, adminCookieValue, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(adminCookieName);
}
