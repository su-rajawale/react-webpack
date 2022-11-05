import React from "react";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { MdOutlineDragHandle } from "react-icons/md";
import { columnProps } from './types'

function Tasks({ column, tasks }:columnProps) {

  return (
    <Droppable droppableId={column.id}>
      {(provided) => (
        <>
          <TableBody {...provided.droppableProps} ref={provided.innerRef}>
            <TableRow className="deal_stage_title">
              <TableCell colSpan={4}>
                <span>{column.title}</span>
              </TableCell>
            </TableRow>
            {tasks.map((task, index) => (
              <Draggable
                key={`${task.id}`}
                draggableId={`${task.id}`}
                index={index}
              >
                {(provided) => (
                  <TableRow
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                  >
                    <TableCell
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                    >
                      <MdOutlineDragHandle />
                    </TableCell>
                    <TableCell>{task.heading}</TableCell>
                    <TableCell>$ {task.amount}</TableCell>
                    <TableCell>{column.title}</TableCell>
                  </TableRow>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </TableBody>
        </>
      )}
    </Droppable>
  );
}

export default Tasks;
