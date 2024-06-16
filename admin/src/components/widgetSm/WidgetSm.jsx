import React, { useEffect, useState } from 'react';
import './widgetSm.css';
import { Visibility } from '@material-ui/icons';
import { userRequest } from '../../requestMethods';
const WidgetSm = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await userRequest.get('users/?new=true');
        setUsers(res.data);
      } catch (error) {}
    };
    getUsers();
  }, []);
  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {users.map((user,index)=>(

          <li className="widgetSmListItem" key={index}>
          <img
            className="widgetSmImg"
            src={user.img} 
            alt=""
            />
          <div className="widgetSmUser">
            <span className="widgetSmUsername">{user.username}</span>
          
          </div>
          <button className="widgetSmButton">
            <Visibility className="widgetSmIcon" />
            Display
          </button>
        </li>
          ))}
       
      </ul>
    </div>
  );
};

export default WidgetSm;
