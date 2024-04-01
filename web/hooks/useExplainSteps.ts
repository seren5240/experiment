import { useCallback, useState } from "react";
import { TranslationStep } from "./types";

type StepWithExplanation = TranslationStep & { explanation?: string };

export const useExplainSteps = ({
  steps,
  translation_id,
}: {
  steps?: TranslationStep[];
  translation_id: string;
}) => {
  const [explanations, setExplanations] = useState<
    StepWithExplanation[] | undefined
  >(steps);

  const explainStep = useCallback(async (i: number) => {}, []);
};
