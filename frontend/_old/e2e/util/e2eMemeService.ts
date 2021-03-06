import { restClient } from "./rest.client";
import { Meme } from "../../src/app/model/meme";

async function create(newMeme: Meme) {
  return restClient.post("/memes", newMeme);
}

export const e2eMemeService = {create};
