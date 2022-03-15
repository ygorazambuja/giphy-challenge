import axios from "axios";
import { GIPHY_API_KEY } from "../../configs/env";

export async function fetchTrendindGifs() {
  const { data } = await axios.get(
    `https://api.giphy.com/v1/gifs/trending?api_key=${GIPHY_API_KEY}&limit=10`
  );

  return {
    meta: data.meta,
    pagination: data.pagination,
    data: data.data,
  };
}

export async function fetchGifs({ searchTerm, offset = 10, limit = 10 }) {
  const { data } = await axios.get(
    `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${searchTerm}&limit=${limit}&offset=${offset}`
  );

  return {
    meta: data.meta,
    pagination: data.pagination,
    data: data.data,
  };
}

export async function getGifById(id) {
  const { data } = await axios.get(
    `https://api.giphy.com/v1/gifs/${id}?api_key=${GIPHY_API_KEY}`
  );

  return data.data;
}
