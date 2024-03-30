"use client";

import { Button } from "@/components/button";
import { Languages, UniqueLanguage } from "@/components/languages";
import { API_URL } from "@/config";
import { useCallback, useRef, useState } from "react";

export default function Home() {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [output, setOutput] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const [languages, setLanguages] = useState<UniqueLanguage[]>([]);

  const translateText = useCallback(async () => {
    setError(undefined);
    setOutput(undefined);
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
        target_languages: languages.map((l) => l.code),
      }),
    });
    const data = await res.json();
    setOutput(data.final);
    setLoading(false);
  }, [languages]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="max-w-5xl w-full flex gap-12 items-start">
        <div className="z-10 max-w-5xl w-full items-center justify-between font-sans text-sm lg:flex flex-col gap-12 flex">
          <div className="flex-col items-start justify-between w-full">
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Original text
            </label>
            <textarea
              id="message"
              rows={4}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Write your thoughts here..."
              ref={inputRef}
            />
          </div>
          <div className="flex-col items-start justify-between w-full">
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Translated text
            </label>
            {error !== undefined && (
              <div className="rounded-lg w-full bg-red-600 p-3 text-white">
                {error}
              </div>
            )}
            {output !== undefined && (
              <div className="rounded-lg w-full gradient-border">
                <div className="relative z-10 flex items-center gap-1.5 px-3 py-3">
                  {output}
                </div>
              </div>
            )}
          </div>
        </div>
        <div
          className="flex flex-col h-full gap-8 items-center"
          style={{ minWidth: "30%" }}
        >
          <Button onClick={translateText} disabled={loading}>
            Translate
          </Button>
          <Languages languages={languages} setLanguages={setLanguages} />
        </div>
      </div>
    </main>
  );
}
