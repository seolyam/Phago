export interface Recipe {
  id: number;
  title: string;
  image: string;
}

export const fetchSpoonacularData = async (
  endpoint: string,
  params: Record<string, string> = {}
): Promise<{ results: Recipe[] }> => {
  const apiKey = "516110463dc94349a2669e37c5c56a70";
  const baseUrl = `https://api.spoonacular.com/${endpoint}`;
  const query = new URLSearchParams({ ...params, apiKey }).toString();

  const response = await fetch(`${baseUrl}?${query}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${response.statusText}`);
  }
  return response.json();
};
