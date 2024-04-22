import { API_URL } from "@/config";
import { useCallback, useState } from "react";

export const useGameMode = () => {
  const [inGame, setInGame] = useState(false);
  const [article, setArticle] = useState<string>();
  const [loading, setLoading] = useState(false);

  const fetchArticle = useCallback(async () => {
    console.log("fucking doing this");
    setLoading(true);
    const res = await fetch(`${API_URL}/summary`);
    const data = await res.json();
    console.log(`res is ${res.status}, data is ${JSON.stringify(data)}`);
    setArticle(data.summary);
    setLoading(false);
    console.log(`article is now ${article}`);
  }, []);

  const ourSetInGame = useCallback(
    async (value: boolean) => {
      if (value && !article && !loading) {
        fetchArticle();
      }
      setInGame(value);
    },
    [article, fetchArticle, loading]
  );

  return { inGame, setInGame: ourSetInGame, article };
};
