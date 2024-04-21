import { API_URL } from "@/config";
import { useCallback, useState } from "react";

export const useGameMode = () => {
  const [inGame, setInGame] = useState(false);
  const [article, setArticle] = useState<string>();
  const [loading, setLoading] = useState(false);

  const ourSetInGame = useCallback(
    async (value: boolean) => {
      setInGame(value);
      if (value && !article && !loading) {
        setLoading(true);
        const res = await fetch(`${API_URL}/summary`);
        const data = await res.json();
        setArticle(data.summary);
        setLoading(false);
      }
    },
    [article, loading]
  );

  return { inGame, setInGame: ourSetInGame, article };
};
