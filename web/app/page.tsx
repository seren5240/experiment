"use client";

import { Languages } from "@/components/languages";
import { API_URL } from "@/config";
import { useCallback, useRef, useState } from "react";

export default function Home() {
  // use a ref to get the value of the textarea
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [output, setOutput] = useState<string>();

  const translateText = useCallback(async () => {
    const input = inputRef.current?.value;
    if (!input) {
      setOutput("");
      return;
    }
    const res = await fetch(`${API_URL}/translate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: input, target_languages: ["fr"] }),
    });
    const data = await res.json();
    setOutput(data.translation);
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="max-w-5xl w-full flex gap-12 items-start">
        <div className="z-10 max-w-5xl w-full items-center justify-between font-sans text-sm lg:flex flex-col gap-12">
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
            {output !== undefined && (
              <div className="rounded-lg w-full gradient-border">
                <div className="relative z-10 flex items-center gap-1.5 px-3 py-3">
                  {output}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col h-full gap-8 items-center">
          <button
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 text-blue-800 border border-blue-800 rounded shadow"
            onClick={translateText}
          >
            Translate
          </button>
          <Languages />
        </div>
      </div>
    </main>
  );
}
