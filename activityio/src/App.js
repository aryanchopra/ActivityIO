import React, { useState } from "react";
import "./App.css";
import Landing from "./pages/landing";

function App() {
  const [user, setUser] = useState(false);
  if (!user) return <Landing />;

  return <div className="App">{}</div>;
}

export default App;
