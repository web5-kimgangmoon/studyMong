import Test from "./Test/Test";
import TestTwoStep from "./Test/TestTwoStep";
import TestThreeStep from "./Test/TestThreeStep";
import TestFourStep from "./Test/TestFourStep";
import TestFiveStep from "./Test/TestFiveStep";
import TestSixStep from "./Test/TestSixStep";
import TestSevenStep from "./Test/TestSevenStep";
import TestEightStep from "./Test/TestEightStep";
import { ChildModel, ParentModel } from "./Test/TestNineStep";

const db = {
  Test,
  TestTwoStep,
  TestThreeStep,
  TestFourStep,
  TestFiveStep,
  TestSixStep,
  TestSevenStep,
  TestEightStep,
  ParentModel,
  ChildModel,
};

export default db;
// 필요없는 파일, 그냥 컬렉션을 모아두는 편이 편하지 않을까해서 만들어봤다.
