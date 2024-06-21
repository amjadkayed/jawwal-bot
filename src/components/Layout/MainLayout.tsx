import { Box } from "@mui/material";
import AppDrawer from "./AppDrawer";

function MainLayout({ children }: { children: JSX.Element }) {
  return (
    <Box
      style={{ width: "100%", minHeight: "100vh", height: "100px" }}
      flexDirection={"column"}
      display="flex"
    >
      {/* <Navbar /> */}
      <Box
        flexDirection={"row"}
        display="flex"
        minHeight="100%"
        overflow={"hidden"}
      >
        <AppDrawer />
        <main style={{ height: "100%", width: "100%" }}>{children}</main>
      </Box>
    </Box>
  );
}

export default MainLayout;
