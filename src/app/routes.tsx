import { createBrowserRouter } from "react-router-dom";
import { GoodsPage } from "../pages/goods";
import { HomePage } from "../pages/home";
import { AnaloguesPage } from "../pages/analogues";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/search/:number",
    element: <GoodsPage />,
  },
  {
    path: "/:id",
    element: <AnaloguesPage />,
  },
]);
