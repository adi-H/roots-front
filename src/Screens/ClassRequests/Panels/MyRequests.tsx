import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  Stepper,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { ClassAssignService } from "../../../Services/ClassAssignService";
import { UserRequest } from "../../../types/types";

const MyRequests = () => {
  const [requests, setRequests] = useState<UserRequest[]>([]);

  useEffect(() => {
    fetchUserRequests();
  }, []);

  async function fetchUserRequests() {
    setRequests(await ClassAssignService.getUserRequests());
  }

  console.log(requests);
  /**
 * 
          <Accordion expanded={false}>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography sx={{ width: "max-content", flexShrink: 0 }}>
                גדוד {request.classGdudName} פלוגה {request.classPlugaName} כיתה{" "}
                {request.className}
              </Typography>
              <Typography sx={{ color: "text.secondary" }}></Typography>
            </AccordionSummary>
            <AccordionDetails></AccordionDetails>
          </Accordion>
 */
  return (
    <Box sx={{ background: "#00000011", height: "100%" }}>
      <Grid
        container
        spacing={2}
        sx={{ margin: 0 }}
        justifyContent="space-evenly"
      >
        {requests.map((request) => (
          <>
            <Grid item sx={{ display: "flex" }} justifyContent="center">
              <Card
                sx={{
                  minWidth: "400px",
                  width: "max-content",
                  height: "max-content",
                }}
                elevation={0}
              >
                <CardContent>
                  <Typography sx={{ width: "max-content" }} fontWeight="bold">
                    גדוד {request.classGdudName} פלוגה {request.classPlugaName}{" "}
                    כיתה {request.className}
                  </Typography>
                  <Stepper></Stepper>
                </CardContent>
                <CardActions dir={"ltr"}>
                  <Button color="error">ביטול בקשה</Button>
                </CardActions>
              </Card>
            </Grid>
          </>
        ))}
      </Grid>
    </Box>
  );
};

export default MyRequests;
