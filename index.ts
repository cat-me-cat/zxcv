import { ChemicalServer } from "chemicaljs";
import express from "express";
import path from "path";
import { Request, Response } from "express";
import pages from "./src/pages.json";

const [app, listen] = new ChemicalServer();

const __dirname = path.resolve();

const port = process.env.PORT || 3000;

app.use(express.static("build"));

app.serveChemical();

app.use((req: Request, res: Response) => {
	if (pages.includes(req.url)) {
		return res.sendFile(__dirname + "/build/index.html");
	} else {
		return res.status(404).sendFile(__dirname + "/build/index.html");
	}
});

listen(port);