import Alert from "./components/Alert";
import ListGroup from "./components/ListGroup";
import Button1 from "./components/button1";

function App() {
  let items = ["New York", "San Francisco", "Tokyo", "London", "Paris"];

  const handleSelectItem = (item: string) => {
    console.log(item);
  };

  return (
    <div>
      <Button1 color="secondary" onClickButton={() => console.log("Clicked")}>Click Here</Button1>
    </div>
  );
}

export default App;
