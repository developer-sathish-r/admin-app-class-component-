import { lazy } from "react";

export const PrivateRoutes = [
    {
        name: "Dashboard",
        path: "/dashboard",
        component: lazy(() => import("./sider/dashboard"))
    },
    {
        name: "Add_User",
        path: "/adduser",
        component: lazy(() => import("./sider/addUser"))
    },
    {
        name: "Edit_User",
        path: "/edit/:id",
        component: lazy(() => import("./sider/addUser"))
    },
]