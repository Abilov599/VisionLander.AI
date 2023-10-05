import { api } from "..";

async function generatorFormPost(formData) {
  try {
    const res = await api.post("submit_form", formData, {
      withCredentials: true,
    });
    const data = await res.data;
    return data;
  } catch (error) {
    throw new Error(error);
  }
}

export { generatorFormPost };
