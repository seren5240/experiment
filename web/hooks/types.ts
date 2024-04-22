import { Brand } from "@/utils/types";

export type Uuid = Brand<string, "Uuid">;

export type TranslationStep = {
  language: string;
  text: string;
};
export type TranslationResponse = {
  id: Uuid;
  original: string;
  final: string;
  steps: TranslationStep[];
  similarity: number;
};
