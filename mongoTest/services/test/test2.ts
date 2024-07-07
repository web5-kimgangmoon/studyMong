import { Request, Response } from "express";
import db from "../../models/mongoose/db";

const test2 = (req: Request, res: Response) => {
  db.TestTwoStep.find()
    .then((data) => res.send(data))
    .catch((err) => console.error(err));
};

export default test2;
