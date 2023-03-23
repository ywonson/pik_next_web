import axios from 'axios';

export const fetchRecommendationList = async (pik_title, link_title, setLoading) => {
  const formData = new FormData();
  formData.append('pik_title', pik_title);
  formData.append('link_title', link_title);

  try {
    setLoading(true);
    const response = await axios.post('https://xxxxxxxx/recommendation', formData, {
      headers: {
        'accept': 'application/json',
        'Content-Type': 'multipart/form-data'
      }
    });
    setLoading(false);
    return response.data;
  } catch (error) {
    console.error(error);
    setLoading(false);
    return ["Error: " + error.message];
  }
};