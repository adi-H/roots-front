import { Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { PageTitle } from "../../Common/PageTitle/PageTitle";
import { UrlService } from "../../Services/UrlService";
import { Url } from "../../types/types";
import styles from "./BroshShishi.module.css";

type Props = {};

export const BroshShishi = (props: Props) => {
  const [broshUrl, setBroshUrl] = useState<Url>(null!);

  useEffect(() => {
    const fetchBroshURL = async () => {
      const newBroshUrl = await UrlService.getBroshUrl();

      setBroshUrl(newBroshUrl);
    };

    fetchBroshURL();
  }, []);

  return (
    <Paper className={styles.container}>
      <PageTitle title="ברושישי" disableBackButton />
      <iframe
        title="ברושישי"
        style={{
          display: "block",
          height: "80%",
          width: "80%",
          borderRadius: "20px",
          marginRight: "auto",
          marginLeft: "auto",
        }}
        src={broshUrl?.url}
        scrolling="scrolling"
        frameBorder="0"
        seamless
        allowTransparency
        allowFullScreen
      />
    </Paper>
  );
};
