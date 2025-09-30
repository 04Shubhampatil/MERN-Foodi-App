import React from "react";
import { Box, Container, Typography, IconButton, Stack } from "@mui/material";
import { Facebook, Twitter, Instagram, YouTube, Favorite } from "@mui/icons-material";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "white",   // ✅ background white
        color: "grey.700",  // ✅ text gray
        py: 3,
        mt: "auto",
        borderTop: "1px solid",
        borderColor: "grey.200", // subtle top border
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
          }}
        >
          {/* Brand and copyright */}
          <Typography variant="body2" sx={{ color: "grey.600" }}>
            © {year} Foodi. Made with{" "}
            <Favorite sx={{ fontSize: 14, color: "error.main" }} /> for food lovers
          </Typography>

          {/* Social links */}
          <Stack direction="row" spacing={1}>
            <IconButton
              size="small"
              sx={{ color: "grey.600", "&:hover": { color: "grey.900" } }}
            >
              <Facebook fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              sx={{ color: "grey.600", "&:hover": { color: "grey.900" } }}
            >
              <Twitter fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              sx={{ color: "grey.600", "&:hover": { color: "grey.900" } }}
            >
              <Instagram fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              sx={{ color: "grey.600", "&:hover": { color: "grey.900" } }}
            >
              <YouTube fontSize="small" />
            </IconButton>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
