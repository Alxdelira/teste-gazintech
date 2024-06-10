import desenvolvedores from "./desenvolvedoresRoutes.js";
import nivel from "./nivelRoutes.js";

const routes = (app) => {
    app.get('/', (req, res) => {
        res.status(200).redirect("/docs");
    });

    app.use(
        desenvolvedores,
        nivel
    )

};
export default routes;