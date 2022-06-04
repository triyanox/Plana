import Tab from "./Tab";
import { BiSquareRounded } from "react-icons/bi";
import { CgToday, CgMathPlus } from "react-icons/cg";
import { RiSettings4Fill } from "react-icons/ri";

export const HomeTab = () => {
  return <Tab icon={<BiSquareRounded className="text-3xl" />} text="Home" />;
};

export const RecentTab = () => {
  return <Tab icon={<CgToday className="text-3xl" />} text="Recent" />;
};

export const CreateTab = () => {
  return (
    <Tab icon={<CgMathPlus className="text-3xl" />} text="Create new list" />
  );
};

export const SettingTab = () => {
  return (
    <Tab icon={<RiSettings4Fill className="text-3xl" />} text="Settings" />
  );
};
