import { api } from "@/lib/api";

export async function getBookByISBN(isbn: string) {
  const { data } = await api.get(`/api/external/isbn/${isbn}`);

  return data.data;
}
