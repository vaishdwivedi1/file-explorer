// TODO
// 1- create a data struture with a dummy data
// 2- just print the name of all files and folders present in the data
// 3- make ui like a file explorer - the tree like structure adding add delete and reame options
// 4- implement open close functinality
// 5- implement add file and folder functionality - inside this handle input asccordingly
// 6- implement delete file and folder functionality
// 7- implement rename file and folder functionality

import { useState } from "react";
import File from "./components/File";
import data from "./data.json";

function App() {
  const [folderData, setFolderData] = useState(data);

  // 🆕 Root-level add input states
  const [isAddingRoot, setIsAddingRoot] = useState(false);
  const [isFileRoot, setIsFileRoot] = useState(null);
  const [rootInputValue, setRootInputValue] = useState("");

  // 🧩 Handle adding at root
  const handleAddRoot = (isFolder) => {
    if (!rootInputValue.trim()) return;

    const newItem = {
      name: rootInputValue,
      isFolder,
      children: isFolder ? [] : undefined,
    };

    setFolderData((prev) => [...prev, newItem]);
    setIsAddingRoot(false);
    setRootInputValue("");
  };

  return (
    <div style={{ width: "max-content", padding: "10px" }}>
      <h1>📂 File Explorer</h1>

      {/* 🆕 Root-level controls */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
        <button
          onClick={() => {
            setIsAddingRoot(true);
            setIsFileRoot(true);
          }}
        >
          ➕ Add File
        </button>
        <button
          onClick={() => {
            setIsAddingRoot(true);
            setIsFileRoot(false);
          }}
        >
          📁 Add Folder
        </button>
      </div>

      {/* 🧾 Root-level input (same UX as File component) */}
      {isAddingRoot && (
        <input
          autoFocus
          placeholder={`Enter ${isFileRoot ? "file" : "folder"} name`}
          value={rootInputValue}
          onChange={(e) => setRootInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleAddRoot(!isFileRoot);
            if (e.key === "Escape") setIsAddingRoot(false);
          }}
          onBlur={() => handleAddRoot(!isFileRoot)}
          style={{ marginBottom: "10px" }}
        />
      )}

      {/* Render all root level items */}
      {folderData?.map((ele) => (
        <File
          key={ele.name}
          data={ele}
          folderData={folderData}
          setFolderData={setFolderData}
        />
      ))}
    </div>
  );
}

export default App;
