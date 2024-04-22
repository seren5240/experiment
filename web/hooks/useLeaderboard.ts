import { API_URL } from "@/config";
import { useCallback, useState } from "react";
import type { Uuid } from "./types";

interface Score {
  id: Uuid;
  score: number;
  name: string;
  translation_id: string;
}

export const useLeaderboard = ({
  article_id,
  translation_id,
}: {
  article_id: string;
  translation_id: string;
}) => {
  const [scores, setScores] = useState<Score[]>();
  const [loading, setLoading] = useState(false);

  const addScore = useCallback(
    async (score: Pick<Score, "name" | "score">) => {
      setLoading(true);
      const res = await fetch(`${API_URL}/score`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...score, article_id, translation_id }),
      });
      const data = await res.json();
      setLoading(false);
      setScores(data.leaderboard);
    },
    [article_id, translation_id]
  );

  return { scores, addScore, loading };
};
