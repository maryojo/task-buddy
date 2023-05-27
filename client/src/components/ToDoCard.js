import React, { useState } from "react";
import { EditText } from "react-edit-text";
import "react-edit-text/dist/index.css";
import { TbSquareRoundedCheckFilled } from "react-icons/tb";
import { RiDeleteBinFill } from "react-icons/ri";

const ToDoCard = ({ task, handleUpdateTask, handleDeleteTask}) => {

  let tTitle = null;
  let description = null;

  const convertTimestampToLocaleTime = (timeString) => {
    const date = new Date(timeString);
    const localDate = date.toLocaleDateString();
    const localTime = date.toLocaleTimeString();

    return `${localDate} at ${localTime}`;
  };

  let id = task.id;
  const handleTitleSave = ({ name, value, previousValue }) => {
    tTitle = value;
    handleUpdateTask(id, tTitle);
  };

  const handleDescSave = ({ name, value, previousValue }) => {
    description = value;
    handleUpdateTask(id, description);
  };

  return (
    <div className="w-[25rem] bg-pink-300 flex flex-col p-3 pb-10 rounded-md">
      <div className="flex justify-between pb-2">
        <p className="text-xs text-zinc-700">
          {convertTimestampToLocaleTime(task.createdAt)}
        </p>
        <div className="flex gap-4">
          <RiDeleteBinFill className="text-zinc-400 cursor-pointer hover:text-red-400" onClick={() => handleDeleteTask(task.id)}/>
          <TbSquareRoundedCheckFilled className="text-zinc-400 cursor-pointer hover:text-zinc-800" />
        </div>
      </div>
      <EditText
        name="title"
        onSave={handleTitleSave}
        defaultValue={task.title}
        className="font-semibold"
      />
      <EditText
        name="description"
        defaultValue={task.description}
        onSave={handleDescSave}
        className="text-sm"
      />
    </div>
  );
};

export default ToDoCard;
