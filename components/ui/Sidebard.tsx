import { HomeTab, RecentTab, CreateTab, SettingTab } from "./Tabs";

const Sidebar = () => {
  return (
    <section className="h-screen w-1/3 shadow-xl flex flex-col justify-center items-start gap-8">
      <div className="bg-zinc-200 rounded-2xl dark:bg-zinc-800 h-screen w-full flex flex-col justify-between py-8 px-4 items-center gap-2">
        <div className="bg-zinc-200  dark:bg-zinc-800  w-full flex flex-col  items-center gap-2">
          <HomeTab />
          <RecentTab />
          <CreateTab />
        </div>
        <div className="bg-zinc-200  dark:bg-zinc-800  w-full flex flex-col  items-center gap-2">
          <div className="flex w-full justify-between items-center">
            <SettingTab />
          </div>
        </div>
      </div>
    </section>
  );
};
export default Sidebar;
