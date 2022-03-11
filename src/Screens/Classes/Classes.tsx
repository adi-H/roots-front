import ClassCard from "./Components/ClassCard";
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useState } from "react";
import LoadingButton from '@mui/lab/LoadingButton';

const classes = [
  { "no": "805", "building": "נקרות", "type": "פלוגתית", "projector": true, "size": "פלוגתית" },
  { "no": "405", "building": "רבין", "type": "פלוגתית", "projector": false, "size": "צוותית" },
  { "no": "206", "building": "מחשבים", "type": "גדודית", "projector": true, "size": "פלוגתית" },];

export default function Classes() {
  const [isLoading, setIsLoading] = useState(false);

  let type: string = "פלוגתית";

  let classInfos: any = [];

  classes.forEach((classResponse) => {
    if (classResponse.type == "פלוגתית") {
      classInfos.push(classResponse)
    }
  })

  let itemList: any = [];

  const alignment: any = { vertical: "bottom", horizontal: "center" }

  classInfos.forEach((classInfo: any) => {
    itemList.push(<Grid item xs={6}><ClassCard info={classInfo} /></Grid>)
  })

  let dis: boolean = false;
  const load = () => {
    setTimeout(() => { setIsLoading((currentState) => !currentState) }, 5000)
    let size = classInfos.length

    while (size == classInfos.length || !dis) {
      if (type == "פלוגתית") {
        type = "דו\"פ"
      } else if (type == "דו\"פ") {
        type = "גדודית"
      } else if (type = "גדודית") {
        type = "בה\"דית"
        dis = true
      }

      classes.forEach((classResponse) => {
        if (classResponse.type == type) {
          classInfos.push(classResponse)
        }
      })
    }

    classInfos.forEach((classInfo: any) => {
      itemList.push(<Grid item xs={6}><ClassCard info={classInfo} /></Grid>)
    })

    setIsLoading((currentState) => !currentState)
  }

  return (
    <main style={{ padding: "1rem 0", margin: "3%" }}>
      <h2>CLASSES</h2>
      <Grid container rowSpacing={{ xs: 1, sm: 2, md: 3 }} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {itemList}
      </Grid>

      <LoadingButton disabled={dis} onClick={load} loading={isLoading} sx={{ maxWidth: 375, position: "absolute", bottom: 0 }} variant="contained" fullWidth>טען עוד</LoadingButton>
    </main>
  );
}


