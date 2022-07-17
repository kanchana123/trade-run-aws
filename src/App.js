import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import MixedChart from './MixedChart.js'
import CanvasJSChart from './CanvasJSChart.js'

function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
        <Routes>
          <Route path="/chart" element={<CanvasJSChart/>}/>
          <Route path="/home" element={<div></div>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
