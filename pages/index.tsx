import Information from "@/components/information";
import axios from "axios";
import { MongoClient } from "mongodb";
const HomePage = (props: {
  data: { image: string; title: string; text: string }[];
}) => {
  const dataArray = props.data;
  return (
    <>
      {dataArray.map((item) => (
        <Information itemData={item} />
      ))}
    </>
  );
};
export async function getStaticProps(context: any) {
  const client = await MongoClient.connect(
    "mongodb+srv://mohseniz25:PLsUGaAZOK6qkYsM@cluster0.sbiuujd.mongodb.net/quiz?retryWrites=true&w=majority"
  );
  const db = client.db();
  const collection = await db.collection("post-data").find().toArray();
  return {
    props: {
      data: collection.map((item) => ({
        image: item.image,
        title: item.title,
        text: item.text,
      })),
    },
    revalidate: 1,
  };
}
export default HomePage;
