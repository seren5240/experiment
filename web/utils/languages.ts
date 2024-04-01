import {
  AF,
  AL,
  AM,
  AZ,
  BA,
  BD,
  BG,
  BI,
  BR,
  BW,
  CA,
  CD,
  CN,
  CZ,
  DE,
  DK,
  EE,
  ER,
  ES,
  ET,
  FI,
  FJ,
  FO,
  FR,
  GB,
  GE,
  GR,
  HK,
  HR,
  HT,
  HU,
  ID,
  IE,
  IL,
  IN,
  IR,
  IS,
  IT,
  JP,
  KG,
  KH,
  KR,
  KZ,
  LA,
  LK,
  LS,
  LT,
  LV,
  MG,
  MK,
  MM,
  MN,
  MT,
  MV,
  MW,
  MX,
  MY,
  NG,
  NL,
  NO,
  NP,
  NZ,
  PF,
  PH,
  PK,
  PL,
  PT,
  RO,
  RS,
  RU,
  RW,
  SA,
  SE,
  SI,
  SK,
  SO,
  TH,
  TM,
  TO,
  TR,
  TW,
  TZ,
  UA,
  UG,
  US,
  UZ,
  VN,
  WS,
  ZA,
  ZW,
} from "country-flag-icons/react/3x2";
import React from "react";
import type { DropdownOption } from "@/components/dropdown";

type Language = DropdownOption & {
  code: string;
  icon: React.ComponentType;
};
export type UniqueLanguage = Language & {
  id: string;
};

const ENGLISH: Language = { name: "English", code: "en", icon: US };
export const SUPPORTED_LANGUAGES = [
  {
    name: "Afrikaans",
    code: "af",
    icon: ZA,
  },
  {
    name: "Amharic",
    code: "am",
    icon: ET,
  },
  {
    name: "Arabic",
    code: "ar",
    icon: SA,
  },
  {
    name: "Azerbaijani",
    code: "az",
    icon: AZ,
  },
  {
    name: "Bulgarian",
    code: "bg",
    icon: BG,
  },
  {
    name: "Bangla",
    code: "bn",
    icon: BD,
  },
  // {
  //   name: "Tibetan",
  //   code: "bo",
  // },
  {
    name: "Bosnian",
    code: "bs",
    icon: BA,
  },
  {
    name: "Catalan",
    code: "ca",
    icon: ES,
  },
  {
    name: "Chinese (Literary)",
    code: "lzh",
    icon: CN,
  },
  {
    name: "Cantonese (Traditional)",
    code: "yue",
    icon: HK,
  },
  {
    name: "Chinese Simplified",
    code: "zh-Hans",
    icon: CN,
  },
  {
    name: "Chinese Traditional",
    code: "zh-Hant",
    icon: TW,
  },
  {
    name: "Czech",
    code: "cs",
    icon: CZ,
  },
  {
    name: "Welsh",
    code: "cy",
    icon: GB,
  },
  {
    name: "Danish",
    code: "da",
    icon: DK,
  },
  {
    name: "German",
    code: "de",
    icon: DE,
  },
  {
    name: "Divehi",
    code: "dv",
    icon: MV,
  },
  {
    name: "Greek",
    code: "el",
    icon: GR,
  },
  ENGLISH,
  {
    name: "Spanish",
    code: "es",
    icon: ES,
  },
  {
    name: "Estonian",
    code: "et",
    icon: EE,
  },
  {
    name: "Basque",
    code: "eu",
    icon: ES,
  },
  {
    name: "Persian",
    code: "fa",
    icon: IR,
  },
  {
    name: "Finnish",
    code: "fi",
    icon: FI,
  },
  {
    name: "Filipino",
    code: "fil",
    icon: PH,
  },
  {
    name: "Fijian",
    code: "fj",
    icon: FJ,
  },
  {
    name: "Faroese",
    code: "fo",
    icon: FO,
  },
  {
    name: "French",
    code: "fr",
    icon: FR,
  },
  {
    name: "French (Canada)",
    code: "fr-CA",
    icon: CA,
  },
  {
    name: "Irish",
    code: "ga",
    icon: IE,
  },
  {
    name: "Galician",
    code: "gl",
    icon: ES,
  },
  {
    name: "Konkani",
    code: "gom",
    icon: IN,
  },
  {
    name: "Gujarati",
    code: "gu",
    icon: IN,
  },
  {
    name: "Hausa",
    code: "ha",
    icon: NG,
  },
  {
    name: "Hebrew",
    code: "he",
    icon: IL,
  },
  {
    name: "Hindi",
    code: "hi",
    icon: IN,
  },
  {
    name: "Chhattisgarhi",
    code: "hne",
    icon: IN,
  },
  {
    name: "Croatian",
    code: "hr",
    icon: HR,
  },
  {
    name: "Upper Sorbian",
    code: "hsb",
    icon: DE,
  },
  {
    name: "Haitian Creole",
    code: "ht",
    icon: HT,
  },
  {
    name: "Hungarian",
    code: "hu",
    icon: HU,
  },
  {
    name: "Armenian",
    code: "hy",
    icon: AM,
  },
  {
    name: "Indonesian",
    code: "id",
    icon: ID,
  },
  {
    name: "Igbo",
    code: "ig",
    icon: NG,
  },
  {
    name: "Inuinnaqtun",
    code: "ikt",
    icon: CA,
  },
  {
    name: "Icelandic",
    code: "is",
    icon: IS,
  },
  {
    name: "Italian",
    code: "it",
    icon: IT,
  },
  {
    name: "Inuktitut",
    code: "iu",
    icon: CA,
  },
  {
    name: "Japanese",
    code: "ja",
    icon: JP,
  },
  {
    name: "Georgian",
    code: "ka",
    icon: GE,
  },
  {
    name: "Kazakh",
    code: "kk",
    icon: KZ,
  },
  {
    name: "Khmer",
    code: "km",
    icon: KH,
  },
  {
    name: "Kurdish (Northern)",
    code: "kmr",
    icon: TR,
  },
  {
    name: "Kannada",
    code: "kn",
    icon: IN,
  },
  {
    name: "Korean",
    code: "ko",
    icon: KR,
  },
  // {
  //   name: "Kashmiri",
  //   code: "ks",
  // }
  {
    name: "Kurdish (Central)",
    code: "ku",
    icon: TR,
  },
  {
    name: "Kyrgyz",
    code: "ky",
    icon: KG,
  },
  {
    name: "Lingala",
    code: "ln",
    icon: CD,
  },
  {
    name: "Lao",
    code: "lo",
    icon: LA,
  },
  {
    name: "Lithuanian",
    code: "lt",
    icon: LT,
  },
  {
    name: "Ganda",
    code: "lug",
    icon: UG,
  },
  {
    name: "Latvian",
    code: "lv",
    icon: LV,
  },
  {
    name: "Maithili",
    code: "mai",
    icon: IN,
  },
  {
    name: "Malagasy",
    code: "mg",
    icon: MG,
  },
  {
    name: "Māori",
    code: "mi",
    icon: NZ,
  },
  {
    name: "Macedonian",
    code: "mk",
    icon: MK,
  },
  {
    name: "Malayalam",
    code: "ml",
    icon: IN,
  },
  {
    name: "Mongolian (Cyrillic)",
    code: "mn-Cyrl",
    icon: MN,
  },
  {
    name: "Mongolian (Traditional)",
    code: "mn-Mong",
    icon: MN,
  },
  {
    name: "Manipuri",
    code: "mni",
    icon: IN,
  },
  {
    name: "Marathi",
    code: "mr",
    icon: IN,
  },
  {
    name: "Malay",
    code: "ms",
    icon: MY,
  },
  {
    name: "Maltese",
    code: "mt",
    icon: MT,
  },
  // {
  //   name: "Hmong Daw",
  //   code: "mww",
  //   icon: US,
  // }
  {
    name: "Myanmar (Burmese)",
    code: "my",
    icon: MM,
  },
  {
    name: "Norwegian",
    code: "nb",
    icon: NO,
  },
  {
    name: "Nepali",
    code: "ne",
    icon: NP,
  },
  {
    name: "Dutch",
    code: "nl",
    icon: NL,
  },
  {
    name: "Sesotho sa Leboa",
    code: "nso",
    icon: LS,
  },
  {
    name: "Nyanja",
    code: "nya",
    icon: MW,
  },
  {
    name: "Odia",
    code: "or",
    icon: IN,
  },
  {
    name: "Querétaro Otomi",
    code: "otq",
    icon: MX,
  },
  {
    name: "Punjabi",
    code: "pa",
    icon: IN,
  },
  {
    name: "Polish",
    code: "pl",
    icon: PL,
  },
  {
    name: "Dari",
    code: "prs",
    icon: AF,
  },
  {
    name: "Pashto",
    code: "ps",
    icon: AF,
  },
  {
    name: "Portuguese (Brazil)",
    code: "pt",
    icon: BR,
  },
  {
    name: "Portuguese (Portugal)",
    code: "pt-PT",
    icon: PT,
  },
  {
    name: "Romanian",
    code: "ro",
    icon: RO,
  },
  {
    name: "Russian",
    code: "ru",
    icon: RU,
  },
  {
    name: "Rundi",
    code: "rn",
    icon: BI,
  },
  {
    name: "Kinyarwanda",
    code: "rw",
    icon: RW,
  },
  {
    name: "Sindhi",
    code: "sd",
    icon: PK,
  },
  {
    name: "Sinhala",
    code: "si",
    icon: LK,
  },
  {
    name: "Slovak",
    code: "sk",
    icon: SK,
  },
  {
    name: "Slovenian",
    code: "sl",
    icon: SI,
  },
  {
    name: "Samoan",
    code: "sm",
    icon: WS,
  },
  {
    name: "Shona",
    code: "sn",
    icon: ZW,
  },
  {
    name: "Somali",
    code: "so",
    icon: SO,
  },
  {
    name: "Albanian",
    code: "sq",
    icon: AL,
  },
  {
    name: "Serbian (Cyrillic)",
    code: "sr-Cyrl",
    icon: RS,
  },
  {
    name: "Serbian (Latin)",
    code: "sr-Latn",
    icon: RS,
  },
  {
    name: "Sesotho",
    code: "st",
    icon: LS,
  },
  {
    name: "Swedish",
    code: "sv",
    icon: SE,
  },
  {
    name: "Swahili",
    code: "sw",
    icon: TZ,
  },
  {
    name: "Tamil",
    code: "ta",
    icon: LK,
  },
  {
    name: "Telugu",
    code: "te",
    icon: IN,
  },
  {
    name: "Thai",
    code: "th",
    icon: TH,
  },
  {
    name: "Tigrinya",
    code: "ti",
    icon: ER,
  },
  {
    name: "Turkmen",
    code: "tk",
    icon: TM,
  },
  {
    name: "Setswana",
    code: "tn",
    icon: BW,
  },
  {
    name: "Tonga",
    code: "to",
    icon: TO,
  },
  {
    name: "Turkish",
    code: "tr",
    icon: TR,
  },
  {
    name: "Tatar",
    code: "tt",
    icon: RU,
  },
  {
    name: "Tahitian",
    code: "ty",
    icon: PF,
  },
  {
    name: "Uyghur",
    code: "ug",
    icon: CN,
  },
  {
    name: "Ukrainian",
    code: "uk",
    icon: UA,
  },
  {
    name: "Urdu",
    code: "ur",
    icon: PK,
  },
  {
    name: "Uzbek (Latin)",
    code: "uz",
    icon: UZ,
  },
  {
    name: "Vietnamese",
    code: "vi",
    icon: VN,
  },
  {
    name: "Xhosa",
    code: "xh",
    icon: ZA,
  },
  {
    name: "Yoruba",
    code: "yo",
    icon: NG,
  },
  {
    name: "Yucatec Maya",
    code: "yua",
    icon: MX,
  },
  {
    name: "Zulu",
    code: "zu",
    icon: ZA,
  },
];

export const languageCodeToName = (code: string) =>
  SUPPORTED_LANGUAGES.find((lang) => lang.code === code)?.name;
