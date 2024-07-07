import { Schema, model, connect, Types, Model, Number } from "mongoose";

// 이 방식은 static 함수를 추가하는 방법이다.
// static 함수를 추가하는데는 제네릭 매개변수가 없기 때문에 다른 방법을 써야한다.

// 옵션으로 static이나 instance 메서드를 추가시킬 수 있다.
// interface ITestSixStep {
//   idArr: Array<number>;
// }
// interface ITestSixStepModel extends Model<ITestSixStep> {
//   myStaticMethod(): number;
//
// const schema = new Schema<ITestSixStep, ITestSixStepModel>({
//   idArr: [Number],
// });
// schema.static("myStaticMethod", function () {
//   return 33;
// });
// const TestSixStep = model<ITestSixStep, ITestSixStepModel>(
//   "TestSixStep",
//   schema,
//   "testSixSteps"
// );

const schema = new Schema(
  { idArr: [Number] },
  {
    statics: {
      myStaticMethod() {
        return 33;
      },
    },
  }
);

const TestSixStep = model("TestSixStep", schema, "testSixSteps");

(async () => {
  try {
    await connect("mongodb://127.0.0.1:27017/test");
    const doc = new TestSixStep({ idArr: [12, 32, 43, 55, 65] });
    await doc.save();
    console.log(TestSixStep.myStaticMethod());
    console.log(doc.idArr);
    console.log("Hello Six step!");
  } catch (err) {
    console.error(err);
  }
})();

export default TestSixStep;
