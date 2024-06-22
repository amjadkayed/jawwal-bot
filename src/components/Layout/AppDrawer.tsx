import { Box } from "@mui/material";
import { motion } from "framer-motion";

const items = [
  { name: "newChat", link: "" },
  { name: "support", link: "https://jawwalbot.jawwal.ps/Jawwalwebchat" },
  {
    name: "location",
    link: "https://www.jawwal.ps/en/individuals/support/showrooms-dealers",
  },
];

export default function AppDrawer() {
  return (
    <Box
      sx={{
        backgroundColor: "#6abf4b",
        width: "100%",
        maxWidth: "300px",
        overflowY: "auto",
        borderRadius: "0px 20px 20px 0px",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        paddingY: "20px",
        paddingLeft: "10px",
        gap: "30px",
      }}
    >
      {items.map((item, index) => (
        <motion.div
          key={index}
          initial={{
            borderBottomWidth: 0,
            borderBottomColor: "transparent",
            width: "0%",
          }}
          whileHover={{
            borderBottomWidth: "4px",
            borderBottomColor: "#ffffff",
            width: "100%",
            transition: { duration: 0.3 },
          }}
          style={{
            height: "50px",
            display: "flex",
            gap: "20px",
            borderBottom: "2px solid transparent",
          }}
        >
          <img
            src={`/public/images/${item.name}.png`}
            alt=""
            height={50}
            width={50}
          />
          <Box
            minWidth="200px"
            color="#fff"
            height="100%"
            display="flex"
            justifyContent="start"
            alignItems="center"
            sx={{ cursor: "pointer" }}
            onClick={() => {
              if (item.link) {
                window.open(item.link, "_blank");
              } else {
                localStorage.clear("access_token");
                window.location.reload();
              }
            }}
          >
            {item.name.charAt(0).toUpperCase() +
              item.name
                .slice(1)
                .replace("newChat", "New Chat")
                .replace("location", "Our Locations")}
          </Box>
        </motion.div>
      ))}
    </Box>
  );
}
