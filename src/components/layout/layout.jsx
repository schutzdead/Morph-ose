import Header from "./header";
import Footer from "./footer";

export default function Layout({ children }) {
    
    return (
        <div className="min-h-[100vh] flex flex-col">
            <Header />
            {children}
            <Footer />
        </div>
    );
  }