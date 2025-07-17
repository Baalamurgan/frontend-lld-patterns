import "./App.css";
import reactLogo from "./assets/react.svg";
import Carousel from "./components/Carousel";
import viteLogo from "/vite.svg";

function App() {
  const data = [
    {
      id: "1",
      title: "Item 1",
      description: "Description for Item 1",
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      id: "2",
      title: "Item 2",
      description: "Description for Item 2",
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      id: "3",
      title: "Item 3",
      description: "Description for Item 3",
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      id: "4",
      title: "Item 4",
      description: "Description for Item 4",
      imageUrl: "https://via.placeholder.com/150",
    },
  ];

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <Carousel data={data} />
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
