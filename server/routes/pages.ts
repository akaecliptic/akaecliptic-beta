import express, { Router } from "express";
import { sendPageOptions } from "../config/config";

const router: Router = express.Router();

router.get('/', (req, res) => {
    res.sendFile('index.html', sendPageOptions);
});

export { router as pagesRouter };
