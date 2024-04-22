import { API_URL } from "@/config";
import { useCallback, useState } from "react";
import { Uuid } from "./types";

type Article = {
  id: Uuid;
  summary: string;
};

export const useGameMode = () => {
  const [inGame, setInGame] = useState(false);
  const [article, setArticle] = useState<Article>();
  const [loading, setLoading] = useState(false);

  const fetchArticle = useCallback(async () => {
    setLoading(true);
    const res = await fetch(`${API_URL}/summary`);
    const data = await res.json();
    setArticle(data);
    setLoading(false);
  }, []);

  const ourSetInGame = useCallback(
    async (value: boolean) => {
      if (value && !article && !loading) {
        fetchArticle();
      }
      // window.history.pushState(null, "", "/");
      setInGame(value);
    },
    [article, fetchArticle, loading]
  );

  return { inGame, setInGame: ourSetInGame, article };
};
