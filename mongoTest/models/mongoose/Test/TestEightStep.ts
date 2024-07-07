import {
  HydratedDocument,
  Model,
  QueryWithHelpers,
  Schema,
  model,
  connect,
} from "mongoose";

// queryHelper에 대해 (아마도 커스텀 쿼리인듯 싶다)

// 옵션이 있기 때문에 옵션에 적어주자.
// 참고로 옵션은 있지만, 여러 옵션을 쓸 수 없고 하나만 가능하다.
// 그러니까 주석처리한 방법을 그대로 남겨놓은 듯싶다.
// interface ITestEightStep {
//   id: number;
//   hey?: string;
// }

// interface TestEightStepQueryHelpers {
//   byId(
//     id: number
//   ): QueryWithHelpers<
//     HydratedDocument<ITestEightStep>[],
//     HydratedDocument<ITestEightStep>,
//     TestEightStepQueryHelpers
//   >;
// }

// type TestEightStepModel = Model<ITestEightStep, TestEightStepQueryHelpers>;

// const schema = new Schema<
//   ITestEightStep,
//   TestEightStepModel, // Model<ITestEightStep, TestEightStepQueryHelpers>,
//   {},
//   TestEightStepQueryHelpers
// >({
//   id: { type: Number, required: true },
//   hey: String,
// });

// schema.query.byId = function (
//   this: QueryWithHelpers<
//     any,
//     HydratedDocument<ITestEightStep>,
//     TestEightStepQueryHelpers
//   >,
//   id: number
// ) {
//   return this.find({ id: id });
// };

// const TestEightStep = model<ITestEightStep, TestEightStepModel>(
//   "TestEightStep",
//   schema,
//   "testEightSteps"
// );

const schema = new Schema(
  {
    id: { type: Number, required: true },
    hey: String,
  },
  {
    query: {
      byId: function (id: number) {
        return this.find({ id });
      },
    },
  }
);

const TestEightStep = model("TestEightStep", schema, "testEightStep");

(async () => {
  try {
    await connect("mongodb://127.0.0.1:27017/test");
    const doc = new TestEightStep({ id: 51, hey: "I'm fine, thank you" });
    await doc.save();
    console.log(
      await TestEightStep.find()
        .where("hey")
        .equals("I'm fine, thank you")
        .byId(51)
    );
    console.log("Hello Eight step!");
  } catch (err) {
    console.error(err);
  }
})();

export default TestEightStep;
