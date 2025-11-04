import { useState } from "react";

const File = ({ data, folderData, setFolderData }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [isFile, setIsFile] = useState(null);
  const [newFileFolderName, setNewFileFolderName] = useState("");

  const deleteFileOrFolder = (name) => {
    const updateItems = (list) => {
      return list
        ?.filter((a) => a.name !== name)
        ?.map((b) => {
          if (b.children) {
            return {
              ...b,
              children: updateItems(b.children),
            };
          }

          return b;
        });
    };
    setFolderData((prev) => updateItems(prev));
  };

  const handleAddingFileFolder = (name, isFolder) => {
    const updateItems = (list) => {
      return list?.map((a) => {
        if (a.name == name) {
          const newItem = {
            name: newFileFolderName,
            isFolder,
            children: isFolder ? [] : undefined,
          };

          return {
            ...a,
            children: [...(a.children || []), newItem],
          };
        }

        if (a?.children) {
          return {
            ...a,
            children: updateItems(a.children),
          };
        }

        return a;
      });
    };

    setFolderData((prev) => updateItems(prev));
    setIsAdding(false);
    setNewFileFolderName("");
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
              onClick={() => {
                setIsAdding((prev) => !prev);
                setIsFile(true);
              }}
            >
              🗃️
            </p>
            <p
              style={{
                maxWidth: "max-content",
                margin: "0",
                cursor: "pointer",
              }}
              onClick={() => {
                setIsAdding((prev) => !prev);
                setIsFile(false);
              }}
            >
              📁
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
      {isAdding && (
        <input
          onBlur={() => handleAddingFileFolder(data?.name, !isFile)}
          autoFocus
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleAddingFileFolder(data?.name, !isFile);
            }
          }}
          value={newFileFolderName}
          onChange={(e) => setNewFileFolderName(e.target.value)}
        />
      )}

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
