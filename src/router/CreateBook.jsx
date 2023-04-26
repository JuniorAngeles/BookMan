import { uploaFiles, saveArchivos } from "../services/firebase.js";
import { useState, useEffect } from "react";
import "../services/firebase.js";
// import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../styles/form.css";

export function CreateBook() {
  const [file, setfile] = useState(null);
  const [urlImg, seturlImg] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    const formData = new FormData(e.target);

    e.preventDefault();

    try {
      const result = await uploaFiles(file);
      seturlImg(result);

      const nombre = formData.get("nombre");
      const descriccion = formData.get("descriccion");
      const url = formData.get("url");
      const img = result;
      const creadoPor = formData.get("autor");
      // encarga de guardar los datos

      // guardar datos en firestore
      //   console.log(nombre);
      //   console.log(descriccion);
      //   console.log(url);
      //   console.log(img);

      const newObj = {
        nombre,
        descriccion,
        url,
        img,
        creadoPor,
      };

      // setNewBook(newObj);
      // setNewBook(newObj);
      await saveArchivos(newObj).then(navigate("/Libres"));

      // funcion para almacenar datos en firesetore(newBook)
      // console.log(newObj);
      // limpiar formulario
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <section className="contenedor">
        <form id="formulario" onSubmit={handleSubmit}>
          <label className="nombre">Inserta el titulo</label>
          <input type="text" name="nombre" id="nombre" required />

          <label className="descriccion">Inserta la descriccion</label>
          <input type="text" name="descriccion" id="descriccion" required />
          <label className="autor">Creado Por:</label>
          <input type="text" name="autor" id="autor" required />

          <label className="url">
            Ingresa la url de la ubicacion del libro{" "}
          </label>
          <input type="text" name="url" id="url" required />

          <input
            type="file"
            name=""
            id="file"
            required
            onChange={(e) => setfile(e.target.files[0])}
          />

          <button type="submit"> Subir </button>
        </form>
      </section>
    </>
  );
}
