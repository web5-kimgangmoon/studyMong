import { Request, Response } from "express";
import db from "../../models/mongoose/db";

interface IData {
  id: string;
  testKim: string;
  testPark: string;
  testBang: string;
}

const test = (req: Request, res: Response) => {
  db.Test.findOne()
    // .lean()
    .then((data) => res.send(data))
    .catch((err) => console.error(err));
};

export default test;
