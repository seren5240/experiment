"use client";

import { Button } from "@/components/button";
import { Languages } from "@/components/languages";
import { Timeline } from "@/components/timeline";
import { API_URL } from "@/config";
import { TranslationResponse } from "@/hooks/types";
import { useStoredTranslation } from "@/hooks/useTranslation";
import { UniqueLanguage } from "@/utils/languages";
import { useSearchParams } from "next/navigation";
import { useCallback, useMemo, useRef, useState } from "react";

export default function Home() {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [freshResponse, setFreshResponse] = useState<TranslationResponse>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const [languages, setLanguages] = useState<UniqueLanguage[]>([]);
  const searchParams = useSearchParams();
  const { translation, loading: loadingStored } = useStoredTranslation({
    id: searchParams.get("id") ?? undefined,
    skip: !!freshResponse,
  });
  const response = useMemo(() => {
    if (loading) {
      return undefined;
    }
    return freshResponse ?? translation;
  }, [freshResponse, translation, loading]);

  const translateText = useCallback(async () => {
    setError(undefined);
    const input = inputRef.current?.value;
    if (!input) {
      setError("Enter text to translate");
      return;
    }
    if (languages.length === 0) {
      setError("Select at least one language to translate to");
      return;
    }
    setLoading(true);
    const res = await fetch(`${API_URL}/translate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: input,
        target_languages: [...languages.map((l) => l.code), "en"],
      }),
    });
    const data: TranslationResponse = await res.json();
    const params = new URLSearchParams(searchParams.toString());
    params.set("id", data.id);
    window.history.pushState(null, "", `?${params.toString()}`);
    setFreshResponse(data);
    setLoading(false);
  }, [languages, searchParams]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-24">
      <div className="max-w-5xl w-full flex flex-col gap-12 items-start">
        <p className="text-sm">
          This is a tool to see the semantic similarity of English phrases after
          bounced through multiple languages using Microsoft&apos;s Azure
          Translator API. The final transformation, after translating through
          all selected languages, will always be back to English, so it is not
          necessary to select English as the final language on the right
          sidebar. For example, if you select French, English, and Spanish in
          that order, then the full order of translation will go English &gt;
          French &gt; English &gt; Spanish &gt; English, with the final English
          output displayed under &quot;Final text&quot;.
        </p>
        <div className="max-w-5xl w-full flex flex-col lg:flex-row gap-12 items-start items-start">
          <div
            className="flex flex-col h-full gap-8 items-center"
            style={{ minWidth: "30%" }}
          >
            <Button onClick={translateText} disabled={loading || loadingStored}>
              Translate
            </Button>
            <Languages languages={languages} setLanguages={setLanguages} />
          </div>
          <div className="z-10 max-w-5xl w-full items-start justify-between font-sans text-sm lg:flex flex-col gap-4 flex">
            <div className="flex-col items-start justify-between w-full">
              <label
                htmlFor="message"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                What would you like to translate?
              </label>
              <textarea
                id="message"
                rows={4}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Write your input here..."
                ref={inputRef}
                disabled={loading || loadingStored}
              />
              {error !== undefined && (
                <div
                  className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-3"
                  role="alert"
                >
                  <strong className="font-bold">Error: </strong>
                  <span className="block sm:inline">{error}</span>
                </div>
              )}
            </div>
            <div className="flex-col items-start justify-between w-full">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Original text (English)
              </label>
              {(loading || response) && (
                <div className="rounded-lg w-full gradient-border">
                  <div className="relative z-10 flex items-center gap-1.5 px-3 py-3">
                    {response ? response.original : inputRef.current?.value}
                  </div>
                </div>
              )}
            </div>
            <Timeline steps={response?.steps} translation_id={response?.id} />
            <div className="flex-col items-start justify-between w-full">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Final text (English)
              </label>
              {response !== undefined && (
                <div className="flex flex-col items-start justify-between w-full gap-2">
                  <div className="rounded-lg w-full gradient-border">
                    <div className="relative z-10 flex items-center gap-1.5 px-3 py-3">
                      {response.final}
                    </div>
                  </div>
                  <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Similarity: {response.similarity.toFixed(4)}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
