const QuestionShow = (props: any) => {
  const deleteHandler = (e: React.MouseEvent, id: string) => {
    props.onDelete({ order: true, id });
  };
  return (
    <div
      className="col-12 "
      style={{
        padding: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: 10,
        margin: 20,
        backgroundColor: "#c7b7b7",
      }}
    >
      <h5>
        {props.index + 1}) question : {props.data.question}
      </h5>
      <div className=" row col-10 d-flex flex-row justify-content-space-between">
        <p className="col-sm-6 "> 1) {props.data.options[0]}</p>

        <p className="col-sm-6 ">2) {props.data.options[1]}</p>
      </div>
      <div className=" row col-10 d-flex flex-row justify-content-space-between">
        <p className="col-sm-6 ">3) {props.data.options[2]}</p>
        <p className="col-sm-6 ">4) {props.data.options[3]}</p>
      </div>

      <p>answer : {props.data.answer}</p>
      <button
        style={{ margin: 4 }}
        onClick={(e) => {
          deleteHandler(e, props.data.id);
        }}
      >
        delete question
      </button>
    </div>
  );
};
export default QuestionShow;
