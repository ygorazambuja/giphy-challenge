import axios from "axios";
import { API_URL } from "../configs/env";

export const api = axios.create({
  baseURL: API_URL,
});
