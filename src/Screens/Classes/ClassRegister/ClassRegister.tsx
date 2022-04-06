import { Box } from "@mui/material";
import React, { useState } from "react";
import { PageTitle } from "../../../Common/PageTitle/PageTitle";
import { ClassService } from "../../../Services/ClassService";
import { Class } from "../../../types/types";
import Results from "../Classes";
import { ResponsiveDatePickers } from "../SearchClass/SearchClass";

export default function Classes() {
  const [foundClasses, setFoundClasses] = useState<Class[]>([]);

  const handleSearchClasses = async (
    startTime: Date,
    endTime: Date,
    chosenClassTypeId: number
  ) => {
    const newFoundClasses = await ClassService.getAvailableClasses(
      startTime,
      endTime,
      chosenClassTypeId
    );

    setFoundClasses(newFoundClasses);
  };

  return (
    <>
      <PageTitle title="שריון כיתות" />
      <Box sx={{ padding: "1rem 0", margin: "3%" }}>
        {foundClasses.length == 0 ? (
          <ResponsiveDatePickers handleSearchClasses={handleSearchClasses} />
        ) : (
          <Results foundClasses={foundClasses}></Results>
        )}
      </Box>
    </>
  );
}
