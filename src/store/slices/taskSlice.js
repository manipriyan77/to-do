import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  groups: [
    {
      id: 'group_name',
      group_name: 'default',
      lists: [
        {
          id: 'list-1',
          list_name: '',
          tasks: [
            {
              id: '',
              title: '',
              description: '',
              dueDate: '',
              priority: '',
              isCompleted: false,
              createdAt: '',
              updatedAt: '',
              reminders: [],
              steps: [
                {
                  id: '',
                  description: '',
                  isCompleted: false,
                },
              ],
            },
          ],
          completedTasks: [], // ✅ New array for completed tasks
        },
      ],
    },
  ],
  currentListDetails: {
    groupId: 'group_name',
    listId: 'list-1',
  },
};

const findList = (state, groupId, listId) => {
  const group = state.groups.find((g) => g.id === groupId);
  return group ? group.lists.find((l) => l.id === listId) : null;
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask(state, action) {
      const { groupId, listId, task } = action.payload;
      const list = findList(state, groupId, listId);
      if (list) {
        list.tasks.push(task);
      }
    },

    completeTask(state, action) {
      const { groupId, listId, taskId } = action.payload;
      const list = findList(state, groupId, listId);
      if (list) {
        const taskIndex = list.tasks.findIndex((t) => t.id === taskId);
        if (taskIndex !== -1) {
          const [completedTask] = list.tasks.splice(taskIndex, 1); // ✅ Remove from tasks
          completedTask.isCompleted = true;
          completedTask.updatedAt = new Date().toISOString();
          list.completedTasks.push(completedTask); // ✅ Add to completedTasks
        }
      }
    },

    deleteTask(state, action) {
      const { groupId, listId, taskId } = action.payload;
      const list = findList(state, groupId, listId);
      if (list) {
        const index = list.tasks.findIndex((task) => task.id === taskId);
        if (index !== -1) {
          list.tasks.splice(index, 1);
        }
      }
    },

    getGroupsName(state) {
      return state.groups.map((group) => group.group_name);
    },

    addGroup(state, action) {
      state.groups = [...state.groups, action.payload];
    },

    updateCurrentListDetails(state, action) {
      console.log('action.payload :>> ', action.payload);
      state.currentListDetails = action.payload;
    },
  },
});

export const {
  addTask,
  completeTask,
  deleteTask,
  getGroupsName,
  addGroup,
  updateCurrentListDetails,
} = tasksSlice.actions;

export default tasksSlice.reducer;
