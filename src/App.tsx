import Topbar from "./components/topbar";
import Main from "./components/main-container";
import Sidebar from "./components/sidebar";

const App = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Topbar />
      <div className="flex flex-1">
        <Sidebar />
        <Main />
      </div>
    </div>
  );
};

export default App;
