import { type RouteConfig, index , route} from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route('/auth', "routes/Auth.tsx"),
    route('/upload', "routes/Upload.tsx"),
    //route('/resume/:id', "app/routes/resume.tsx"),
    //route('/wipe', "app/routes/wipe.tsx"),
] satisfies RouteConfig;
