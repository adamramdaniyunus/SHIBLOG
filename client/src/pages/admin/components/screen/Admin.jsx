import DataDashboard from "./admin/DataDashboard";
import Header from "./admin/Header";

const Admin = () => {
    return <div className="flex flex-col">
        <Header />
        <DataDashboard />
    </div>;
};

export default Admin;