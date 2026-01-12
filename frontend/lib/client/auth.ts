import { getApiUrl } from "../api";
import { LoginFormValues } from "../validations/auth";

export async function loginRequest(values: LoginFormValues) {
  const apiUrl = getApiUrl();
  const res = await fetch(`${apiUrl}/login`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  });

  if (!res.ok) {
    throw new Error("Invalid credentials");
  }

  return res.json();
}

export async function logoutRequest() {
  const apiUrl = getApiUrl();
  const res = await fetch(`${apiUrl}/logout`, {
    method: "POST",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Logout failed");
  }

  return res;
}
