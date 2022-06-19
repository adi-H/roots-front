import { Box } from "@mui/material";
import React, { useState } from "react";
import { PageTitle } from "../../../Common/PageTitle/PageTitle";
import { ClassAssignService } from "../../../Services/ClassAssignService";
import { ClassService } from "../../../Services/ClassService";
import { Class, ClassAssign } from "../../../types/types";
import Results from "../Classes";
import { ResponsiveDatePickers } from "../SearchClass/SearchClass";

export default function Classes() {
  const [foundClasses, setFoundClasses] = useState<Class[]>([]);
  const [chosenDate, setChosenDate] = useState<Date>(new Date());
  const [startTime, setStartTime] = useState<Date>(new Date());
  const [endTime, setEndTime] = useState<Date>(new Date());
  const [chosenClassTypeId, setChosenClassTypeId] = useState<number>(0);

  const handleSearchClasses = async (startTime: Date, endTime: Date) => {
    const newFoundClasses = await ClassService.getAvailableClasses(
      startTime,
      endTime,
      chosenClassTypeId
    );

    setFoundClasses(newFoundClasses);
  };

  const handleClassAssign = async (classId: number, eventName: string) => {
    const startDate = new Date(chosenDate.valueOf());
    const endDate = new Date(chosenDate.valueOf());

    startDate.setHours(startTime.getHours());
    startDate.setMinutes(startTime.getMinutes());
    startDate.setSeconds(startTime.getSeconds());

    endDate.setHours(endTime.getHours());
    endDate.setMinutes(endTime.getMinutes());
    endDate.setSeconds(endTime.getSeconds());

    ClassAssignService.addClassAssign({
      title: eventName,
      startDate,
      endDate,
      classId,
    } as unknown as ClassAssign);
  };

  return (
    <>
      <PageTitle title="שריון כיתות" />
      <Box sx={{ padding: "1rem 0", margin: "3%" }}>
        {foundClasses.length === 0 ? (
          <ResponsiveDatePickers
            endTime={endTime}
            startTime={startTime}
            chosenDate={chosenDate}
            chosenClassTypeId={chosenClassTypeId}
            setChosenClassTypeId={setChosenClassTypeId}
            setEndTime={setEndTime}
            setChosenDate={setChosenDate}
            setStartTime={setStartTime}
            handleSearchClasses={handleSearchClasses}
          />
        ) : (
          <Results
            handleAssignClass={handleClassAssign}
            foundClasses={foundClasses}
          ></Results>
        )}
      </Box>
    </>
  );
}
