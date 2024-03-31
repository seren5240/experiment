import { Brand } from "@/utils";

type Uuid = Brand<string, "Uuid">;
export type TranslationResponse = {
  id: Uuid;
  original: string;
  final: string;
  steps: {
    language: string;
    text: string;
  }[];
  similarity: number;
};
