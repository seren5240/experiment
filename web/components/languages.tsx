import { FR, US } from "country-flag-icons/react/3x2";
import React, { useCallback, useState } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  OnDragEndResponder,
} from "@hello-pangea/dnd";
import { Dropdown, DropdownOption } from "./dropdown";
import { Button } from "./button";
import { Hamburger } from "./hamburger";

type Language = DropdownOption & {
  code: string;
  icon: React.ComponentType;
};
type UniqueLanguage = Language & {
  id: string;
};

const ENGLISH: Language = { name: "English", code: "en", icon: US };
const SUPPORTED_LANGUAGES = [
  ENGLISH,
  {
    name: "French",
    code: "fr",
    icon: FR,
  },
];

const reorder = <T extends unknown>(
  list: T[],
  startIndex: number,
  endIndex: number
) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const LanguageItem = ({
  language,
  index,
}: {
  language: UniqueLanguage;
  index: number;
}) => {
  const Icon = language.icon;
  return (
    <Draggable draggableId={language.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="flex flex-row gap-4 items-center p-2 text-lg cursor-grab"
        >
          <Hamburger />
          <div className="flex flex-row gap-2">
            <div className="min-w-8 self-center">
              <Icon />
            </div>
            <p>{language.name}</p>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export const Languages = () => {
  const [languages, setLanguages] = useState<UniqueLanguage[]>([]);
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
        result.destination.index
      );

      setLanguages(reordered);
    },
    [languages]
  );

  const onAdd = useCallback(() => {
    const language = SUPPORTED_LANGUAGES.find(
      (lang) => lang.name === selected?.name
    );
    if (!language) {
      return;
    }
    setLanguages([
      ...languages,
      { ...language, id: `language-${languages.length}` },
    ]);
  }, [languages, selected]);

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
          options={SUPPORTED_LANGUAGES}
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
