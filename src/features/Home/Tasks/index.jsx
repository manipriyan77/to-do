import { useDispatch, useSelector } from 'react-redux';
import { addTask, completeTask } from '../../../store/slices/taskSlice';
import { useState } from 'react';
import './styles.scss';
import ContextMenu from './CustomContext';

// eslint-disable-next-line react/prop-types
const Tasks = ({ setIsShowDetails, isShowDetails }) => {
  const [task, setTask] = useState('');
  const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0 });

  const dispatch = useDispatch();
  const { groups, currentListDetails } = useSelector((state) => state.tasks);

  const currentGroup = groups.find((group) => group.id === currentListDetails.groupId);
  const currentList = currentGroup?.lists.find((list) => list.id === currentListDetails.listId);

  const handleContextMenu = (e) => {
    e.preventDefault();
    setContextMenu({
      visible: true,
      x: e.pageX,
      y: e.pageY,
    });
  };

  const handleCloseContextMenu = () => {
    setContextMenu({ ...contextMenu, visible: false });
  };

  function handleAddTask(e) {
    e.preventDefault();
    const newTask = {
      id: Date.now(),
      title: task,
      description: '',
      dueDate: '',
      priority: '',
      isCompleted: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      reminders: [],
      steps: [],
    };

    const payload = {
      groupId: currentListDetails.groupId,
      listId: currentListDetails.listId,
      task: newTask,
    };

    dispatch(addTask(payload));
    setTask('');
  }

  if (!currentList) {
    return <div className="tasks_list_container">Select a list to see tasks.</div>;
  }
  console.log('currentGroup :>> ', currentList);
  return (
    <section className="tasks_list_container">
      <div className="tasks_header">
        <h2>
          {currentGroup?.group_name} - {currentList?.list_name || 'Default List'}
        </h2>
      </div>
      <div className="tasks_lists">
        {currentList.tasks.map((singleTask, index) => (
          <section
            key={index}
            className="single_task_container"
            onClick={(e) => {
              if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'LI') {
                setIsShowDetails(!isShowDetails);
              }
            }}
            onContextMenu={handleContextMenu}
          >
            <input
              type="radio"
              onChange={() =>
                dispatch(
                  completeTask({
                    groupId: currentGroup.id,
                    listId: currentList.id,
                    taskId: singleTask.id,
                  })
                )
              }
            />
            {singleTask.title}
            {contextMenu.visible && (
              <ContextMenu
                x={contextMenu.x}
                y={contextMenu.y}
                onClose={handleCloseContextMenu}
                task={singleTask}
              />
            )}
          </section>
        ))}

        {currentList.completedTasks?.length > 0 && (
          <div className="completed_tasks_container">
            <h3>Completed Tasks</h3>
            {currentList.completedTasks.map((taskComplete, idx) => (
              <section key={idx} className="completed_task">
                <h4>{taskComplete.title}</h4>
              </section>
            ))}
          </div>
        )}
      </div>
      <div className="add-task">
        <form onSubmit={handleAddTask}>
          <div className="add_task_input">
            <input
              type="text"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              placeholder="Add a new task..."
            />
          </div>
        </form>
      </div>
    </section>
  );
};

export default Tasks;
