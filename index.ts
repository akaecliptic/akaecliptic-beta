import { app } from "./server/app";

const PORT: string = process.env.port || '7000';

app.listen( PORT, () => { console.log( `Up and running on port: ${ PORT }` ) });
