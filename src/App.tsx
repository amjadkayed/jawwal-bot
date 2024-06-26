import { BrowserRouter } from "react-router-dom";
import MainLayout from "./components/Layout/MainLayout";
import AppRoutes from "./routes";
import { useOverlayScrollbars } from "overlayscrollbars-react";
import { useEffect } from "react";
import "overlayscrollbars/overlayscrollbars.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { AppProvider } from "./context/AppContext";
import AuthWrapper from "./components/AuthWrapper";

function App() {
  const [initBodyOverlayScrollbars] = useOverlayScrollbars({
    defer: true,
    options: {
      scrollbars: {
        autoHide: "scroll",
        autoHideDelay: 500,
        visibility: "auto",
        theme: "os-theme-light",
      },
    },
  });

  useEffect(() => {
    initBodyOverlayScrollbars(document.body);
  }, [initBodyOverlayScrollbars]);

  return (
    <AppProvider>
      <AuthWrapper>
        <BrowserRouter>
          <DndProvider backend={HTML5Backend}>
            <MainLayout>
              <AppRoutes />
            </MainLayout>
          </DndProvider>
        </BrowserRouter>
      </AuthWrapper>
    </AppProvider>
  );
}

export default App;
