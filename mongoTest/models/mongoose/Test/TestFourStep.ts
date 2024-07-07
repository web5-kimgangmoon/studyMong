import {
  Schema,
  model,
  connect,
  Types,
  mongo,
  InferRawDocType,
} from "mongoose";

const schemaDefination = {
  id: { type: String, require: true },
  uniqueKey: { type: Types.ObjectId, required: true },
  connect: String,
} as const;

// 일반적인 경우에는 배열이나 객체를 정해진 매개변수가 있는 함수에 쓰지 못한다.
// 왜냐하면 배열이나 객체에 const 타입을 선언해도, 그 내부값들은 변할 수 있기 때문이다.
// 그러나 as const를 쓰면 내부값이 변하지 않는다고 컴파일러에게 알려줄 수 있다.(readonly)
// 아마도 이런 점 때문에 임시변수를 쓰지 말라고 적어놓은 듯싶다.

const schema = new Schema(schemaDefination);
const TestFourStep = model("TestFourStep", schema, "testFourSteps");

type RawTestFourStepDoument = InferRawDocType<typeof schemaDefination>;

function useRawDoc(doc: RawTestFourStepDoument) {
  console.log(doc.id);
  console.log(doc.uniqueKey);
  console.log(doc.connect);
  console.log("Hello Four step!");
}
console.log("실행중");
(async () => {
  try {
    await connect("mongodb://127.0.0.1:27017/test");
    const doc = new TestFourStep({
      id: "repeatTest",
      uniqueKey: new mongo.ObjectId(),
    });
    // doc.connect = "mongodb://127.0.0.1:27017/test"; 설정해줘도 소용없다. connect 함수를 실행시켜줘야 한다.
    await doc.save();
    console.log(doc.toObject());
    useRawDoc(doc.toObject());
  } catch (err) {
    console.error(err);
  }
})();

// 이외에도 추가적인 내용들이 있다. 자세한 내용은 https://mongoosejs.com/docs/typescript/schemas.html

export default TestFourStep;
