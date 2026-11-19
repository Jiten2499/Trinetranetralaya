import { cacheLife } from "next/cache";

export async function getCopyrightYear() {
  "use cache";
  cacheLife("weeks");
  return new Date().getFullYear();
}
