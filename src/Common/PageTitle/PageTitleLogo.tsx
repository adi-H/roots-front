import { useNavigate } from "react-router-dom";
import Logo from "../../Images/navbarLogo.svg";

export const PageTitleLogo = () => {
  const navigate = useNavigate();

  function navigateToHome() {
    navigate("/");
  }

  return (
    <img
      src={Logo}
      alt="לוגו"
      style={{
        backgroundSize: "cover",
        height: "5vh",
        maxHeight: "40px",
        padding: 0,
        cursor: "pointer",
      }}
      onClick={navigateToHome}
    />
  );
};
