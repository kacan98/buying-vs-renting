import {
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import {
  CurrencyExchange,
  Language,
  RestartAltRounded,
} from "@mui/icons-material";
import React, { useState } from "react";
import { OptionsModal } from "./optionsModal.tsx";
import { supportedCurrencies } from "../../store/settings/supportedLocales.ts";
import {
  setCurrency,
  setLocale,
  setTheme,
} from "../../store/settings/settings.ts";
import { useTranslation } from "react-i18next";
import { supportedLanguages } from "../../store/settings/supportedLanguages.ts";

export interface SimpleDialogProps {
  open: boolean;
  onClose: () => void;
}

export function SettingsDialog(props: SimpleDialogProps) {
  const { t, i18n } = useTranslation();
  const { onClose, open } = props;
  const theme = useSelector((state: RootState) => state.settings.theme);
  const [currencyDialogOpen, toggleCurrencyDialog] = useState(false);
  const [languageModalOpen, toggleLanguageDialog] = useState(false);
  const dispatch = useDispatch();

  const currentLocale = useSelector(
    (state: RootState) => state.settings.locale,
  );
  const currency = useSelector((state: RootState) => state.settings.currency);

  const handleCurrencyModalClose = () => (value?: string) => {
    if (value) {
      dispatch(setCurrency(value));

      if (currentLocale) {
        onClose();
      }
    }
    toggleCurrencyDialog(false);
  };

  const handleLanguageSelect = () => (value?: string) => {
    if (value) {
      i18n.changeLanguage(value);
      dispatch(setLocale(value));
      onClose();
    }
    toggleLanguageDialog(false);
  };

  const settings: {
    name: string;
    icon: React.ReactNode;
    value?: string;
    hide?: boolean;
    key: "currency" | "startOver" | "language";
  }[] = [
    {
      key: "language",
      name: t("Language"),
      value: currentLocale,
      icon: <Language />,
    },
    {
      key: "currency",
      name: t("Currency"),
      value: currency,
      icon: <CurrencyExchange />,
    },
    {
      key: "startOver",
      name: t("Start over"),
      icon: <RestartAltRounded />,
      hide: !currency || !currentLocale,
    },
  ];

  const handleListItemClick = (key: (typeof settings)[number]["key"]) => {
    switch (key) {
      case "language":
        toggleLanguageDialog(true);
        break;
      case "currency":
        toggleCurrencyDialog(true);
        break;
      case "startOver":
        localStorage.removeItem("state");
        localStorage.removeItem("i18nextLng");
        //refresh page
        window.location.reload();
        break;
    }
  };

  return (
    <Dialog
      onClose={() => onClose()}
      open={open}
      slotProps={{
        backdrop: {
          sx: !currentLocale || !currency ? { backgroundColor: "#fff" } : {},
        },
      }}
    >
      <DialogTitle>{t("Settings")}</DialogTitle>
      <List sx={{ pt: 0 }}>
        {settings.map(
          ({ name, value, icon, hide, key }) =>
            !hide && (
              <ListItem disableGutters key={name}>
                <ListItemButton onClick={() => handleListItemClick(key)}>
                  <ListItemAvatar>{icon}</ListItemAvatar>
                  <ListItemText primary={name} secondary={value} />
                </ListItemButton>
              </ListItem>
            ),
        )}
        <ListItemText primary={t("Mode")} />
        <ListItem>
          <ToggleButtonGroup
            color="secondary"
            value={theme}
            exclusive
            onChange={(_, newValue) => dispatch(setTheme(newValue))}
            aria-label="Platform"
          >
            <ToggleButton value="auto">{t("Auto")}</ToggleButton>
            <ToggleButton value="light">{t("Light")}</ToggleButton>
            <ToggleButton value="dark">{t("Dark")}</ToggleButton>
          </ToggleButtonGroup>
        </ListItem>
      </List>

      <OptionsModal
        id={"currency"}
        keepMounted={false}
        value={currency}
        title={t("Select currency")}
        open={currencyDialogOpen}
        onClose={handleCurrencyModalClose()}
        options={supportedCurrencies.map(
          ({ locale, abbreviation, prefix, suffix }) => ({
            label: abbreviation + ` (${prefix}${suffix})`,
            value: abbreviation,
            key: locale,
          }),
        )}
      />

      <OptionsModal
        id={"language"}
        keepMounted={false}
        value={currentLocale}
        title={t("Select language")}
        open={languageModalOpen}
        onClose={handleLanguageSelect()}
        options={supportedLanguages.map(({ code, name }) => ({
          label: name,
          value: code,
          key: code,
        }))}
      />
    </Dialog>
  );
}
