import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("/day/:dayNumber", "routes/day.tsx")
] satisfies RouteConfig;
