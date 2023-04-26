import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  styled,
  alpha,
  Avatar,
  Drawer,
  List,
  ListItem,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import BungalowIcon from "@mui/icons-material/Bungalow";
import { useState, useEffect } from "react";
import { logout } from "../services/firebase";
import { useNavigate, useLocation } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { useMediaQuery } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { traerDatos } from "../services/firebase";
import { Busqueda } from "./Buscador";
import Libres from "../router/Libres";
import BookIcon from "@mui/icons-material/Book";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function Header({ isAuthenticated }) {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");
  const [filterData, setFilterData] = useState(users);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const locationPath = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    traerDatos().then(setUsers);
  }, []);

  useEffect(() => {
    if (query.trim() === "") {
      setFilterData([]);
      return;
    }
    const result = Busqueda(users, query);
    setFilterData(Array.from(new Set(result)));
  }, [query, users]);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setIsDrawerOpen(open);
  };

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  // Function para cerrar cesion
  const isMobile = useMediaQuery("(max-width:800px)");
  // console.log(query);

  // Cerrar cesion
  const handleLogout = () => {
    logout()
      .then(() => {
        localStorage.removeItem("uid");
        localStorage.removeItem("email");
      })
      .catch((error) => {
        console.log(error);
      })
      .then(() => navigate("/"));
  };

  const handleNavigateRegister = () => {
    navigate("/Libres/createBook");
  };
  const handleNavigateStudent = () => {
    navigate("/Libres");
  };
  // Si el usuario no está autenticado y la ruta actual es la página de inicio de sesión, no mostramos el encabezado
  if (
    (!isAuthenticated && locationPath.pathname === "/Libres/login") ||
    locationPath.pathname === "/Libres/User" ||
    locationPath.pathname === "/Libres/Documentation"
  ) {
    return null;
  }
  const photoURL = localStorage.getItem("photoURL");

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        {isMobile ? (
          <AppBar position="fixed">
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
              <IconButton
                color="inherit"
                aria-label="menu"
                onClick={handleDrawerToggle}
              >
                <MenuIcon />
              </IconButton>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>

                <StyledInputBase
                  placeholder="Buscar Libro"
                  inputProps={{ "aria-label": "search" }}
                  onChange={(event) => setQuery(event.target.value)}
                />
              </Search>
              {isMobile ? (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    ml: "auto",
                    marginLeft: 2,
                  }}
                >
                  <Avatar alt="Remy Sharp" src={photoURL} />
                </Box>
              ) : null}
            </Toolbar>
          </AppBar>
        ) : (
          <AppBar position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                sx={{ mr: 2 }}
              ></IconButton>

              <BookIcon
                sx={{
                  fontSize: 40,
                }}
              />
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
              >
                BookMan
              </Typography>

              <AddIcon
                onClick={handleNavigateRegister}
                sx={{
                  marginRight: 3,
                }}
              />

              <BungalowIcon
                onClick={handleNavigateStudent}
                sx={{
                  marginRight: 3,
                }}
              />

              <LogoutIcon
                onClick={handleLogout}
                sx={{
                  marginRight: 3,
                }}
              />

              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>

                <StyledInputBase
                  placeholder="Buscar Libro"
                  inputProps={{ "aria-label": "search" }}
                  onChange={(event) => setQuery(event.target.value)}
                />
              </Search>
              <Avatar
                alt="cemas"
                src={photoURL}
                sx={{
                  width: "40px",
                  height: "40px",
                  marginLeft: 2,
                }}
              />
            </Toolbar>
          </AppBar>
        )}
      </Box>
      <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer(false)}>
        <List>
          <ListItem>
            <IconButton>
              <LogoutIcon onClick={handleLogout} />
              <Typography>Logout</Typography>
            </IconButton>
          </ListItem>
          <ListItem>
            <IconButton>
              <AddIcon onClick={handleNavigateRegister} />

              <Typography>Agregar</Typography>
            </IconButton>
          </ListItem>

          <ListItem>
            <IconButton>
              <BungalowIcon onClick={handleNavigateStudent} />
              <Typography>Inicio</Typography>
            </IconButton>
          </ListItem>
        </List>
      </Drawer>

      <Box mt={5}>
        {filterData.map((book) => (
          <Libres key={book.id} libres={book} />
        ))}
      </Box>
    </>
  );
}
