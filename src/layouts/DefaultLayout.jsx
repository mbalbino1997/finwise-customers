import { useContext } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import GlobalContext from "../context/GlobalContext";
import Loader from "../components/Loader";

const DefaultLayout = () => {
    const { isLoading } = useContext(GlobalContext);
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />
            <main style={{ flex: 1, padding: '20px' }}>
                <Outlet />
            </main>
            {isLoading && <Loader />}
            <Footer />
        </div>
    )
}
export default DefaultLayout;