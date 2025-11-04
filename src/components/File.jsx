import { useState } from "react";

const File = ({ data, folderData, setFolderData }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [isFile, setIsFile] = useState(null);
  const [newFileFolderName, setNewFileFolderName] = useState("");
  const [isExpanded, setIsExpanded] = useState(true); 

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
    if (!newFileFolderName.trim()) return;

    const updateItems = (list) => {
      return list?.map((a) => {
        if (a.name === name) {
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
        <div
          style={{
            display: "flex",
            alignItems: "center",
            cursor: data?.isFolder ? "pointer" : "default",
            gap: "6px",
          }}
          onClick={() => {
            if (data?.isFolder) setIsExpanded((prev) => !prev);
          }}
        >
          {data?.isFolder && (
            <span>{isExpanded ? "-" : "+"}</span> // open vs closed icon
          )}
          <span>{data?.name}</span>
        </div>

        <div style={{ display: "flex", gap: "5px" }}>
          {data?.isFolder && (
            <>
              <p
                style={{ margin: 0, cursor: "pointer" }}
                onClick={() => {
                  setIsAdding(true);
                  setIsFile(true);
                  setIsExpanded(true);
                }}
              >
                🗃️
              </p>
              <p
                style={{ margin: 0, cursor: "pointer" }}
                onClick={() => {
                  setIsAdding(true);
                  setIsFile(false);
                  setIsExpanded(true);
                }}
              >
                📁
              </p>
            </>
          )}
          <p
            style={{ margin: 0, cursor: "pointer" }}
            onClick={() => deleteFileOrFolder(data?.name)}
          >
            🗑️
          </p>
          <p style={{ margin: 0, cursor: "pointer" }}>🖊️</p>
        </div>
      </div>

      {/* Input for new file/folder */}
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
          style={{ marginLeft: "20px" }}
        />
      )}

      {/* Children (only visible if expanded) */}
      {isExpanded && (
        <div style={{ paddingLeft: "20px" }}>
          {data?.children?.map((ch) => (
            <File
              key={ch.name}
              data={ch}
              folderData={folderData}
              setFolderData={setFolderData}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default File;
