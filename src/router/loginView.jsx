import { loginWithGoogle } from "../services/firebase";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button, Stack, Grid, Typography, Paper } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import BookIcon from "@mui/icons-material/Book";
import { useSpring, animated } from "@react-spring/web";

export default function Login() {
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  // Animation In stack for login
  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 1000 },
  });
  // login with google
  const handleGoogleLogin = () => {
    loginWithGoogle()
      .then((user) => {
        const { uid, displayName, photoURL, email } = user;
        setUser({ uid, displayName, photoURL, email });
        localStorage.setItem("uid", uid); // Guardar el uid en el localStorage
        localStorage.setItem("email", email);
        localStorage.setItem("photoURL", photoURL);
        localStorage.setItem("displayName", displayName);
        if (email === "yuniorangeles06@gmail.com") {
          navigate("/Libres/Admin"); // Si el uid está en el localStorage, redirigir al usuario a la ruta "/Students"
        } else {
          navigate("/Libres/User");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const uid = localStorage.getItem("uid");
    const email = localStorage.getItem("email");
    if (uid && email === "yuniorangeles06@gmail.com") {
      navigate("/Libres/Admin");
    }

    if (uid && email !== "yuniorangeles06@gmail.com") {
      navigate("/Libres/User");
    }
  });

  return (
    <>
      <Grid
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "3rem",
        }}
      >
        <animated.div style={fadeIn}>
          <Stack>
            <Stack>
              <Paper
                elevation={20}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "350px",
                  width: "500px",
                }}
              >
                <BookIcon
                  sx={{
                    fontSize: "100px",
                    marginBottom: "2rem",
                    marginTop: "2rem",
                  }}
                />{" "}
                <Typography
                  sx={{
                    fontSize: "40px",
                  }}
                >
                  Sing In
                </Typography>
                <Button
                  onClick={handleGoogleLogin}
                  startIcon={<GoogleIcon />}
                  variant="contained"
                  disableElevation
                  color="secondary"
                  sx={{
                    backgroundColor: "#ff0000",
                    fontWeight: "bold",
                    height: "60px",
                    width: "300px",
                    margin: 2,
                    transition: "all 0.5s ease",
                    borderRadius: "10px",
                  }}
                >
                  Login with Google
                </Button>
                <Typography
                  sx={{
                    fontSize: "10px",
                  }}
                >
                  Add Google Sign In Button to WebSite
                </Typography>
              </Paper>
            </Stack>
          </Stack>
        </animated.div>
      </Grid>
    </>
  );
}
