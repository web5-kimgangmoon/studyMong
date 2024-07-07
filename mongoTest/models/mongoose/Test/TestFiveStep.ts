import { Model, Schema, model, connect } from "mongoose";

// 해당 model내의 document들에게 함수를 추가하는 방법
interface ITestFiveStep {
  firstId: number;
  secondId: number;
}

interface ITestFiveStepMethods {
  fullId(): number;
}

type TestFiveStepModel = Model<ITestFiveStep, {}, ITestFiveStepMethods>;

const schema = new Schema<
  ITestFiveStep,
  TestFiveStepModel,
  ITestFiveStepMethods
>({
  firstId: { type: Number, required: true },
  secondId: { type: Number, required: true },
});
schema.method("fullId", function () {
  return this.firstId + this.secondId;
});
// 람다식은 사용하지 말자, this 바인딩으로 인해 문제가 생긴다.

const TestFiveStep = model<ITestFiveStep, TestFiveStepModel>(
  "TestFiveStep",
  schema,
  "testFiveSteps"
);

(async () => {
  try {
    connect("mongodb://127.0.0.1:27017/test");
    const doc = new TestFiveStep({ firstId: 1, secondId: 2 });
    await doc.save();
    console.log(doc.fullId());
    console.log("Hello Five step!");
  } catch (err) {
    console.error(err);
  }
})();

export default TestFiveStep;
