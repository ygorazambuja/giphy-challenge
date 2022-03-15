import { api } from "..";

export async function addGifOnApi(gif) {
  return await api.post("/gifs", gif);
}

export async function removeGifOnApi(gifId) {
  try {
    return await api.delete(`/gifs/${gifId}`);
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getAllGifsOnApi() {
  try {
    return await api.get("/gifs");
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function updateGifByIdOnApi(gifId, gif) {
  try {
    return await api.patch(`/gifs/${gifId}`, { gif });
  } catch (error) {
    throw new Error(error.message);
  }
}
