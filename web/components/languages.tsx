import { FR, US } from "country-flag-icons/react/3x2";
import React, { useState } from "react";
import { Draggable } from "@hello-pangea/dnd";
import { Dropdown, DropdownOption } from "./dropdown";

type Language = DropdownOption & {
  code: string;
  icon: React.ComponentType;
}

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
  language: Language;
  index: number;
}) => {
  const Icon = language.icon;
  return (
    <Draggable draggableId={`language-${index}`} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="flex flex-col gap-2 items-center"
        >
          <p>{language.name}</p>
          <Icon />
        </div>
      )}
    </Draggable>
  );
};

export const Languages = () => {
  const [languages, setLanguages] = useState<Language[]>([]);
  return (
    <div className="flex flex-col text-sm">
      <label htmlFor="language-selector mb-2">Add a new language</label>
      <Dropdown options={SUPPORTED_LANGUAGES} />
    </div>
  );
};
