import { useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../logo/logo";
import { IoMenuOutline } from "react-icons/io5";
import {
   Avatar,
   Dropdown,
   Label,
} from "@heroui/react";
import { useAuthProvider } from "@/hooks";

const links = [
   {
      id: 1,
      route: "/",
      name: "Recepciones",
   },
   {
      id: 2,
      route: "/orders",
      name: "Pedidos",
   },
   // {
   // 	id: 3,
   // 	route: '/delivery',
   // 	name: 'Delivery',
   // },
   {
      id: 4,
      route: "/products",
      name: "Productos",
   },
   // {
   // 	id: 5,
   // 	route: '/statistics',
   // 	name: 'Estadísticas',
   // },
   // {
   // 	id: 6,
   // 	route: '/settings',
   // 	name: 'Configuración',
   // },
];

export const Header = () => {
   const [active, setActive] = useState(false);
   const { auth, setAuth } = useAuthProvider();

   const handleLogout = () => {
      setAuth({
         _id: "",
         nick_name: "",
         email: "",
      });

      localStorage.setItem("token", "");
   };

   return (
      <header className="flex p-4">
         <div className="flex items-center flex-1">
            <button onClick={() => setActive(!active)}>
               <IoMenuOutline size={30} className="text-neutral-100" />
            </button>

            <Logo />
         </div>

         <Dropdown>
            <Avatar className="cursor-pointer bg-[#0d0d0d]">
               <Avatar.Fallback>
                  {auth.nick_name?.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)}
               </Avatar.Fallback>
            </Avatar>
            <Dropdown.Popover className="bg-[#0d0d0d]">
               <Dropdown.Menu aria-label="Profile Actions">
                  <Dropdown.Item id="settings" textValue="Configuración" href="/settings">
                     <Label>Configuración</Label>
                  </Dropdown.Item>
                  <Dropdown.Item id="logout" textValue="Cerrar Sesión" variant="danger" onPress={handleLogout}>
                     <Label>Cerrar Sesión</Label>
                  </Dropdown.Item>
               </Dropdown.Menu>
            </Dropdown.Popover>
         </Dropdown>

         <div
            className={`fixed inset-0  z-50 transition-all duration-200 w-full h-full ${
               active
                  ? "translate-x-0 opacity-1 visible pointer-events-auto"
                  : "-translate-x-5 opacity-0 invisible pointer-events-none"
            }`}
         >
            <div
               className="fixed inset-0"
               style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
               onClick={() => setActive(false)}
            />

            <div
               className={`absolute transition-all w-[250px] left-0 top-0 h-full bg-neutral-900 ${
                  active ? "translate-x-0" : "-translate-x-[250px]"
               }`}
            >
               <nav className="p-5">
                  <ul>
                     {links.map((link) => (
                        <NavLink
                           key={link.id}
                           to={link.route}
                           className={({ isActive }) =>
                              isActive ? "opacity-70 p-3 block" : "p-3 block"
                           }
                        >
                           {link.name}
                        </NavLink>
                     ))}
                  </ul>
               </nav>
            </div>
         </div>
      </header>
   );
};
