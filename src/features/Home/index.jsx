import { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import './styles.scss';
import Tasks from './Tasks';
import TaskDetails from '../TaksDetails';

const Home = () => {
  const [isShowDetails, setIsShowDetails] = useState(false);

  return (
    <>
      <div className="home_container flex">
        <Sidebar />
        <div className="tasks_container">
          <Tasks setIsShowDetails={setIsShowDetails} isShowDetails={isShowDetails} />
        </div>
        {isShowDetails && <TaskDetails />}
      </div>
    </>
  );
};

export default Home;
