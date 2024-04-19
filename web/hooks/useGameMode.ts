import { API_URL } from "@/config";
import { useCallback, useState } from "react";

export const useGameMode = () => {
  const [inGame, setInGame] = useState(false);
  const [article, setArticle] = useState<string>();

  //   const ourSetInGame = useCallback(async (value: boolean) => {
  //     setInGame(value);
  //     if (value && !article) {
  //         const res = await fetch(`${API_URL}/article`);

  //     }
  //   }, []);

  return { inGame, setInGame };
};
