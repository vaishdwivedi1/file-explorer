const File = ({ data }) => {
  return (
    <div>
      <div> {data?.name} </div>

      <div style={{ paddingLeft: "20px" }}>
        {" "}
        {data?.children?.map((ch) => (
          <File data={ch} />
        ))}{" "}
      </div>
    </div>
  );
};

export default File;
