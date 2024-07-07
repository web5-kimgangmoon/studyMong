import {
  model,
  Schema,
  connect,
  Types,
  HydratedDocument,
  Model,
} from "mongoose";

// static과 instance 메서드를 동시에 추가하는 방법
// 이 경우, instance 메서드를 타입 지정할 때, 인터페이스를 선언해야 하기 때문에
// 옵션을 지정하는 방법은 불가능하다.
interface ITestSevenStep {
  firstId: number;
  secondId: number;
}

interface ITestSevenStepMethods {
  fullId(): number;
}

interface TestSevenStepModel
  extends Model<ITestSevenStep, {}, ITestSevenStepMethods> {
  recreateWithFullId(
    id: number
  ): Promise<HydratedDocument<ITestSevenStep, ITestSevenStepMethods>>;
  // HydratedDocument는 new 키워드를 이용해 생성한 document를 메서드를 빼고, 일반적인
  // 객체로 바꾸었을 때(toObject())의 타입이다.
  // Promise를 넣은 것은 async 함수라는 의미다.
}

const schema = new Schema<
  ITestSevenStep,
  TestSevenStepModel,
  ITestSevenStepMethods
>({
  firstId: { type: Number, required: true },
  secondId: { type: Number, required: true },
});
schema.static("recreateWithFullId", function (id: number) {
  const [firstId, secondId] = [id * 2, id * 3];
  return this.create({ firstId, secondId });
});
schema.method("fullId", function (): number {
  return this.firstId + this.secondId;
});

const TestSevenStep = model<ITestSevenStep, TestSevenStepModel>(
  "TestSevenStep",
  schema,
  "testSevenStep"
);

// // 테스트 해본 결과, 아래의 방법으로는 static이나 instance 함수 둘 중 하나는 인식하지만,
// // 나머지 하나는 인식하지 못했다. 같이 쓸때는 interface를 이용하자.
// const schema = new Schema(
//   {
//     firstId: { type: Number, required: true },
//     secondId: { type: Number, required: true },
//   },
//   {
//     methods: {
//       fullId: function () {
//         return this.firstId + this.secondId;
//       },
//     },
//     statics: {
//       recreateWithFullId: function (id: number) {
//         const [firstId, secondId] = [id * 2, id * 3];
//         return this.create({ firstId, secondId });
//       },
//     },
//   }
// );
// const TestSevenStep = model("TestSevenStep", schema, "testSevenStep");

connect("mongodb://127.0.0.1:27017/test")
  .then(() => TestSevenStep.recreateWithFullId(43))
  .then((doc) => {
    console.log("static method 실행중");
    console.log(doc.fullId());
    console.log("Hello Seven step!");
    return doc.save();
  })
  .catch((err) => console.error(err));

export default TestSevenStep;
