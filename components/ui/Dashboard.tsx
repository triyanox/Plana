import Sidebar from "./Sidebard";
import Todos from "./Todos";

const Dashboard = () => {
  return (
    <section className="w-full flex justify-center items-center gap-8">
      <Sidebar />
      <Todos />
    </section>
  );
};
export default Dashboard;
