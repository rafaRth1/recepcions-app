import { memo, useState } from "react";
import {
   Button,
   Popover,
   Table,
   TableBody,
   TableCell,
   TableColumn,
   TableHeader,
   TableRow,
} from "@heroui/react";
import { columnFood } from "@/data/columns";
import { clientAxios, pickColor } from "@/utils";
import { Ticket } from "@/core/ticket/interfaces";

interface Props {
   ticket: Ticket;
   handleFinishDeliveryTicket: (id: string) => Promise<void>;
   handleOnOpenModal: (ticket: Ticket) => void;
}

export const DeliveryItem = memo(
   ({ ticket, handleFinishDeliveryTicket, handleOnOpenModal }: Props) => {
      const [color, setColor] = useState(ticket.color);

      const handleEditColorTicket = async (colorTicket: string) => {
         try {
            const { data } = await clientAxios.put(
               `/recepcion/store/${ticket._id}`,
               {
                  color: colorTicket,
               },
            );

            console.log(data);

            setColor(colorTicket);
         } catch (error) {
            console.log(error);
         }
      };

      return (
         <div className="min-w-[420.53px] mb-5 h-fit">
            <div className="flex items-center mb-2">
               <h3 className="mr-5 capitalize font-bold text-lg">
                  {ticket.nameTicket}
               </h3>
               <p className="text-neutral-400 mr-3">{ticket.time}</p>
               <div className="flex-1" />
               <Popover>
                  <Button style={{ background: color }}></Button>
                  <Popover.Content placement="bottom" className="rounded-lg">
                     <Popover.Dialog>
                        <div className="flex gap-2">
                           {pickColor.map((color) => (
                              <div
                                 onClick={() =>
                                    handleEditColorTicket(color.color)
                                 }
                                 key={color.name}
                                 className="w-10 h-10 rounded-md cursor-pointer"
                                 style={{ background: `${color.color}` }}
                              />
                           ))}
                        </div>
                     </Popover.Dialog>
                  </Popover.Content>
               </Popover>
            </div>
            <Table aria-label="Tabla ticket" className="mb-3">
               <TableHeader columns={columnFood}>
                  {(column) => (
                     <TableColumn key={column.key}>{column.label}</TableColumn>
                  )}
               </TableHeader>
               <TableBody items={ticket.dishes}>
                  {(item) => (
                     <TableRow key={item._id}>
                        <TableCell className="capitalize">
                           {item.dishFood}
                        </TableCell>
                        <TableCell className="capitalize">
                           {item.rice ? "Si" : "No"}
                        </TableCell>
                        <TableCell className="capitalize">
                           {item.salad ? "Si" : "No"}
                        </TableCell>
                        <TableCell className="capitalize">
                           S/{item.price.toFixed(2)}
                        </TableCell>
                     </TableRow>
                  )}
               </TableBody>
            </Table>

            {ticket.exception.length > 0 && (
               <p className="font-medium text-warning my-4 text-lg">
                  Excepción: {ticket.exception}
               </p>
            )}

            <div className="flex gap-2">
               <Button
                  variant="danger"
                  onPress={() => handleFinishDeliveryTicket(ticket._id!)}
                  className="w-full"
               >
                  Terminar pedido
               </Button>

               <Button
                  onPress={() => handleOnOpenModal(ticket)}
                  className="w-full"
               >
                  Detalle pedido
               </Button>
            </div>
         </div>
      );
   },
);
