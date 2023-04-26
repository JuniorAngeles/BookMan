import { useState, useEffect } from "react";
import "../services/firebase.js";
import { traerDatos } from "../services/firebase.js";
import { BookItem } from "../components/BookItem";
import { Link } from "react-router-dom";
import { Button, Typography } from "@mui/material";

function Libres() {
  const [libros, setLibros] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    traerDatos().then((datos) => {
      setLibros(datos);
      setLoading(false);
    });
  }, []);

  if (libros.length === 0) {
    <Link to="/Libres/createBook">
      <Button variant="contained"> Agregar libro a la base de datos</Button>;
    </Link>;
  }

  return (
    <>
      {loading ? (
        <Typography
          variant="h3"
          sx={{
            justifyContent: "center",
            display: "flex",
            alignItems: "center",
          }}
        >
          Cargando...
        </Typography>
      ) : (
        <div className="padre">
          {libros.map((book) => {
            return <BookItem key={book.id} book={book} />;
          })}
          {/* <img src={urlImg} /> */}
        </div>
      )}
    </>
  );
}

export default Libres;
