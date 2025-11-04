// TODO
// 1- create a data struture with a dummy data
// 2- just print the name of all files and folders present in the data
// 3- make ui like a file explorer - the tree like structure adding add delete and reame options
// 4- implement open close functinality
// 5- implement add file and folder functionality - inside this handle im=nput asccordingly
// 6- implement delete file and folder functionality
// 7- implement rename file and folder functionality

import File from "./components/File";
import data from "./data.json";
function App() {
  return (
    <>
      File explorer
      {/* printing just the parent  */}
      {/* {data?.map((ele)=>(
      <>
      <p>{ele?.name}</p>
      </>
     ))} */}


      {/* here comes the recurraion of preting all the files whether parent or children */}
      {data?.map((ele) => (
        <File data={ele} />
      ))}
    </>
  );
}

export default App;
