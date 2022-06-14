import { ClassCard } from "./ClassCard/ClassCard";
import Grid from "@mui/material/Grid";
import { useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import { Class } from "../../types/types";
import { useAuth } from "../../Hooks/useAuth";
import { Box, Typography } from "@mui/material";

type Props = {
  foundClasses: Class[];
  handleAssignClass: (classId: number, reason: string) => void;
};

export default function Classes(props: Props) {
  const [toShowAll, setToShowAll] = useState(false);

  const currentUser = useAuth();

  const filterAndMapClasses = () => {
    if (props.foundClasses.length === 0) {
      setToShowAll(true);

      return <Typography fontWeight={"bold"}>אין כיתות זמינות</Typography>;
    }

    const classCards = props.foundClasses
      .filter(
        (foundClass: Class) =>
          toShowAll || foundClass.owner.id === currentUser.team.parent.id
      )
      .map((foundClass: Class) => (
        <Grid item xs={6} key={foundClass.id}>
          <ClassCard
            classInfo={foundClass}
            isPluga={foundClass.owner.id === currentUser.team.parent.id}
            handleAssignClass={(eventName: string) =>
              props.handleAssignClass(foundClass.id, eventName)
            }
          />
        </Grid>
      ));

    return classCards.length > 0 ? (
      classCards
    ) : (
      <Typography fontWeight={"bold"}>אין כיתות פלוגתיות זמינות</Typography>
    );
  };

  return (
    <Box sx={{ padding: "1rem 0", margin: "3%" }}>
      <Grid
        container
        rowSpacing={{ xs: 1, sm: 2, md: 3 }}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        justifyContent="center"
      >
        {filterAndMapClasses()}
      </Grid>
      <br></br>
      <LoadingButton
        disabled={toShowAll}
        onClick={() => setToShowAll(true)}
        sx={{
          display: "flex",
          maxWidth: "90%",
          marginLeft: "auto",
          marginRight: "auto",
        }}
        variant="contained"
        fullWidth
      >
        טען עוד
      </LoadingButton>
    </Box>
  );
}
