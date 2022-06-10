import Tab, { TabSm } from "./Tab";
import { BiSquareRounded } from "react-icons/bi";
import { CgToday, CgMathPlus } from "react-icons/cg";
import { RiSettings4Fill } from "react-icons/ri";
import { BsLaptopFill, BsFillSunFill, BsMoonStars } from "react-icons/bs";
import { useMediaQuery } from "react-responsive";
export const HomeTab = () => {
  const { setSeletedList } = useSelectedList();
  const isMobile = useMediaQuery({ maxWidth: 1024 });
  const { setIsActive } = useMenu();

  return (
    <Tab
      onClick={() => {
        setSeletedList({
          id: 0,
          name: "",
          userId: 0,
          createdAt: "",
          updatedAt: "",
        });
        isMobile && setIsActive(false);
      }}
      icon={<BiSquareRounded className="text-3xl" />}
      text="Home"
    />
  );
};

import { useSelectedList } from "../hooks/SelectedList";
import { useMenu } from "../hooks/Menu";
import { TbChecklist } from "react-icons/tb";
export const ListTab = (props: {
  list: {
    id: number;
    name: string;
    userId: number;
    createdAt: string;
    updatedAt: string;
  };
}) => {
  const { setSeletedList } = useSelectedList();
  const { setIsActive } = useMenu();
  const isMobile = useMediaQuery({ maxWidth: 1024 });
  const DayAndMOnth = (date: string) => {
    const d = new Date(date);
    const day = d.getDate();
    const month = d.toUTCString().split(" ")[2];
    return `${day} ${month}`;
  };

  return (
    <Tab
      date={DayAndMOnth(props.list.createdAt.toString())}
      onClick={() => {
        setSeletedList(props.list);
        isMobile && setIsActive(false);
      }}
      icon={<TbChecklist className="text-3xl" />}
      text={props.list.name}
    />
  );
};

export const RecentTab = () => {
  return <Tab icon={<CgToday className="text-3xl" />} text="Recent" />;
};

export const CreateTab = (props: { onclick: () => void }) => {
  const isMobile = useMediaQuery({ maxWidth: 1024 });

  return (
    <Tab
      {...(!isMobile && { date: "Cmd + Alt" })}
      onClick={props.onclick}
      icon={<CgMathPlus className="text-3xl" />}
      text="New List"
    />
  );
};

export const SettingTab = (props: { onclick: () => void }) => {
  const isMobile = useMediaQuery({ maxWidth: 1024 });
  return (
    <Tab
      {...(!isMobile && { date: "Cmd + K" })}
      onClick={props.onclick}
      icon={<RiSettings4Fill className="text-3xl" />}
      text="Settings"
    />
  );
};

export const DarkThemeTab = (props: { onclick: () => void }) => {
  return (
    <TabSm
      onClick={props.onclick}
      icon={<BsMoonStars className="text-2xl" />}
      text="Dark"
    />
  );
};

export const LightThemeTab = (props: { onclick: () => void }) => {
  return (
    <TabSm
      onClick={props.onclick}
      icon={<BsFillSunFill className="text-2xl" />}
      text="Light"
    />
  );
};

export const SysThemeTab = (props: { onclick: () => void }) => {
  return (
    <TabSm
      onClick={props.onclick}
      icon={<BsLaptopFill className="text-2xl" />}
      text="System"
    />
  );
};
