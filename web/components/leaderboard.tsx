import { useLeaderboard } from "@/hooks/useLeaderboard";
import { XMarkIcon } from "@heroicons/react/16/solid";
import { useEffect, useRef } from "react";
import { EllipsisVerticalIcon } from "@heroicons/react/16/solid";

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

  const { scores, addScore, ourScore, loading } = useLeaderboard({
    article_id,
    translation_id,
  });

  useEffect(() => {
    if (open && !scores) {
      nameRef.current?.focus();
    }
  }, [open, scores]);

  if (!open) {
    return null;
  }
  return (
    <div className="fixed z-50 inset-0 flex items-center justify-center overflow-hidden">
      <div className="fixed inset-0 transition-opacity">
        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>

      <div className="bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all min-w-max w-full m-8 md:max-w-[688px]">
        {scores ? (
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6">
            <div className="flex items-start justify-between">
              <h3 className="text-lg leading-6 font-medium text-gray-900 pb-4">
                Leaderboard
              </h3>
              <XMarkIcon
                className="h-6 w-6 cursor-pointer"
                onClick={() => setOpen(false)}
              />
            </div>
            <table className="table-auto w-full">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Name</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {scores.map((score) => (
                  <tr
                    key={score.id}
                    className={score.id === ourScore?.id ? "bg-yellow-200" : ""}
                  >
                    <td>
                      {Math.max(
                        scores.findLastIndex((s) => s.score > score.score) + 2,
                        1,
                      )}
                    </td>
                    <td>{score.name}</td>
                    <td>{score.score}</td>
                  </tr>
                ))}
                {ourScore && scores.every((s) => s.id !== ourScore.id) && (
                  <>
                    <tr>
                      <td colSpan={3} className="items-center">
                        <EllipsisVerticalIcon className="h-6 w-6 left-auto right-auto w-full m-1" />
                      </td>
                    </tr>
                    <tr className="bg-yellow-200">
                      <td>{ourScore.placement}</td>
                      <td>{ourScore.name}</td>
                      <td>{ourScore.score}</td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <>
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
                className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={loading}
                onClick={() => {
                  addScore({
                    name: nameRef.current?.value || "Anonymous",
                    score,
                  });
                }}
              >
                Add Me
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
