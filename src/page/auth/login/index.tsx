import { forwardRef, FC } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { HeaderWrapper, LineWrapper, LoginSwapper } from "./styled";

interface iRecipeProps {}

function Copyright(props: any) {
  return (
    <Typography
      sx={{ flexGrow: 1 }}
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const Login: FC<iRecipeProps> = forwardRef(({}, ref): JSX.Element => {
  return (
    <LoginSwapper>
      <Grid
        container
        sx={{
          height: "100vh",
          position: "relative",
        }}
      >
        <Grid item xs={8} className="bannerContainer">
          <Box className="bannerImage"></Box>
          <Box className="bannerBg"></Box>
        </Grid>
        <Grid item xs={4} className="loginFormContainer">
          {/* Header swapper */}
          <HeaderWrapper>
            <img
              src="/assets/images/logo.png"
              width="100"
            />
          </HeaderWrapper>
          <Box sx={{ flexGrow: 4 }}>
            <Typography sx={{ fontWeight: "bold", fontSize: "25px" }}>
              Đăng Nhập
            </Typography>
            <Typography sx={{ mt: 2 }}>
              Vui lòng đăng nhập tài khoản để bắt đầu làm việc với hệ sinh thái
              toàn diện của Amplify
            </Typography>
            <Box
              component="form"
              //   onSubmit={submitLogin}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Đăng Nhập
              </Button>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <LineWrapper />
                <Box
                  sx={{
                    padding: "0 3px",
                  }}
                >
                  Hoặc
                </Box>
                <LineWrapper />
              </Box>
              <Box className="googleButton">
                <img src="/assets/icon/google.png" alt="" width="16px" />
              </Box>
            </Box>
          </Box>
          <Copyright />
        </Grid>
      </Grid>
    </LoginSwapper>
  );
});

export default Login;
