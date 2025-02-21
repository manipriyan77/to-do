import { useState } from 'react';
import SearchBar from '../SearchBar';
import { useDispatch, useSelector } from 'react-redux';
import './styles.scss';
import { addGroup, updateCurrentListDetails } from '../../store/slices/taskSlice';

const Sidebar = () => {
  const [showAddGroup, setShowAddGroup] = useState(false);
  const [groupName, setGroupName] = useState('');

  const dispatch = useDispatch();

  const groupsName = useSelector((state) => state.tasks.groups);

  function handleAddGroup(e) {
    e.preventDefault();
    let newGroup = {
      id: groupName,
      group_name: groupName,
      lists: [
        {
          id: 'list-1',
          list_name: '',
          tasks: [
            {
              id: '',
              title: 'fsdg',
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
        },
      ],
    };
    dispatch(addGroup(newGroup));
    setGroupName('');
    setShowAddGroup(false);
  }

  function handleGroupDetailsUpdate(group) {
    let currentListDetails = { groupId: group.id, listId: group.lists[0].id };
    dispatch(updateCurrentListDetails(currentListDetails));
  }
  return (
    <section className="sidebar_container">
      {/* <img src="" alt="" /> */}
      <div className="profile_details flex">
        <div className="profile_image">
          <img src="../" alt="" />
        </div>
        <div className="profile_user_details ml-4 mb-4">
          <div className="username">Manipriyan</div>
          <div className="user_mail">manipriyangopalan@gmail.com</div>
        </div>
      </div>
      <div className="search_container">
        <SearchBar />
      </div>
      <div className="list_categories_container">
        <div className="list_categories">
          {groupsName.map((group, index) => {
            return (
              <div key={index} onClick={() => handleGroupDetailsUpdate(group)}>
                {group.group_name}
              </div>
            );
          })}
          {showAddGroup && (
            <form onSubmit={handleAddGroup}>
              <input type="text" value={groupName} onChange={(e) => setGroupName(e.target.value)} />
            </form>
          )}
        </div>
      </div>
      <section className="add_new_list_container">
        <button>+ New List</button>
        <button onClick={() => setShowAddGroup(true)}>New Group</button>
      </section>
    </section>
  );
};

export default Sidebar;
