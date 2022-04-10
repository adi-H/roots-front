import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { Items, Unit } from "../../../../types/types";
import { useEffect, useMemo, useState } from "react";
import { ItemsService } from "../../../../Services/ItemsService";
import { UnitService } from "../../../../Services/UnitService";
import { useAuth } from "../../../../Hooks/useAuth";

interface ItemsAvailable extends Items {
  available: number;
}

type Props = {
  items: Items[];
  deleteItem: (itemId: number) => void;
  returnItem: (itemId: number) => void;
  close: () => void;
};

// TODO: move server calls to Logistics component, the state is handled there and so as the server calls should
export const ExistingItem = (props: Props) => {
  const [toPass, setToPass] = useState(false);
  const [amount, setAmount] = useState(0);
  const [dis, setDis] = useState("");
  const [companies, setCompanies] = useState<Unit[]>([]);
  const [selectedCompanyId, setSelectedCompanyId] = useState<number>();
  const [selectedItem, setSelectedItem] = useState<Items>();
  const currentUser = useAuth();

  useEffect(() => {
    const fetchCompanies = async () => {
      const newCompanies = await UnitService.getCompaniesByGdud(
        currentUser.team.parent.parent.id
      );

      setCompanies(newCompanies);
    };

    fetchCompanies();
  }, []);

  const sortedItems = useMemo(() => {
    return props.items.sort((a, b) =>
      a.usedBy.id === a.owner.id ? -1 : b.usedBy.id === b.owner.id ? 1 : 0
    );
  }, [props.items]);

  const totalQuantity = useMemo(() => {
    let quantity = 0;
    props.items.forEach((item) => (quantity += item.quantity));
  }, [props.items]);

  const handleChangeAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    let d = event.target.value as unknown;
    setAmount(d as number);
  };

  const handleChangeDis = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDis(event.target.value);
  };

  async function passItems(
    itemId: number,
    usedBy: any,
    quantity: number,
    description: string
  ) {
    await ItemsService.usingItemes(itemId, usedBy, quantity, description);
    props.close();
  }

  async function returnItems(itemId: number) {
    await ItemsService.deleteUsage(itemId);
    props.returnItem(itemId);
    props.close();
  }

  const deleteItems = async (itemId: number) => {
    await ItemsService.deleteItem(itemId);
    props.deleteItem(itemId);
    props.close();
  };

  const main = (
    <Box>
      <Typography
        style={{ marginBottom: "5%", color: "white" }}
        fontWeight={"bold"}
        variant="h5"
      >
        סה"כ: {totalQuantity}
      </Typography>
      <TableContainer
        sx={{ backgroundColor: "rgb(225,136,136)", marginBottom: "5%" }}
        component={Paper}
      >
        <Table sx={{}}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "white" }}>כמות</TableCell>
              <TableCell sx={{ color: "white" }}>סטטוס</TableCell>
              <TableCell sx={{ color: "white" }}>פירוט</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedItems.map((item) => {
              const isAvailable = item.usedBy.id === item.owner.id;

              return (
                <TableRow key={item.id}>
                  <TableCell
                    sx={{
                      color: isAvailable ? "green" : "white",
                      fontWeight: isAvailable ? "bold" : "normal",
                    }}
                  >
                    {item.quantity}
                  </TableCell>
                  <TableCell
                    sx={{
                      color: isAvailable ? "green" : "white",
                      fontWeight: isAvailable ? "bold" : "normal",
                    }}
                  >
                    {isAvailable
                      ? "פנוי"
                      : item.owner.id !== currentUser.team.parent.id
                      ? `מושאל\nמפלוגה ${item.owner.name}`
                      : `בשימוש\nפלוגה ${item.usedBy.name}`}
                  </TableCell>
                  <TableCell
                    sx={{
                      color: isAvailable ? "green" : "white",
                      fontWeight: isAvailable ? "bold" : "normal",
                    }}
                  >
                    {item.description}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ display: "flex", justifyContent: "space-around", mb: "20px" }}>
        <Button
          onClick={() => setToPass((currToPass) => !currToPass)}
          style={{
            backgroundColor: "white",
            height: "9vh",
            width: "9vh",
            borderRadius: "100%",
            marginLeft: 9,
            color: "#C82626B2",
          }}
          variant="contained"
        >
          העבר
        </Button>
        <Button
          onClick={() => returnItems(selectedItem!.id)}
          disabled={!selectedItem}
          style={{
            backgroundColor: "white",
            height: "9vh",
            width: "9vh",
            borderRadius: "100%",
            color: "#C82626B2",
          }}
          variant="contained"
        >
          החזר אלי
        </Button>
        <Button
          onClick={() => deleteItems(sortedItems[0].id)}
          style={{
            backgroundColor: "white",
            height: "9vh",
            width: "9vh",
            borderRadius: "100%",
            marginRight: 9,
            color: "#C82626B2",
          }}
          variant="contained"
        >
          מחק
        </Button>
      </Box>
    </Box>
  );

  const pass = (
    <Box>
      <Typography
        style={{ marginBottom: "-5%", color: "white" }}
        fontWeight={"bold"}
        variant="h5"
      >
        כמות
      </Typography>
      <TextField
        onChange={handleChangeAmount}
        value={amount}
        margin="normal"
        sx={{ backgroundColor: "#FFFFFF", borderRadius: "20px" }}
        InputProps={{ disableUnderline: true }}
        label="כמות"
        variant="filled"
      ></TextField>
      <br></br>
      <Typography
        style={{ marginBottom: "-5%", color: "white" }}
        fontWeight={"bold"}
        variant="h5"
      >
        פירוט
      </Typography>
      <TextField
        onChange={handleChangeDis}
        value={dis}
        multiline
        margin="normal"
        rows={4}
        InputProps={{ disableUnderline: true }}
        sx={{ backgroundColor: "#FFFFFF", borderRadius: "20px" }}
        fullWidth
        label="פירוט"
        variant="filled"
      />
      <Typography
        style={{ marginBottom: "5%", color: "white" }}
        fontWeight={"bold"}
        variant="h5"
      >
        אל
      </Typography>
      <FormControl sx={{ marginBottom: "5%" }} fullWidth>
        <InputLabel id="companyLabel">פלוגה</InputLabel>
        <Select
          sx={{
            borderRadius: "20px",
            backgroundColor: "white",
          }}
          value={selectedCompanyId}
          onChange={(event) =>
            setSelectedCompanyId(parseInt(event.target.value as string))
          }
          labelId={"companyLabel"}
          label={"פלוגה"}
        >
          {companies.map((company) => (
            <MenuItem key={company.id} value={company.id}>
              {company.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Box sx={{ display: "flex", justifyContent: "space-around", mb: "20px" }}>
        <Button
          onClick={() => setToPass((currToPass) => !currToPass)}
          style={{
            backgroundColor: "white",
            height: "9vh",
            width: "9vh",
            borderRadius: "100%",
            marginLeft: 9,
            color: "#C82626B2",
          }}
          variant="contained"
        >
          בטל
        </Button>
        {/* TODO: validations are needed, user can pass more than he has */}
        <Button
          onClick={() =>
            passItems(sortedItems[0].id, selectedCompanyId, amount, dis)
          }
          style={{
            backgroundColor: "white",
            height: "9vh",
            width: "9vh",
            borderRadius: "100%",
            marginRight: 9,
            color: "#C82626B2",
          }}
          variant="contained"
        >
          אשר
        </Button>
      </Box>
    </Box>
  );

  return !toPass ? main : pass;
};
