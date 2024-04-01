import type { StepWithExplanation } from "@/hooks/useExplainSteps";
import { AIButton } from "./button";
import { languageCodeToName } from "@/utils/languages";
import { useMemo } from "react";

export const Explainer = ({
  explainStep,
  explainedSteps,
  index,
}: {
  explainStep: (i: number) => Promise<void>;
  explainedSteps: StepWithExplanation[] | undefined;
  index: number;
}) => {
  const ourExplanation = explainedSteps?.[index]?.explanation;
  const inputLanguage = useMemo(() => {
    return index === 0
      ? "English"
      : explainedSteps?.[index - 1]?.language
      ? languageCodeToName(explainedSteps?.[index - 1]?.language)
      : undefined;
  }, [explainedSteps, index]);
  const outputLanguage = useMemo(() => {
    return explainedSteps?.[index]?.language
      ? languageCodeToName(explainedSteps?.[index]?.language)
      : undefined;
  }, [explainedSteps, index]);

  return ourExplanation === undefined ? (
    <div className="-ms-[5px] me-3 pb-3">
      <AIButton
        onClick={() => {
          explainStep(index);
        }}
      />
    </div>
  ) : (
    <div className="bg-transparent">
      <div className="flex-start flex items-center pt-3">
        <div className="-ms-[8px] me-3 h-[6px] w-[12px] bg-neutral-400 dark:bg-neutral-500"></div>
        <h4 className="text-sm font-semibold">
          {inputLanguage} to {outputLanguage}
        </h4>
      </div>
      <div className="mb-6 ms-4 mt-2">
        <p className="text-neutral-500 dark:text-neutral-300">
          {ourExplanation}
        </p>
      </div>
    </div>
  );
};
