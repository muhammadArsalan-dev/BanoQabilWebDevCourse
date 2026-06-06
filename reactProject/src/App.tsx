import Navbar from "./components/navbar/navbar.tsx";
import Card from "./components/cards/card.tsx";
import DynamicCard from "./components/cards/dynamicCard.tsx";

const App = () => {
  return(
    <div>
      <Navbar/>
      <Card />
      <DynamicCard user="Arsalan" paragraph = "This is paragraph" />
    </div>
  );
};

export default App;