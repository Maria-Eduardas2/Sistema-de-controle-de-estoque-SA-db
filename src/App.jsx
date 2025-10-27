
import Appheader from "../src/components/header";
import PageContent from "./components/pageContent";
import Sidebar from "../src/components/sidebar";


function App() {
  return (
    <div className="flex flex-col w-screen h-screen">
      <Appheader />
        <Sidebar />
        <main>
          <PageContent />
        </main>
      </div>
  );
}

export default App;
