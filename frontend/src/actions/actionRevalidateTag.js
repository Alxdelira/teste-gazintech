"use server"

import { revalidateTag } from "next/cache";

export default async function actionRevalidateTag(tag) {
  revalidateTag(tag);
}
