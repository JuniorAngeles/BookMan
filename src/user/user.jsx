import Header from "../components/HeaderUser";
import { Link } from "react-router-dom";
import {
  Grid,
  Box,
  Stack,
  Button,
  Typography,
  Avatar,
  IconButton,
} from "@mui/material";
import swal from "sweetalert";
import Libres from "../router/Libres";

export default function User() {
  const displayName = localStorage.getItem("displayName");
  swal(
    `Bienvenido ${displayName}`,
    "...Mira la variedad de libros que tenemos para ti"
  );
  return (
    <>
      <Header />
      <Grid marginTop={5}>
        <Libres />
      </Grid>
    </>
  );
}
