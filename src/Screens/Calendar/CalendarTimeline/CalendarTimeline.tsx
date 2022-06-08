import { Box, styled } from "@mui/material";
import { format, isSameDay } from "date-fns";
import React, { useEffect, useRef, useState } from "react";
import vis from "vis";
import { ClassAssign } from "../../../types/types";

const SchedulerContainer = styled(Box)(() => ({
  height: "500px",
}));

export type TimelineItemProps = {
  item: number | null;
};

type Props = {
  schedule: ClassAssign[];
  selectedDay: Date;
  handleTimelineItemClick(properties: TimelineItemProps): void;
};

const CalendarTimeline = ({
  schedule,
  selectedDay,
  handleTimelineItemClick,
}: Props) => {
  const timelineContainer = useRef<HTMLElement>();
  const [timeline, setTimeline] = useState<vis.Timeline | null>(null);
  const [timelineDate, setTimelineDate] = useState<Date>(selectedDay);
  const backgroundColors = ["#74B8F8", "#C26F6F", "#85AC85"];

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
          const groupId = classAssign.assignedClass.id;

          if (!(groupId in groups)) {
            groups[groupId] = {
              id: groupId,
              content: `כיתה ${classAssign.assignedClass.name} בניין ${classAssign.assignedClass.building.name}`,
            };
          }

          return {
            id: index,
            content: `${format(classAssign.endDate, "HH:mm")} - ${format(
              classAssign.startDate,
              "HH:mm"
            )}`,
            style: `
            background: ${backgroundColors[index % backgroundColors.length]};
            padding: 4px 32px;
            `,
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
      zoomMin: 1000 * 60 * 300,
      zoomMax: 1000 * 60 * 300,
      minHeight: "100%",
      min: workStartDate,
      max: workEndDate,
      start: workStartDate,
      end: workEndDate,
    };
  }

  return <SchedulerContainer ref={timelineContainer} />;
};

export default CalendarTimeline;
