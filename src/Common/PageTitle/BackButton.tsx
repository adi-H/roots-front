import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import BACK_BUTTON from "../../Images/backButton.png";

type Props = { height?: string; width?: string };

export const BackButton = (props: Props) => {
  const navigate = useNavigate();
  return (
    <Button
      onClick={() => navigate(-1)}
      sx={{
        backgroundImage: `url(${BACK_BUTTON})`,
        backgroundSize: "cover",
        minHeight: props.height || "5vh",
        minWidth: props.width || "5vh",
        padding: 0,
        borderRadius: "100%",
        boxShadow: "0 4px 4px rgba(0, 0, 0, 0.2)",
      }}
    />
  );
};
