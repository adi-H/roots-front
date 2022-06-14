import { Box } from "@mui/material";
import { format, isSameDay } from "date-fns";
import React, { useEffect, useRef, useState } from "react";
import vis from "vis";
import { ClassAssign } from "../../../types/types";
import "./CalendarTimeline.css";

export type TimelineItemProps = {
  item: number | null;
};

type Props = {
  schedule: ClassAssign[];
  selectedDay: Date;
  includePluga?: boolean;
  handleTimelineItemClick(properties: TimelineItemProps): void;
};

const itemStyles: Record<string, string>[] = [
  { background: "#CEE8FF" },
  { background: "#F9B9B9" },
  { background: "#C2F1B2" },
  { background: "#FBFBAA" },
];

const CalendarTimeline = ({
  schedule,
  selectedDay,
  includePluga,
  handleTimelineItemClick,
}: Props) => {
  const timelineContainer = useRef<HTMLElement>();
  const [timeline, setTimeline] = useState<vis.Timeline | null>(null);
  const [timelineDate, setTimelineDate] = useState<Date>(selectedDay);
  // Initialize the timeline
  useEffect(() => {
    if (timelineContainer.current) {
      const options = getOptions();
      options.start instanceof Date && setTimelineDate(options.start);
      setTimeline(new vis.Timeline(timelineContainer.current, [], options));
    }
  }, []);

  // Update boundaries & options of the timeline
  useEffect(() => {
    if (timeline) {
      if (!isSameDay(selectedDay, timelineDate)) {
        const options = getOptions();
        options.start instanceof Date && setTimelineDate(options.start);
        timeline.setOptions(options);
      }
    }
  }, [timeline, selectedDay]);

  // Update the click event for new schedule state
  useEffect(() => {
    timeline && timeline.on("click", handleTimelineItemClick);

    return () => {
      timeline && timeline.off("click", handleTimelineItemClick);
    };
  }, [timeline, schedule, handleTimelineItemClick]);

  // Update data of the timeline
  useEffect(() => {
    if (timeline) {
      const groups: Record<number, vis.DataGroup> = {};
      const items = new vis.DataSet(
        schedule.map((classAssign, index) => {
          const groupId: number = classAssign.assignedClass.id;

          if (!(groupId in groups)) {
            groups[groupId] = {
              id: groupId,
              content:
                (includePluga
                  ? `פלוגה ${classAssign.createdBy.team.parent.name} `
                  : "") +
                `כיתה ${classAssign.assignedClass.name} בניין ${classAssign.assignedClass.building.name}`,
              style: `color: black;`,
            };
          }

          let styleString = `
            border-radius: 10px;
            padding: 4px 32px;
            color: black;
            border: none;`;
          const styles = itemStyles[index % itemStyles.length];

          for (const styleKey in styles) {
            styleString += `${styleKey}: ${styles[styleKey]};`;
          }

          return {
            id: index,
            content: `${format(classAssign.endDate, "HH:mm")} - ${format(
              classAssign.startDate,
              "HH:mm"
            )}`,
            style: styleString,
            start: classAssign.startDate,
            end: classAssign.endDate,
            group: groupId,
          };
        })
      );

      timeline.setGroups(Object.values(groups));
      timeline.setItems(items);
    }
  }, [timeline, schedule]);

  function getOptions(): vis.TimelineOptions {
    const workStartDate = new Date(selectedDay);
    const workEndDate = new Date(selectedDay);
    workStartDate.setHours(7, 0, 0, 0);
    workEndDate.setHours(23, 0, 0, 0);

    return {
      orientation: "top",
      locale: "he",
      showCurrentTime: true,
      showMajorLabels: false,
      zoomable: false,
      timeAxis: { scale: "minute", step: 30 },
      zoomMin: 1000 * 60 * 100,
      zoomMax: 1000 * 60 * 100,
      min: workStartDate,
      max: workEndDate,
      start: workStartDate,
      end: workEndDate,
      margin: {
        axis: 50,
        item: 60,
      },
    };
  }

  return <Box ref={timelineContainer} />;
};

export default CalendarTimeline;
