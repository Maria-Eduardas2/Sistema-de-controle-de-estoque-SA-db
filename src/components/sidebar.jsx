import { useState, useContext, createContext } from "react";
import { TbMenu2 } from "react-icons/tb";

const SidebarContext = createContext();

function Sidebar({ children }) {
  const [expanded, setExpanded] = useState(true);

  return (
    <aside className={`h-screen ${expanded ? "w-64" : "w-20"} transition-all duration-300`}
      onClick={(item) => {
        navigate(item.key);
      }}
    >
      <nav className="h-full flex flex-col bg-[#6EBBCE] border-r shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
          <button
            onClick={() => setExpanded(curr => !curr)}
            className="p-1.5 rounded-lg bg-[#6EBBCE] hover:bg-[#4A87A6]"
          >
            <TbMenu2 className="text-[2em] text-white" />
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>

        <div className="border-t flex p-3">
             <div
                className={`
                pb-12
                flex justify-between items-center
                overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}
            `}
            >
            <h4 className=" font-semibold text-[#FFFDF4] text-[1.5em] font-titillium">
                FiveFull
            </h4>
            </div>
        </div>
       

      </nav>
    </aside>
  );
}

export default Sidebar;

export function SidebarItem({ icon, text, active, alert, onClick }) {
  const { expanded } = useContext(SidebarContext);

  return (
    <li
      onClick={onClick}
      className={`group w-full relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer
        transition-colors
        ${
          active
            ? "bg-gradient-to-tr from-[#4A87A6] to-[#74A9C4] text-[#FFF151]"
            : "hover:bg-[#6EBBCE] text-white"
        }`}
    >
      {icon}
      {expanded && (
        <span className="ml-3 whitespace-nowrap transition-all">{text}</span>
      )}
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded-full bg-[#FFF151] ${
            expanded ? "" : "top-2"
          }`}
        />
      )}
      {!expanded && (
        <div
          className="absolute left-full rounded-md px-2 py-1 ml-6
          bg-[#FFFDF4] text-[#4A87A6] text-sm
          invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0"
        >
          {text}
        </div>
      )}
    </li>
  );
}

