import { Copyrights } from "../Copyrights/Copyrights";
import Menu from "../Menu/Menu";
import Routing from "../Routing/Routing";

function Layout(): JSX.Element {
  return (
    <div className="min-h-screen flex flex-col">
      <header>
        <Menu />
      </header>
      <main className="mt-4">
        <Routing />
      </main>
      <footer className="mt-auto items-center">
        <Copyrights />
      </footer>
    </div>
  );
}

export default Layout;
