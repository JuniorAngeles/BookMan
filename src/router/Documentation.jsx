import Header from "../components/HeaderUser";
import {
  Typography,
  Grid,
  Stack,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Box,
  Drawer,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import { useState } from "react";

export default function Documentacion() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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
  return (
    <>
      <Header />

      <Grid container spacing={2} sx={{ mt: { xs: 4, sm: 6, md: 8 } }}>
        <Grid item xs={12}>
          <Typography variant="h5">
            Quieres subir tu libro a esta Web?
          </Typography>
          <Typography
            sx={{
              fontSize: "1.1rem",
            }}
          >
            {" "}
            para subir tu libro a la BookMan, debes de tener las siguiente
            informaciones:
          </Typography>
          <List sx={{ pl: 2 }}>
            <ListItem>
              <ListItemText primary="Titulo de la obra." />
            </ListItem>
            <ListItem>
              <ListItemText primary="Nombre del autor." />
            </ListItem>
            <ListItem>
              <ListItemText primary="Documento pdf del libro." />
            </ListItem>
            <ListItem>
              <ListItemText primary="Imagen de la portada." />
            </ListItem>
            <ListItem>
              <ListItemText primary="Breve descripcion del libro." />
            </ListItem>
          </List>

          <Typography>
            Esta informacion sera enviada a este contacto de telegram
            {"  "} <a href="https://t.me/BookManweb">@BookManweb</a>
          </Typography>
        </Grid>

        <Grid item xs={12} sx={{ mt: 4 }}>
          <Typography variant="h5">
            Aceptación de los términos y condiciones:
          </Typography>
          <List sx={{ pl: 2 }}>
            <ListItem>
              <ListItemText primary="Al acceder y utilizar nuestro sitio web de libros, aceptas los términos y condiciones establecidos en esta sección." />
            </ListItem>
            <ListItem>
              <ListItemText primary="Uso del sitio web: El uso del sitio web de libros está permitido para fines legales y personales. No se permite utilizar el sitio web para actividades ilegales o que infrinjan los derechos de propiedad intelectual." />
            </ListItem>
            <ListItem>
              <ListItemText primary="Derechos de propiedad intelectual: Todo el contenido de nuestro sitio web de libros, incluyendo los libros, imágenes, textos, logotipos y diseños, son propiedad exclusiva de la empresa o de sus respectivos propietarios. No está permitido utilizar, copiar, modificar, distribuir o vender ningún contenido sin nuestro consentimiento previo por escrito." />
            </ListItem>
            <ListItem>
              <ListItemText primary="Compra de libros: El proceso de compra de libros en nuestro sitio web se rige por los términos y condiciones de la plataforma de pago utilizada, así como por nuestras políticas de envío y devolución." />
            </ListItem>
            <ListItem>
              <ListItemText primary="Responsabilidad del usuario: El usuario es responsable de cualquier información que proporcione en nuestro sitio web, incluyendo su registro y su historial de compras. El usuario es responsable de mantener la confidencialidad de su contraseña y de cualquier otra información de acceso a su cuenta." />
            </ListItem>
            <ListItem>
              <ListItemText primary="Limitación de responsabilidad: Nos esforzamos por proporcionar información precisa y actualizada en nuestro sitio web de libros, pero no garantizamos la precisión, integridad o actualización de dicha información. No nos hacemos responsables de ningún daño o pérdida resultante del uso o la imposibilidad de usar nuestro sitio web." />
            </ListItem>
            <ListItem>
              <ListItemText primary="Modificaciones: Nos reservamos el derecho de modificar los términos y condiciones de nuestro sitio web de libros en cualquier momento y sin previo aviso. Cualquier modificación será efectiva a partir del momento en que se publique en nuestro sitio web." />
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </>
  );
}
