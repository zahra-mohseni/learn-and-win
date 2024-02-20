import Score from "@/components/score-shower";
import { MongoClient } from "mongodb";
const ScoreList = (props: {
  data: { name: string; score: number; testsNumber: number }[];
}) => {
  console.log(props.data);
  const sortedData = [...props.data];
  sortedData.sort((a, b) => {
    return a.score - b.score;
  });
  sortedData.reverse();
  return <Score data={sortedData} />;
};
export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://mohseniz25:PLsUGaAZOK6qkYsM@cluster0.sbiuujd.mongodb.net/quiz?retryWrites=true&w=majority"
  );
  const db = client.db();
  const collection = db.collection("score-list").find().toArray();
  const scoreData = (await collection).map((item) => ({
    name: item.name,
    score: item.score,
    testsNumber: item.test.length,
  }));

  return { props: { data: scoreData }, revalidate: 1 };
}
export default ScoreList;
