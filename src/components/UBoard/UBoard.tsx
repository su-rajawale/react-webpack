import React, { useState } from "react";
import "./UBoard.css";
import Column from "./Column";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";

import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Tasks from "./Tasks";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import DashboardIcon from "@mui/icons-material/Dashboard";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { TableFooter } from "@mui/material";
import { columnType, taskData } from './types'

// const task = {id:1, heading:"Benton", content:"Chanay Sample", amount:"2500"}

const initialData = {
  tasks: {
    1: {
      id: 1,
      heading: "Benton",
      content: "Chanay Sample",
      amount: "2500",
    },
    2: {
      id: 2,
      heading: "Turhlar and Turhalar Attys",
      content: "James sample",
      amount: "2300",
    },
    3: {
      id: 3,
      heading: "Chemel",
      content: "Rama sample",
      amount: "1100",
    },
    4: {
      id: 4,
      heading: "King",
      content: "Gregory sample",
      amount: "100",
    },
    5: {
      id: 5,
      heading: "Fleds Printing Service",
      content: "rosted sample",
      amount: "3002",
    },
    6: {
      id: 6,
      heading: "Printing Dimensions",
      content: "romanian sample",
      amount: "2031",
    },
    7: {
      id: 7,
      heading: "bankman stantlan",
      content: "shonen sample",
      amount: "885",
    },
    8: {
      id: 8,
      heading: "Fletz Chapman",
      content: "Donnetto Foller sample",
      amount: "4214",
    },
    9: {
      id: 9,
      heading: "Ghibli Interior",
      content: "studio sample",
      amount: "1204",
    },
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "Qualification",
      taskIds: [1, 2],
    },
    "column-2": {
      id: "column-2",
      title: "Need Analysis",
      taskIds: [3, 4],
    },
    "column-3": {
      id: "column-3",
      title: "Value Proposition",
      taskIds: [5, 6, 7],
    },
    "column-4": {
      id: "column-4",
      title: "Identify descision maker",
      taskIds: [8, 9],
    },
    "column-5": {
      id: "column-5",
      title: "Closed Won",
      taskIds: [],
    },
  },
  columnOrder: ["column-1", "column-2", "column-3", "column-4", "column-5"],
};

const reorderColumnList = (sourceCol:columnType, startIndex:number, endIndex: number) => {
  const newTaskIds = Array.from(sourceCol.taskIds);
  const [removed] = newTaskIds.splice(startIndex, 1);
  newTaskIds.splice(endIndex, 0, removed);

  const newColumn = {
    ...sourceCol,
    taskIds: newTaskIds,
  };

  return newColumn;
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#1976d2',
    color: theme.palette.common.white,
    fontSize: 18,
    fontWeight: 'bold'
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

function UBoard() {
  const [state, setState] = useState<taskData>(initialData);
  const [isKanban, setKanban] = useState(false);

  const changeView = () => {
    if (!isKanban) {
      setKanban(true);
    } else {
      setKanban(false);
    }
  };

  const handleDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    // If user tries to drop in an unknown destination
    if (!destination) return;

    // if the user drags and drops back in the same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // If the user drops within the same column but in a different position

    const sourceCol:columnType = state.columns[source.droppableId];
    const destinationCol:columnType = state.columns[destination.droppableId];

    if (sourceCol.id === destinationCol.id) {
      const newColumn = reorderColumnList(
        sourceCol,
        source.index,
        destination.index
      );

      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [newColumn.id]: newColumn,
        },
      };
      setState(newState);
      return;
    }

    // If the user moves from one column to another
    const startTaskIds = Array.from(sourceCol.taskIds);
    const [removed] = startTaskIds.splice(source.index, 1);
    const newStartCol = {
      ...sourceCol,
      taskIds: startTaskIds,
    };

    const endTaskIds = Array.from(destinationCol.taskIds);
    endTaskIds.splice(destination.index, 0, removed);
    const newEndCol = {
      ...destinationCol,
      taskIds: endTaskIds,
    };

    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newStartCol.id]: newStartCol,
        [newEndCol.id]: newEndCol,
      },
    };

    setState(newState);
  };

  return (
    <>
      <div className="board-view">
        <span style={{ marginRight: "20px" }}>
          <strong>Change View</strong>
        </span>
        <Button variant="contained" color="primary" onClick={changeView}>
          {isKanban ? <DashboardIcon /> : <FormatListBulletedIcon />}
        </Button>
      </div>
      {!isKanban ? (
        <section id="uboard2">
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <StyledTableCell>+</StyledTableCell>
                  <StyledTableCell>Deal Name</StyledTableCell>
                  <StyledTableCell>Ammout</StyledTableCell>
                  <StyledTableCell>Stage</StyledTableCell>
                </TableRow>
              </TableHead>
              <DragDropContext onDragEnd={handleDragEnd}>
                {state.columnOrder.map((columnId) => {
                  const column = state.columns[columnId];
                  const tasks = column.taskIds.map(
                    (taskId) => state.tasks[taskId]
                  );
                  return (
                    <Tasks key={column.id} tasks={tasks} column={column} />
                  );
                })}
              </DragDropContext>
              <TableFooter>
                <TableRow>
                    <TableCell>Later</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </section>
      ) : (
        <section id="uboard">
          <DragDropContext onDragEnd={handleDragEnd}>
            <article className="uboard-board">
              {state.columnOrder.map((columnId) => {
                const column = state.columns[columnId];
                const tasks = column.taskIds.map(
                  (taskId) => state.tasks[taskId]
                );
                return <Column key={column.id} column={column} tasks={tasks} />;
              })}
            </article>
          </DragDropContext>
        </section>
      )}
    </>
  );
}

export default UBoard;
