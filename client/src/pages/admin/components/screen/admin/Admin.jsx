import DataDashboard from "./DataDashboard";
import Header from "./Header";

const Admin = () => {
    return <div className="flex flex-col">
        <Header />
        <DataDashboard />
    </div>;
};

export default Admin;