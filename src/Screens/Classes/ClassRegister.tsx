// @ts-nocheck
import Search from "./Components/SearchClass";
import Results from "./Components/Classes";
import React, { useState } from "react";


const classes: Class[] = [
  { "no": "805", "building": "נקרות", "type": "פלוגתית", "projector": true, "size": "פלוגתית" },
  { "no": "622", "building": "נקרות", "type": "דו\"פ", "projector": true, "size": "פלוגתית" },
  { "no": "455", "building": "נקרות", "type": "דו\"פ", "projector": true, "size": "פלוגתית" },
  { "no": "125", "building": "נקרות", "type": "דו\"פ", "projector": true, "size": "פלוגתית" },
  { "no": "405", "building": "רבין", "type": "פלוגתית", "projector": false, "size": "צוותית" },
  { "no": "206", "building": "מחשבים", "type": "גדודית", "projector": true, "size": "פלוגתית" },
  { "no": "898", "building": "מחשבים", "type": "גדודית", "projector": true, "size": "פלוגתית" },
  { "no": "805", "building": "נקרות", "type": "בה\"דית", "projector": true, "size": "פלוגתית" },
];

export default function Classes() {
    const [childData, setChildData] = useState([]);

    const a = () => {
        setChildData(classes)
    }
    return (
        <main style={{ padding: "1rem 0", margin: "3%" }}>
            {((childData.length == 0) ? <Search passChildData={a}></Search> : <Results data={childData}></Results>)}
        </main>
    );
}