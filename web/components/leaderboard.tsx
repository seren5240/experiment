import { useLeaderboard } from "@/hooks/useLeaderboard";
import { XMarkIcon } from "@heroicons/react/16/solid";
import { useRef } from "react";

export const Leaderboard = ({
  open,
  setOpen,
  score,
  article_id,
  translation_id,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  score: number;
  article_id: string;
  translation_id: string;
}) => {
  const nameRef = useRef<HTMLTextAreaElement>(null);
  const { scores, addScore, loading } = useLeaderboard({
    article_id,
    translation_id,
  });
  
  if (!open) {
    return null;
  }
  return (
    <div className="fixed z-50 inset-0 flex items-center justify-center overflow-hidden">
      <div className="fixed inset-0 transition-opacity">
        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>

      <div className="bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all min-w-max w-full m-8 md:max-w-[688px]">
        <div className="bg-white px-4 pt-5 pb-4 sm:p-6">
          <div className="flex items-start justify-between">
            <h3 className="text-lg leading-6 font-medium text-gray-900 pb-4">
              Join Leaderboard
            </h3>
            <XMarkIcon
              className="h-6 w-6 cursor-pointer"
              onClick={() => setOpen(false)}
            />
          </div>
          <div className="mt-2">
            <div className="flex-col items-start justify-between w-full">
              <p className="pb-3">Your score was: {score}</p>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Name
              </label>
              <textarea
                id="name"
                rows={1}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 resize-none"
                placeholder="Enter your name"
                ref={nameRef}
              />
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            type="button"
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
            onClick={() => {}}
          >
            Add Me
          </button>
        </div>
      </div>
    </div>
  );
};
