import React, { useCallback, useMemo, useState } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  OnDragEndResponder,
} from "@hello-pangea/dnd";
import { Dropdown, DropdownOption } from "./dropdown";
import { Button } from "./button";
import { Hamburger } from "./hamburger";
import { TrashIcon } from "@heroicons/react/16/solid";
import { SUPPORTED_LANGUAGES, UniqueLanguage } from "@/utils/languages";

const reorder = <T extends unknown>(
  list: T[],
  startIndex: number,
  endIndex: number,
) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const LanguageItem = ({
  language,
  index,
  onDelete,
}: {
  language: UniqueLanguage;
  index: number;
  onDelete: (id: string) => void;
}) => {
  const Icon = language.icon;
  return (
    <Draggable draggableId={language.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="flex flex-row items-center justify-between"
        >
          <div className="flex flex-row gap-4 items-center p-2 text-lg cursor-grab grow">
            <Hamburger />
            <div className="flex flex-row gap-2">
              <div className="min-w-8 self-center">
                <Icon />
              </div>
              <p>{language.name}</p>
            </div>
          </div>
          <TrashIcon
            className="h-6 w-6 text-blue-800 min-w-6"
            onClick={() => {
              onDelete(language.id);
            }}
          />
        </div>
      )}
    </Draggable>
  );
};

export const Languages = ({
  languages,
  setLanguages,
  inGame,
}: {
  languages: UniqueLanguage[];
  setLanguages: React.Dispatch<React.SetStateAction<UniqueLanguage[]>>;
  inGame: boolean;
}) => {
  const [selected, setSelected] = useState<DropdownOption>();

  const onDragEnd: OnDragEndResponder = useCallback(
    (result) => {
      if (!result.destination) {
        return;
      }

      if (result.destination.index === result.source.index) {
        return;
      }

      const reordered = reorder(
        languages,
        result.source.index,
        result.destination.index,
      );

      setLanguages(reordered);
    },
    [languages, setLanguages],
  );

  const onAdd = useCallback(() => {
    const language = SUPPORTED_LANGUAGES.find(
      (lang) => lang.name === selected?.name,
    );
    if (!language) {
      return;
    }
    setLanguages([
      ...languages,
      { ...language, id: `language-${languages.length}` },
    ]);
    setSelected(undefined);
  }, [languages, selected, setLanguages, setSelected]);

  const onDelete = useCallback(
    (id: string) => {
      setLanguages(languages.filter((lang) => lang.id !== id));
    },
    [languages, setLanguages],
  );

  const options = useMemo(() => {
    if (!inGame) {
      return SUPPORTED_LANGUAGES;
    }
    return SUPPORTED_LANGUAGES.filter(
      (lang) =>
        !languages.some((l) => l.code === lang.code) && lang.code !== "en",
    );
  }, [inGame, languages]);

  return (
    <div className="flex flex-col text-sm w-full">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="translate-languages">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {languages.map((language, index) => (
                <LanguageItem
                  key={language.id}
                  language={language}
                  index={index}
                  onDelete={onDelete}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <label htmlFor="language-selector" className="mb-1 mt-5">
        Add a new language
      </label>
      <div className="flex flex-row w-full gap-2">
        <Dropdown
          options={options}
          selected={selected}
          setSelected={setSelected}
        />
        <Button disabled={!selected} onClick={onAdd}>
          Add
        </Button>
      </div>
    </div>
  );
};
