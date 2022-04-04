import { ViewState } from "@devexpress/dx-react-scheduler";
import {
  Appointments,
  DayView,
  Scheduler,
} from "@devexpress/dx-react-scheduler-material-ui";
import { Divider, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { PageTitle } from "../../Common/PageTitle/PageTitle";
import { useAuth } from "../../Hooks/useAuth";
import { ClassAssignService } from "../../Services/ClassAssignService";
import { UnitService } from "../../Services/UnitService";
import { ClassAssign, Unit } from "../../types/types";
import { CalendarForm } from "./CalendarForm/CalendarForm";
import { ClassRequests } from "./ClassRequests/ClassRequests";

type Props = {};

const filterAndMapAppointments = (
  appointments: ClassAssign[],
  plugaId: number
) => {
  return appointments
    .filter((appointment) => appointment.createdBy.team.parent.id === plugaId)
    .map((appointment) => ({
      ...appointment,
      title: `${appointment.title}, ${appointment.assignedClass.building.name} ${appointment.assignedClass.name}`,
    }));
};

export const Calendar = (props: Props) => {
  // Schedule is the filtered array containing only chosen pluga's appointments
  const loggedUser = useAuth();
  const [schedule, setSchedule] = useState<ClassAssign[]>([]);
  const [allAppointments, setAllAppointments] = useState<ClassAssign[]>([]);
  const [selectedPlugaId, setSelectedPlugaId] = useState<number>(0);
  const [selectedGdudId, setSelectedGdudId] = useState<number>(0);
  const [allUnits, setAllUnits] = useState<Unit[]>([]);
  const [selectedDay, setSelectedDay] = useState(new Date());
  const [classRequests, setClassRequests] = useState<ClassAssign[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const requests = await ClassAssignService.getRequests();
      const units = await UnitService.getAll();
      await fetchSchedule();

      setClassRequests(requests);
      setAllUnits(units);
    }
    fetchData();
  }, []);

  useEffect(() => {
    setSelectedGdudId(
      loggedUser?.team.parent.parent.id ? loggedUser.team.parent.parent.id : 0
    );
    setSelectedPlugaId(
      loggedUser?.team.parent.id ? loggedUser.team.parent.id : 0
    );
  }, [loggedUser]);

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

    setSchedule(filterAndMapAppointments(appointmentsData, selectedPlugaId!));
  };

  const handleSelectedDayChange = (newDate: string | null) => {
    if (newDate) {
      setSelectedDay(new Date(newDate));
    }
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
      Swal.fire({ title: "קרתה שגיאה באישור הבקשה", icon: "error" });
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
      Swal.fire({ title: "קרתה שגיאה בדחיית הבקשה", icon: "error" });
    }
  };

  return (
    <>
      <PageTitle title={'לו"ז כיתות'}></PageTitle>
      <ClassRequests
        classRequests={classRequests}
        onRequestAccept={handleRequestAccept}
        onRequestReject={handleRequestReject}
      />
      <CalendarForm
        selectedDay={selectedDay}
        selectedGdudId={selectedGdudId}
        selectedPlugaId={selectedPlugaId}
        allUnits={allUnits}
        onSelectedDayChange={handleSelectedDayChange}
        onSelectedGdudChange={(gdudId: number) => setSelectedGdudId(gdudId)}
        onSelectedPlugaChange={(plugaId: number) => setSelectedPlugaId(plugaId)}
      />
      <Divider />
      <Paper>
        <Scheduler data={schedule}>
          <ViewState currentDate={selectedDay} />
          <DayView startDayHour={7} endDayHour={23} />
          <Appointments />
        </Scheduler>
      </Paper>
    </>
  );
};
