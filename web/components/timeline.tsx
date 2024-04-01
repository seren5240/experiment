import { TranslationStep } from "@/hooks/types";
import { languageCodeToName } from "@/utils/languages";
import { AIButton } from "./button";

export const Timeline = ({ steps }: { steps?: TranslationStep[] }) => {
  const timelineSteps = steps?.slice(0, -1);
  if (!timelineSteps || timelineSteps.length === 0) {
    return null;
  }
  return (
    <ol className="border-s border-neutral-400 dark:border-neutral-500 ml-4">
      {timelineSteps.map((step) => (
        <li key={step.text}>
          <div className="flex-start flex items-center pt-3">
            <div className="-ms-[5px] me-3 h-[9px] w-[9px] rounded-full bg-neutral-400 dark:bg-neutral-500"></div>
            <h4 className="text-sm font-semibold">
              {languageCodeToName(step.language)}
            </h4>
          </div>
          <div className="mb-6 ms-4 mt-2">
            <p className="mb-3 text-neutral-500 dark:text-neutral-300">
              {step.text}
            </p>
          </div>
          <div className="flex-start flex items-center pb-3">
            <div className="-ms-[5px] me-3 bg-neutral-400 dark:bg-neutral-500">
                <AIButton />
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
};
