import { HomePage } from "../pages/home/ui/HomePage";
import { Providers } from "./providers/Provider";


function App() {
  return (
    <Providers>
      <HomePage />
    </Providers>
  );
}

export default App;
