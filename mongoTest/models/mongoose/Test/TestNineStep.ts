import {
  Schema,
  model,
  Document,
  Types,
  connect,
  mongo,
  PopulatedDoc,
  ObjectId,
} from "mongoose";

// 마지막 Test입니다. 나머지는 천천히 찾아도 될 것 같아서 그만뒀습니다.(지치기도 했고요...)
// 이외에도 필요한 정보는 공식문서에서 https://mongoosejs.com/docs/index.html
// 주의,mongoose는 childs를 children으로 이름을 바꿔준다.

// 이 세가지 방법 중 공식문서는 첫번째 방법을 추천하고 있다.
// 마지막 방법은 타입스크립트에서 추가 검사가 필요하며, 또한 mongoose가 타입유추(or)가
// 어려워지기 때문에.
// #####
interface Parent {
  child?: Types.ObjectId;
  name?: string;
}
const ParentModel = model<Parent>(
  "Parent",
  new Schema({
    child: { type: Schema.Types.ObjectId, ref: "Child" },
    name: String,
  })
);

interface Child {
  name: string;
}
const childSchema: Schema = new Schema({ name: String });
const ChildModel = model<Child>("Child", childSchema);
// ######
// interface Parent {
//   child?: Types.ObjectId;
//   name?: string;
// }
// interface Child {
//   name: string;
// }
// interface PopulatedParent {
//   child: Child | null;
// }

// const ParentModel = model<Parent>(
//   "Parent",
//   new Schema({
//     child: { type: Schema.Types.ObjectId, ref: "Child" },
//     name: String,
//   })
// );
// const childSchema: Schema = new Schema({ name: String });
// const ChildModel = model<Child>("Child", childSchema);
// #####
// interface Parent {
//   child?: PopulatedDoc<Document<ObjectId> & Child>;
//   name?: string;
// }
// const ParentModel = model<Parent>(
//   "Parent",
//   new Schema({ child: { type: "ObjectId", ref: "Child" }, name: String })
// );

// interface Child {
//   name?: string;
// }
// const childSchema: Schema = new Schema({ name: String });
// const ChildModel = model<Child>("Child", childSchema);
// #####
(async () => {
  try {
    await connect("mongodb://127.0.0.1:27017/test");
    const child = new ChildModel({ name: "끝" });
    const parent = new ParentModel({ name: "시작", child: child._id });
    await child.save();
    await parent.save();
    // console.log(child);
    // console.log(parent);
    console.log("Hello Nine step!");
  } catch (err) {
    console.error(err);
  }
})();

ParentModel.findOne();
ParentModel.findOne({})
  .populate<{ child: Child }>("child")
  //   .populate<Pick<PopulatedParent, "child">>("child")
  .orFail()
  .then((doc) => {
    const t: string | undefined = doc.child?.name;
    console.log(t);
  });

export { ParentModel, ChildModel };
