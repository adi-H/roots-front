import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {
  Card,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Utilities } from "../../../utils/Utilities";
import { ClassAssign } from "../../../types/types";

type Props = {
  classRequests: ClassAssign[];
  onRequestAccept: (classAssignId: number) => void;
  onRequestReject: (classAssignId: number) => void;
};

const tableHeaders = [
  {
    text: "כיתה",
  },
  {
    text: "תאריך",
  },
  {
    text: "שעת התחלה",
  },
  {
    text: "שעת סיום",
  },
  {
    text: "בקשה על ידי",
  },
  {
    text: "פעולות",
  },
];

export const ClassRequests = (props: Props) => {
  return (
    <Card>
      <TableContainer>
        <Table
          sx={{ tableLayout: "fixed", display: "block", overflowX: "hidden" }}
        >
          <TableHead>
            <TableRow>
              {tableHeaders.map((header) => (
                <TableCell
                  key={header.text}
                  sx={{ maxWidth: "10.5%", fontSize: "0.8rem" }}
                  align={"center"}
                >
                  {header.text}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody sx={{ display: "block", height: "27vh" }}>
            {props.classRequests.map((classRequest) => (
              <TableRow key={classRequest.id}>
                <TableCell
                  sx={{ maxWidth: "10.5%", fontSize: "0.7rem" }}
                  align={"center"}
                >
                  {classRequest.assignedClass.name}
                </TableCell>
                <TableCell
                  sx={{
                    maxWidth: "10.5%",
                    fontSize: "0.7rem",
                  }}
                  align={"center"}
                >
                  <span style={{ display: "flex", justifyContent: "center" }}>
                    {Utilities.getFormattedDate(classRequest.startDate)}
                  </span>
                </TableCell>
                <TableCell
                  sx={{ maxWidth: "10.5%", fontSize: "0.7rem" }}
                  align={"center"}
                >
                  {Utilities.getFormattedTime(classRequest.startDate)}
                </TableCell>
                <TableCell
                  sx={{ maxWidth: "10.5%", fontSize: "0.7rem" }}
                  align={"center"}
                >
                  {Utilities.getFormattedTime(classRequest.endDate)}
                </TableCell>
                <TableCell
                  sx={{ maxWidth: "10.5%", fontSize: "0.7rem" }}
                  align={"center"}
                >
                  {Utilities.getFullName(classRequest.createdBy)}
                </TableCell>
                <TableCell
                  sx={{ maxWidth: "10.5%", fontSize: "0.7rem" }}
                  align={"center"}
                >
                  <IconButton
                    color="success"
                    onClick={() => props.onRequestAccept(classRequest.id)}
                  >
                    <CheckCircleIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => props.onRequestReject(classRequest.id)}
                  >
                    <CancelIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};
