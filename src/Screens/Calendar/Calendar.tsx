import { ViewState } from "@devexpress/dx-react-scheduler";
import {
  Appointments,
  DayView,
  Scheduler,
  CurrentTimeIndicator,
  AppointmentTooltip,
} from "@devexpress/dx-react-scheduler-material-ui";
import { Box, Button, Divider, Paper, styled } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageTitle } from "../../Common/PageTitle/PageTitle";
import { useAuth } from "../../Hooks/useAuth";
import { ClassAssignService } from "../../Services/ClassAssignService";
import { UnitService } from "../../Services/UnitService";
import { ClassAssign, Unit } from "../../types/types";
import { CalendarForm } from "./CalendarForm/CalendarForm";
import { ClassRequests } from "./ClassRequests/ClassRequests";
import vis from "vis";
import { format, isSameDay } from "date-fns";
import ClassNotFound from "./ClassNotFound/ClassNotFound";
import { he } from "date-fns/locale";
import CalendarItemInfo, {
  ClassItemInfo,
} from "./CalendarItemInfo/CalendarItemInfo";
import CalendarTimeline, {
  TimelineItemProps,
} from "./CalendarTimeline/CalendarTimeline";
import { toast } from "react-toastify";

type MappedAppointment = ClassAssign & {
  originalTitle: string;
};

const mapAppointments = (appointments: ClassAssign[]): MappedAppointment[] =>
  appointments.map((appointment) => ({
    ...appointment,
    originalTitle: appointment.title,
    title: `${appointment.title}, ${appointment.assignedClass.building.name} ${appointment.assignedClass.name}`,
  }));

const filterAndMapAppointments = (
  appointments: ClassAssign[],
  plugaId: number
): MappedAppointment[] => {
  return mapAppointments(
    plugaId > 0
      ? appointments.filter(
          (appointment) => appointment.createdBy.team.parent.id === plugaId
        )
      : appointments
  );
};

export const Calendar = () => {
  // Schedule is the filtered array containing only chosen pluga's appointments
  const loggedUser = useAuth();
  const [schedule, setSchedule] = useState<MappedAppointment[]>([]);
  const [allAppointments, setAllAppointments] = useState<ClassAssign[]>([]);
  const [selectedPlugaId, setSelectedPlugaId] = useState<number>(0);
  const [selectedGdudId, setSelectedGdudId] = useState<number>(0);
  const [allUnits, setAllUnits] = useState<Unit[]>([]);
  const [selectedDay, setSelectedDay] = useState<Date>(new Date());
  const [classRequests, setClassRequests] = useState<ClassAssign[]>([]);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [dialogData, setDialogData] = useState<ClassItemInfo | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const requests = await ClassAssignService.getRequests();
      const units = await UnitService.getAll();
      await fetchSchedule();

      setSelectedGdudId(
        loggedUser?.team.parent.parent.id ? loggedUser.team.parent.parent.id : 0
      );
      setSelectedPlugaId(
        loggedUser?.team.parent.id ? loggedUser.team.parent.id : 0
      );
      setClassRequests(requests);
      setAllUnits(units);
    }
    fetchData();
  }, []);

  useEffect(() => {
    fetchSchedule();
  }, [selectedDay]);

  useEffect(() => {
    setSchedule(filterAndMapAppointments(allAppointments, selectedPlugaId!));
  }, [selectedPlugaId]);

  const fetchSchedule = async () => {
    const appointmentsData = await ClassAssignService.getDaySchedule(
      selectedDay
    );
    setAllAppointments(appointmentsData);
    const schedule = filterAndMapAppointments(
      appointmentsData,
      selectedPlugaId!
    );

    if (schedule.length <= 0) {
      // Display Error
    }
    setSchedule(schedule);
  };

  const handleSelectedDayChange = (newDate: Date) => {
    setSelectedDay(newDate);
  };

  const handleRequestAccept = async (classAssignId: number) => {
    try {
      await ClassAssignService.acceptRequest(classAssignId);
      setClassRequests((oldClassRequests) =>
        oldClassRequests.filter(
          (classRequest) => classRequest.id !== classAssignId
        )
      );
      await fetchSchedule();
    } catch (e) {
      toast.error("אירעה שגיאה באישור הבקשה");
    }
  };

  const handleRequestReject = async (classAssignId: number) => {
    try {
      await ClassAssignService.rejectRequest(classAssignId);
      setClassRequests((oldClassRequests) =>
        oldClassRequests.filter(
          (classRequest) => classRequest.id !== classAssignId
        )
      );
    } catch (e) {
      toast.error("אירעה שגיאה בדחיית הבקשה");
    }
  };

  const handleItemInfoDialogClose = () => {
    setDialogOpen(false);
  };

  const handleTimelineItemClick = (item: TimelineItemProps) => {
    if (item.item !== null) {
      const appointment = schedule[item.item];
      const buildingString = `${appointment.assignedClass.building.name} ${appointment.assignedClass.name}`;
      const reason = appointment.originalTitle;

      setDialogData({
        dateString: format(appointment.startDate, "d בMMM, y", {
          locale: he,
        }),
        building: appointment.assignedClass.building.name,
        classNumber: appointment.assignedClass.name,
        startTime: format(appointment.startDate, "HH:mm", {
          locale: he,
        }),
        endTime: format(appointment.endDate, "HH:mm", {
          locale: he,
        }),
        reason,
        createdByName: `${appointment.createdBy.firstName} ${appointment.createdBy.lastName}`,
        createdByPhone: appointment.createdBy.phoneNumber,
      });
      setDialogOpen(true);
    }
  };

  return (
    <>
      <PageTitle title={'לו"ז כיתות'} />
      <CalendarForm
        selectedDay={selectedDay}
        selectedGdudId={selectedGdudId}
        selectedPlugaId={selectedPlugaId}
        allUnits={allUnits}
        onSelectedDayChange={handleSelectedDayChange}
        onSelectedGdudChange={(gdudId: number) => setSelectedGdudId(gdudId)}
        onSelectedPlugaChange={(plugaId: number) => setSelectedPlugaId(plugaId)}
      />
      <CalendarTimeline
        schedule={schedule}
        selectedDay={selectedDay}
        includePluga={selectedPlugaId < 0}
        handleTimelineItemClick={handleTimelineItemClick}
      />
      <CalendarItemInfo
        open={dialogOpen}
        {...dialogData}
        handleClose={handleItemInfoDialogClose}
      />
    </>
  );
};
