import "./App.css";
import { Button } from "@mui/material";
import { ProductTable } from "./components";

function App() {
  return (
    <div className="container">
      <div>
        <Button variant="outlined" color="secondary" className="btn">
          Add a product
        </Button>
      </div>
      <div>
        <ProductTable />
      </div>
    </div>
  );
}

export default App;
