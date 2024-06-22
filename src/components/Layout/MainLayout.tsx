import { Box } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import AppDrawer from "./AppDrawer";
import Navbar from "./Navbar";
import { useAppContext } from "../../context/AppContext";
import useWindowSize from "../../hooks/useWindowWidth";

const navbarHeight = "70px";

function MainLayout({ children }: { children: JSX.Element }) {
  const { isDrawerOpen } = useAppContext();
  const width = useWindowSize();
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: `calc(100vh - ${navbarHeight})`,
        maxHeight: `calc(100vh - ${navbarHeight})`,
        height: "100px",
      }}
      display="flex"
      flexDirection="column"
    >
      <Navbar />
      <Box
        display="flex"
        flexDirection="row"
        minHeight="100%"
        height="100%"
        overflow="hidden"
      >
        {width > 700 && (
          <AnimatePresence mode="wait">
            <motion.div
              key="drawer"
              initial={{ width: 80 }}
              animate={{ width: isDrawerOpen ? 250 : 80 }}
              exit={{ width: 80 }}
              whileHover={{ width: 250 }}
              style={{
                display: "flex",
                transform: "translateZ(0)",
                marginTop: "auto",
                marginBottom: "auto",
              }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 25,
              }}
            >
              <AppDrawer />
            </motion.div>
          </AnimatePresence>
        )}

        <main
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {children}
        </main>
      </Box>
    </Box>
  );
}

export default MainLayout;
