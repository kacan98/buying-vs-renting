import enTranslation from "../../public/i18n/en/translation.json";
import deTranslation from "../../public/i18n/de/translation.json";
import czTranslation from "../../public/i18n/cz/translation.json";
import dkTranslation from "../../public/i18n/dk/translation.json";
import seTranslation from "../../public/i18n/se/translation.json";
import roTranslation from "../../public/i18n/ro/translation.json";

export const supportedLanguages = [
  {
    code: "cz",
    name: "Čeština",
    file: czTranslation,
  },
  {
    code: "de",
    name: "Deutsch",
    file: deTranslation,
  },
  {
    code: "dk",
    name: "Dansk",
    file: dkTranslation,
  },
  {
    code: "en",
    name: "English",
    file: enTranslation,
  },
  {
    code: "ro",
    name: "Română",
    file: roTranslation,
  },
  {
    code: "se",
    name: "Svenska",
    file: seTranslation,
  },
];
