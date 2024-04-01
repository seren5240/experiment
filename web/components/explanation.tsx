import type { StepWithExplanation } from "@/hooks/useExplainSteps";
import { AIButton } from "./button";

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
  console.log(`explainedSteps are ${JSON.stringify(explainedSteps)}`)
  return ourExplanation === undefined ? (
    <AIButton
      onClick={() => {
        explainStep(index);
      }}
    />
  ) : (
    <div>{ourExplanation}</div>
  );
};
