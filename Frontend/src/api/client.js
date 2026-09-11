const BASE_URL = import.meta.env.VITE_API_URL?.replace(/\/$/, "");

async function request(path, options = {}) {
  let res;
  try {
    res = await fetch(`${BASE_URL}${path}`, {
      headers: { "Content-Type": "application/json" },
      ...options,
    });
  }  catch (err) {
  console.error("FETCH FAILED");
  console.error("URL:", `${BASE_URL}${path}`);
  console.error("ERROR:", err);
  console.error("MESSAGE:", err.message);

  throw new Error(
    `Request failed: ${err.message}`
  );
}

  let data = null;
  try {
    data = await res.json();
  } catch (err) {
    // no JSON body
  }

  if (!res.ok) {
    throw new Error(data?.message || `Request failed (${res.status})`);
  }

  return data;
}

export const api = {
  get: (path) => request(path, { method: "GET" }),
  post: (path, body) => request(path, { method: "POST", body: JSON.stringify(body) }),
  put: (path, body) => request(path, { method: "PUT", body: JSON.stringify(body) }),
  del: (path) => request(path, { method: "DELETE" }),
};
