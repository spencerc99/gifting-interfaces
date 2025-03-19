export interface Gift {
  title?: string;
  imageUrls: string[]; // asset urls
  description: string;
  from: string;
  to: string;
  link: string;
  wrappingImg: string;
}

const docId = "SEBWX4q9gJ";
const gridId = "table-l8q3uKJOZF";

export async function getGiftingInterfaces(): Promise<Gift[]> {
  const resp = await fetch(
    `https://opencoda.spencerc99.workers.dev//${docId}/${gridId}`
  );
  const respBody = await resp.json();

  return respBody as Gift[];
}
