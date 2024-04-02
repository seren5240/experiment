import { useCallback, useEffect, useState } from "react";
import { TranslationStep } from "./types";
import { API_URL } from "@/config";

export type StepWithExplanation = TranslationStep & {
  loading?: boolean;
  explanation?: string;
};
type ExplanationResponse = {
  id: string;
  explanation: string;
};

export const useExplainSteps = ({
  steps,
  translation_id,
}: {
  steps?: TranslationStep[];
  translation_id?: string;
}) => {
  const [explanations, setExplanations] = useState<
    StepWithExplanation[] | undefined
  >(steps);

  useEffect(() => {
    if (translation_id) {
      setExplanations(steps);
    }
  }, [translation_id, steps]);

  const explainStep = useCallback(
    async (i: number) => {
      if (!translation_id) {
        console.error("No translation id provided");
        return;
      }
      setExplanations((explanations) =>
        explanations?.map((step, index) =>
          index === i ? { ...step, loading: true } : step
        )
      );
      const res = await fetch(`${API_URL}/explain`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          translation_id,
          step_index: i,
        }),
      });
      const data: ExplanationResponse = await res.json();
      setExplanations((explanations) =>
        explanations?.map((step, index) =>
          index === i
            ? { ...step, explanation: data.explanation, loading: false }
            : step
        )
      );
    },
    [translation_id]
  );

  return { explainStep, explainedSteps: explanations };
};
