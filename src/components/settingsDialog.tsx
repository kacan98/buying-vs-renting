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
import { CurrencyExchange } from "@mui/icons-material";
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
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const dispatch = useDispatch();

  const handleListItemClick = (name: string) => {
    switch (name) {
      case "Language":
        //TODO
        break;
      case "Currency":
        setConfirmationDialogOpen(true);
        break;
    }
  };

  const handleCurrencyModalClose = () => (value?: string) => {
    if (value) {
      dispatch(setCurrency(value));
    }
    setConfirmationDialogOpen(false);
  };
  const currentLocale = useSelector(
    (state: RootState) => state.settings.locale,
  );
  const currency = useSelector((state: RootState) => state.settings.currency);

  const settings: {
    name: string;
    icon: React.ReactNode;
    value: string;
  }[] = [
    // { name: "Language", value: locale, icon: <Language /> }, //TODO
    { name: "Currency", value: currency || "USD", icon: <CurrencyExchange /> },
  ];

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
        {settings.map(({ name, value, icon }) => (
          <ListItem disableGutters key={name}>
            <ListItemButton onClick={() => handleListItemClick(name)}>
              <ListItemAvatar>{icon}</ListItemAvatar>
              <ListItemText primary={name} secondary={value} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <OptionsModal
        id={"currency"}
        keepMounted={false}
        value={currency}
        title={"Select currency"}
        open={confirmationDialogOpen}
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
