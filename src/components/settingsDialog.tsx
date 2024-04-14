import {
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { CurrencyExchange, RestartAltRounded } from "@mui/icons-material";
import React, { useState } from "react";
import { OptionsModal } from "./optionsModal.tsx";
import { supportedCurrencies } from "../../store/settings/supportedLocales.ts";
import { setCurrency } from "../../store/settings/settings.ts";

export interface SimpleDialogProps {
  open: boolean;
  onClose: () => void;
}

export function SettingsDialog(props: SimpleDialogProps) {
  const { onClose, open } = props;
  const [currencyDialogOpen, toggleCurrencyDialog] = useState(false);
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

  const settings: {
    name: "Language" | "Currency" | "Start over";
    icon: React.ReactNode;
    value?: string;
    hide?: boolean;
  }[] = [
    // { name: "Language", value: locale, icon: <Language /> }, //TODO
    { name: "Currency", value: currency, icon: <CurrencyExchange /> },
    {
      name: "Start over",
      icon: <RestartAltRounded />,
      hide: !currency || !currentLocale,
    },
  ];

  const handleListItemClick = (name: (typeof settings)[number]["name"]) => {
    switch (name) {
      case "Language":
        //TODO
        break;
      case "Currency":
        toggleCurrencyDialog(true);
        break;
      case "Start over":
        localStorage.removeItem("state");
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
      <DialogTitle>Settings</DialogTitle>
      <List sx={{ pt: 0 }}>
        {settings.map(
          ({ name, value, icon, hide }) =>
            !hide && (
              <ListItem disableGutters key={name}>
                <ListItemButton onClick={() => handleListItemClick(name)}>
                  <ListItemAvatar>{icon}</ListItemAvatar>
                  <ListItemText primary={name} secondary={value} />
                </ListItemButton>
              </ListItem>
            ),
        )}
      </List>

      <OptionsModal
        id={"currency"}
        keepMounted={false}
        value={currency}
        title={"Select currency"}
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
    </Dialog>
  );
}
