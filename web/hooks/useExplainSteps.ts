import { useCallback, useEffect, useState } from "react";
import { TranslationStep } from "./types";
import { API_URL } from "@/config";

export type StepWithExplanation = TranslationStep & { explanation?: string };
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
    if (!!steps && !explanations) {
      setExplanations(steps);
    }
  }, [steps, explanations]);

  const explainStep = useCallback(
    async (i: number) => {
      if (!translation_id) {
        console.error("No translation id provided");
        return;
      }
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
      const explained = explanations?.map((step, index) =>
        index === i ? { ...step, explanation: data.explanation } : step
      );
      setExplanations(explained);
    },
    [translation_id, explanations]
  );

  return { explainStep, explainedSteps: explanations };
};
