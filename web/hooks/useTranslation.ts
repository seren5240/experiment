import { useEffect, useState } from "react";
import { TranslationResponse } from "./types";
import { API_URL } from "@/config";

export const useStoredTranslation = ({
  id,
  skip,
}: {
  id?: string;
  skip: boolean;
}) => {
  const [translation, setTranslation] = useState<TranslationResponse>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTranslation = async () => {
      if (!id || skip) {
        return;
      }
      setLoading(true);
      const res = await fetch(`${API_URL}/translation/${id}`);
      const data: TranslationResponse = await res.json();
      setTranslation(data);
      setLoading(false);
    };
    fetchTranslation();
  }, [id, skip]);

  return { translation, loading };
};
