import ClassCard from "./ClassCard";
import Grid from '@mui/material/Grid';
import { useState } from 'react'
import LoadingButton from '@mui/lab/LoadingButton';

export default function Classes(props: any) {
  let classes: any = props.data;
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [type, setType] = useState("פלוגתית");

  let classInfos: any = [];

  classes.forEach((classResponse: any) => {
    if (classResponse.type == "פלוגתית") {
      classInfos.push(classResponse)
    }
  })

  const [infos, setInfos] = useState(classInfos);


  let itemList: any = [];

  infos.forEach((classInfo: any) => {
    itemList.push(<Grid item xs={6}><ClassCard info={classInfo} /></Grid>)
  })

  const [cards, setCards] = useState(itemList);

  const load = () => {
    setIsLoading((currentState:boolean) => !currentState)
    setTimeout(async () => {
      let size = infos.length;
      let disabled: boolean = isDisabled;
      let i = infos;

      classInfos = infos;

      let t: string = type;
      
      while (size == i.length && !disabled) {
        if (t == "פלוגתית") {
          t = "דו\"פ";
        } else if (t == "דו\"פ") {
          t = "גדודית";
        } else if (t == "גדודית") {
          t = "בה\"דית";
          disabled = true;
        }

        classes.forEach((classResponse: any) => {
          if (classResponse.type == t) {
            classInfos.push(classResponse)
          }
        })

        console.log(classInfos)


        setInfos(classInfos)
      }
      
      itemList = [];

      i.forEach((classInfo: any) => {
        itemList.push(<Grid item xs={6}><ClassCard info={classInfo} /></Grid>)
      })

      setIsDisabled(disabled);
      setType(t);
      setInfos(i);
      setCards(itemList)

      setIsLoading((currentState:boolean) => !currentState)
    }, 1000)
  }

  return (
    <main style={{ padding: "1rem 0", margin: "3%" }}>
      <h2>CLASSES</h2>
      <Grid container rowSpacing={{ xs: 1, sm: 2, md: 3 }} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {cards}
      </Grid>
      <br></br>
      <LoadingButton disabled={isDisabled} onClick={load} loading={isLoading} sx={{ display: "flex", maxWidth: 375, position: "fixed", bottom: 0 }} variant="contained" fullWidth>טען עוד</LoadingButton>
    </main>
  );
}