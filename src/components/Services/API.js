import axios from "axios";

export async function searchFunc(query, page) {
  const BASE_URL = 'https://pixabay.com/api/';
  const API = '34963790-b238492e38b83f6eacf1dd9bd';
const options = 'image_type=photo&orientation=horizontal&per_page=12';

  const images = await axios.get(
    `${BASE_URL}?q=${query}&page=${page}&key=${API}&${options}`
  );
  return images.data;
}
