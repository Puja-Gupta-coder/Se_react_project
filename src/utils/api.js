// The API (json-server) runs on port 3001 to avoid conflict with Vite dev server
const baseUrl = "http://localhost:3001";

async function handleResponse(res) {
  const contentType = res.headers.get("content-type") || "";

  if (!res.ok) {
    // Try to get error message from response
    let errorMessage;
    try {
      if (contentType.includes("application/json")) {
        const error = await res.json();
        errorMessage = error.message || `Error: ${res.status}`;
      } else {
        errorMessage = await res.text();
      }
    } catch (e) {
      errorMessage = `Error: ${res.status}`;
    }
    throw new Error(errorMessage);
  }

  // Handle successful response
  if (contentType.includes("application/json")) {
    return res.json();
  }

  throw new Error(
    `Expected JSON but received "${contentType}". Check that your API server (json-server) is running at ${baseUrl}`
  );
}

function getItems() {
  return fetch(`${baseUrl}/items`).then(handleResponse);
}

function postItem(item) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  }).then(handleResponse);
}

function deleteItem(id) {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
  }).then(handleResponse);
}

export { getItems, postItem, deleteItem, handleResponse };
