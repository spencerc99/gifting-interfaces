export interface BaseGift {
  id: string; // Unique identifier for deterministic positioning
  wrappingImg: string;
  from?: string;
  to?: string;
}

export interface APIGift extends BaseGift {
  title?: string;
  imageUrls: string[]; // asset urls
  imageAltText: string[];
  description: string;
  link: string;
  websiteLink?: string;
  wrappingImgAlt?: string;
}

export interface CustomGift extends BaseGift {
  type: "custom";
  renderContent: () => React.ReactNode;
  theme?: "green" | "blue" | "brown";
}

export type Gift = APIGift | CustomGift;

const docId = "SEBWX4q9gJ";
const gridId = "table-l8q3uKJOZF";

export async function getGiftingInterfaces(): Promise<APIGift[]> {
  const resp = await fetch(
    `https://opencoda.spencerc99.workers.dev//${docId}/${gridId}`
  );
  const respBody = await resp.json();

  return respBody as APIGift[];
}
