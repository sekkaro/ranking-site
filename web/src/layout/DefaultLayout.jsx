import Footer from "./partials/Footer";
import Header from "./partials/Header";

const DefaultLayout = ({ children, isAdmin }) => {
  return (
    <div className="default-layout">
      <header className="header">
        <Header isAdmin={isAdmin} />
      </header>
      <main className="main">{children}</main>
      <footer className="footer">
        <Footer />
      </footer>
    </div>
  );
};

export default DefaultLayout;
