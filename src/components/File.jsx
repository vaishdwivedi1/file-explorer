const File = ({ data, folderData, setFolderData }) => {

  
  const deleteFileOrFolder = (name) => {
    const updateItems = (list)=>{
     return  list?.filter((a)=>a.name !== name)?.map((b)=>{
        if(b.children){
            return {
                ...b,
                children:updateItems( b.children)
            }
        }

        return b;
       })
    }
    setFolderData((prev)=> updateItems(prev))
  };
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {data?.name}
        {data?.isFolder && (
          <>
            <p
              style={{
                maxWidth: "max-content",
                margin: "0",
                cursor: "pointer",
              }}
            >
             
              ➕
            </p>
          </>
        )}
        <>
          <p
            style={{
              maxWidth: "max-content",
              margin: "0",
              cursor: "pointer",
            }}
            onClick={() => deleteFileOrFolder(data?.name)}
          >
            {" "}
            🗑️
          </p>
          <p
            style={{
              maxWidth: "max-content",
              margin: "0",
              cursor: "pointer",
            }}
          >
            {" "}
            🖊️
          </p>
        </>
      </div>

      <div style={{ paddingLeft: "20px" }}>
        {data?.children?.map((ch) => (
          <File
            data={ch}
            folderData={folderData}
            setFolderData={setFolderData}
          />
        ))}
      </div>
    </div>
  );
};

export default File;
