import {createBrowserRouter} from "react-router-dom";
import SectionCard from "../components/SectionCard.tsx";
import App from "../App.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <SectionCard />,
            },
            {
                path: "/:id",
                element: <SectionCard />,
            },
            {
                path: "/:id/:id",
                element: <SectionCard />,
            },
        ],
    },
]);

export default router;
