export async function getAuthToken() {
  const loginResponse = await fetch("http://localhost:3000/api/posts/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: "adilla", password: "adilla123" }),
  });

  const loginData = await loginResponse.json();

  if (!loginData.token) {
    throw new Error("Login gagal, token tidak ditemukan");
  }

  return loginData.token;
}

export async function getApiKey(token: string) {
  const response = await fetch("http://localhost:3000/api/posts", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!data.key) {
    throw new Error("Gagal mendapatkan API Key");
  }

  return data.key;
}
