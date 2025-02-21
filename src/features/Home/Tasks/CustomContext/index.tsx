import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteTask } from '../../../../store/slices/taskSlice';

const ContextMenu = ({ x, y, onClose, task }) => {
  const dispatch = useDispatch();
  console.log('task :>> ', task);
  return (
    <div
      className="custom-context-menu"
      style={{
        top: y,
        left: x,
        position: 'absolute',
        backgroundColor: '#fff',
        boxShadow: '0px 0px 10px rgba(0,0,0,0.1)',
        borderRadius: '8px',
        padding: '10px',
        zIndex: 1000,
        minWidth: '150px',
      }}
    >
      <ul className="context-menu-list" onClick={onClose}>
        <li className="context-menu-item" onClick={() => dispatch(deleteTask(task.id))}>
          Delete Task
        </li>
        <li>Move to</li>
      </ul>
    </div>
  );
};

export default ContextMenu;
