import app from "./app";

function requestHandler()
{
    const port: number = app.get("port");
    console.log(`App is running at http://localhost:${port}`);
    console.log("Press CTRL-C to stop\n");
}

const server = app.listen(app.get("port"), requestHandler)

export default server;