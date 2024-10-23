import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        padding: "20px 0",
        height: "50px",
        width: "100%",
        background: "linear-gradient(to right, #e1b6e3, white)",
        textAlign: "center",
        boxShadow: "0 -1px 5px rgba(0, 0, 0, 0.1)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: '"Roboto", "Helvetica", "Arial", "sans-serif"',
        color: "rgb(142, 33, 166)",
      }}
    >
      <Typography
        component="p"
        sx={{
          margin: 0,
          fontSize: "1.2em",
        }}
      >
        Developed By Rupali Bansal
      </Typography>
    </Box>
  );
};

export default Footer;
