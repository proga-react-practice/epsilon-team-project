import React, { ReactNode } from "react";
import { Box, AppBar, Toolbar, Typography } from "@mui/material";

interface DefaultLayoutProps {
  children: ReactNode;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap>
            FreelanceBase
          </Typography>
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "64px" }}>
        {children}
      </Box>
    </Box>
  );
};

export default DefaultLayout;
