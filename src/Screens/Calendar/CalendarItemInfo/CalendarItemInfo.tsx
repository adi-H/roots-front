import { Close } from "@mui/icons-material";
import { Dialog, Grid, IconButton } from "@mui/material";
import React, { useState } from "react";
import ClassInfoProperty from "./ClassInfoProperty";

export type ClassItemInfo = {
  dateString?: string;
  building?: string;
  classNumber?: string;
  startTime?: string;
  endTime?: string;
  reason?: string;
  createdByName?: string;
  createdByPhone?: string;
};

type Props = ClassItemInfo & {
  open: boolean;
  handleClose: () => void;
};

const CalendarItemInfo = ({
  dateString,
  building,
  classNumber,
  startTime,
  endTime,
  createdByName,
  createdByPhone,
  reason,
  open,
  handleClose,
}: Props) => {
  const properties = [
    { title: "בקשה על ידי", content: createdByName, important: true },
    { title: "מספר טלפון", content: createdByPhone, important: true },
    { title: "שם האירוע", content: reason === "" ? "אין שם לאירוע" : reason },
    { title: "תאריך", content: dateString },
    { title: "בניין", content: building },
    { title: "כיתה", content: classNumber },
    { title: "שעת התחלה", content: startTime },
    { title: "שעת סיום", content: endTime },
  ];

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      PaperProps={{ sx: { borderRadius: "15px" } }}
    >
      <IconButton
        sx={{ position: "absolute", top: 0, left: 0 }}
        onClick={handleClose}
      >
        <Close />
      </IconButton>
      <Grid container sx={{ padding: 4 }}>
        {properties.map(
          ({ title, content, important }, index) =>
            content !== undefined && (
              <Grid item key={index} xs={6} textAlign="center" mt={1} mb={1}>
                <ClassInfoProperty
                  title={title}
                  content={content}
                  important={important}
                />
              </Grid>
            )
        )}
      </Grid>
    </Dialog>
  );
};

export default CalendarItemInfo;
