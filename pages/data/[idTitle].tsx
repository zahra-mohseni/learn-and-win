import styled from "styled-components";
import { MongoClient } from "mongodb";
import { useRouter } from "next/router";
import Head from "next/head";
const Div = styled.div`
background-color: #e3bebe;
margin-top: 127px;
display : flex;
flex-direction : column ; 
align-items : center;
border-radius : 3%;
margin-bottom : 50px

}
`;
const StyledBtn = styled.button`
  padding: 5px;
  box-shadow: black 0px 0px 6px;
  border-radius: 11%;
  margin: 9px;
  background-color: #e5a0a0;
`;
const InformationPage = (props: any) => {
  const router = useRouter();
  const params = router.query.idTitle;
  const clickHandler: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    router.push(`/quiz/${params}`);
  };
  return (
    <>
      <Head>
        <title>{props.data.title}</title>
        <meta name="description" content="learn now" />
      </Head>
      <div className="row d-flex flex-column align-items-center ">
        {" "}
        <Div className="col-lg-8 col-md-10 col-sm-10 col-11">
          <img
            style={{ margin: 20, borderRadius: 3 }}
            className="col-8 col-md-7 col-lg-6"
            src={props.data.image}
          />{" "}
          <h3>{props.data.title}</h3>
          <p> {props.data.text}</p>
          <StyledBtn onClick={clickHandler}>start quiz</StyledBtn>
        </Div>
      </div>
    </>
  );
};
export async function getStaticProps(context: any) {
  const client = await MongoClient.connect(
    "mongodb+srv://mohseniz25:PLsUGaAZOK6qkYsM@cluster0.sbiuujd.mongodb.net/quiz?retryWrites=true&w=majority"
  );
  const params = context.params.idTitle;
  const db = client.db();
  const collection = await db
    .collection("post-data")
    .findOne({ title: params });

  return {
    props: {
      data: {
        title: collection!.title,
        image: collection!.image,
        text: collection!.text,
      },
    },
    revalidate: 10,
  };
}
export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://mohseniz25:PLsUGaAZOK6qkYsM@cluster0.sbiuujd.mongodb.net/quiz?retryWrites=true&w=majority"
  );
  const db = client.db();
  const collection = await db.collection("post-data").find().toArray();
  const paramsIds = collection.map((item) => ({
    params: { idTitle: item.title },
  }));
  return { fallback: false, paths: paramsIds };
}
export default InformationPage;
