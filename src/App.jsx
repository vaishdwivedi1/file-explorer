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
  return (
    <div style={{ width: "max-content" }}>
      <h1> File explorer </h1>

      {folderData?.map((ele) => (
        <File
          data={ele}
          folderData={folderData}
          setFolderData={setFolderData}
        />
      ))}
    </div>
  );
}

export default App;
