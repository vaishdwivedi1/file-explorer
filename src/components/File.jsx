import { useState } from "react";

const File = ({ data, folderData, setFolderData }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [isFile, setIsFile] = useState(null);
  const [newFileFolderName, setNewFileFolderName] = useState("");
  const [isExpanded, setIsExpanded] = useState(true);
  const [isRenaming, setIsRenaming] = useState(false);
  const [renameValue, setRenameValue] = useState(data.name);

  //  Delete file or folder recursively
  const deleteFileOrFolder = (name) => {
    const updateItems = (list) => {
      return list
        ?.filter((a) => a.name !== name)
        ?.map((b) => {
          if (b.children) {
            return { ...b, children: updateItems(b.children) };
          }
          return b;
        });
    };
    setFolderData((prev) => updateItems(prev));
  };

  //  Add file or folder
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
          return { ...a, children: [...(a.children || []), newItem] };
        }

        if (a?.children) {
          return { ...a, children: updateItems(a.children) };
        }
        return a;
      });
    };

    setFolderData((prev) => updateItems(prev));
    setIsAdding(false);
    setNewFileFolderName("");
  };

  // Rename file or folder
  const handleRename = (oldName, newName) => {
    if (!newName.trim()) return;

    const updateItems = (list) => {
      return list?.map((a) => {
        if (a.name === oldName) {
          return { ...a, name: newName };
        }
        if (a.children) {
          return { ...a, children: updateItems(a.children) };
        }
        return a;
      });
    };

    setFolderData((prev) => updateItems(prev));
    setIsRenaming(false);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {/* Left side: Folder/File name with expand toggle */}
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
            <span>{isExpanded ? "▼" : "▶"}</span> // arrow for expand/collapse
          )}

          {/* Name or rename input */}
          {isRenaming ? (
            <input
              autoFocus
              value={renameValue}
              onChange={(e) => setRenameValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleRename(data.name, renameValue);
                if (e.key === "Escape") setIsRenaming(false);
              }}
              onBlur={() => handleRename(data.name, renameValue)}
            />
          ) : (
            <span>{data?.name}</span>
          )}
        </div>

        {/* Right side: action buttons */}
        <div style={{ display: "flex", gap: "5px" }}>
          {data?.isFolder && (
            <>
              <p
                style={{ margin: 0, cursor: "pointer" }}
                title="Add file"
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
                title="Add folder"
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
            title="Delete"
            onClick={() => deleteFileOrFolder(data?.name)}
          >
            🗑️
          </p>
          <p
            style={{ margin: 0, cursor: "pointer" }}
            title="Rename"
            onClick={() => {
              setRenameValue(data.name);
              setIsRenaming(true);
            }}
          >
            🖊️
          </p>
        </div>
      </div>

      {/* Add input */}
      {isAdding && (
        <input
          onBlur={() => handleAddingFileFolder(data?.name, !isFile)}
          autoFocus
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleAddingFileFolder(data?.name, !isFile);
            }
            if (e.key === "Escape") setIsAdding(false);
          }}
          value={newFileFolderName}
          onChange={(e) => setNewFileFolderName(e.target.value)}
          style={{ marginLeft: "20px" }}
        />
      )}

      {/* Children (recursive render) */}
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
