import { redirect } from "next/navigation";

import { DEFAULT_CATEGORY, DEFAULT_CITY } from "@/config/site";

export default function Home() {
  redirect(`/${DEFAULT_CITY}/${DEFAULT_CATEGORY}`);
}
