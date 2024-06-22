import { Route, Routes } from "react-router-dom";
import { ChatLayout } from "../components/Layout/ChatLayout";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ChatLayout />} />
    </Routes>
  );
};

export default AppRoutes;
