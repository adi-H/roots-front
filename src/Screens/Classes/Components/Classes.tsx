import ClassCard from "./ClassCard";
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useEffect } from "react";
import { positions } from '@mui/system';
import { spacing } from '@mui/system';
import useState from 'react-usestateref'
import LoadingButton from '@mui/lab/LoadingButton';

// const classes = [
//   { "no": "805", "building": "נקרות", "type": "פלוגתית", "projector": true, "size": "פלוגתית" },
//   { "no": "622", "building": "נקרות", "type": "דו\"פ", "projector": true, "size": "פלוגתית" },
//   { "no": "455", "building": "נקרות", "type": "דו\"פ", "projector": true, "size": "פלוגתית" },
//   { "no": "125", "building": "נקרות", "type": "דו\"פ", "projector": true, "size": "פלוגתית" },
//   { "no": "405", "building": "רבין", "type": "פלוגתית", "projector": false, "size": "צוותית" },
//   { "no": "206", "building": "מחשבים", "type": "גדודית", "projector": true, "size": "פלוגתית" },
//   { "no": "898", "building": "מחשבים", "type": "גדודית", "projector": true, "size": "פלוגתית" },
//   { "no": "805", "building": "נקרות", "type": "בה\"דית", "projector": true, "size": "פלוגתית" },
// ];

export default function Classes(props: any) {
  let classes: any = props.data;
  const [isLoading, setIsLoading] = useState(false);
  const [isDisableed, setIsDisableed, isDisableedRef] = useState(false);
  const [type, setType, typeRef] = useState("פלוגתית");

  let classInfos: any = [];

  classes.forEach((classResponse: any) => {
    if (classResponse.type == "פלוגתית") {
      classInfos.push(classResponse)
    }
  })

  const [infos, setInfos, infosRef] = useState(classInfos);


  let itemList: any = [];

  infos.forEach((classInfo: any) => {
    itemList.push(<Grid item xs={6}><ClassCard info={classInfo} /></Grid>)
  })

  const [cards, setCards] = useState(itemList);

  const load = () => {
    setIsLoading((currentState:boolean) => !currentState)
    setTimeout(async () => {
      let size = infos.length;

      classInfos = infos;
      
      while (size == infosRef.current.length && !isDisableedRef.current) {
        if (typeRef.current == "פלוגתית") {
          setType("דו\"פ")
        } else if (typeRef.current == "דו\"פ") {
          setType("גדודית")
        } else if (typeRef.current == "גדודית") {
          setType("בה\"דית")
          setIsDisableed(() => true);
        }

        classes.forEach((classResponse: any) => {
          if (classResponse.type == typeRef.current) {
            classInfos.push(classResponse)
          }
        })

        console.log(typeRef.current)
        console.log(classInfos)


        setInfos(classInfos)
      }
      console.log(infos)
      
      itemList = [];

      infosRef.current.forEach((classInfo: any) => {
        itemList.push(<Grid item xs={6}><ClassCard info={classInfo} /></Grid>)
      })

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
      <LoadingButton disabled={isDisableed} onClick={load} loading={isLoading} sx={{ display: "flex", maxWidth: 375, position: "fixed", bottom: 0 }} variant="contained" fullWidth>טען עוד</LoadingButton>
    </main>
  );
}