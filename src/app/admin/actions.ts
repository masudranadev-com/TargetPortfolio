"use server";

import { redirect } from "next/navigation";
import { clearAdminSession, createAdminSession } from "@/lib/admin-auth";

export async function loginAdmin(formData: FormData) {
  const username = String(formData.get("username") || "");
  const password = String(formData.get("password") || "");

  if (username === "admin" && password === "00000000") {
    await createAdminSession();
    redirect("/admin");
  }

  redirect("/admin?error=1");
}

export async function logoutAdmin() {
  await clearAdminSession();
  redirect("/admin");
}
