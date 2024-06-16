import React, { useEffect, useMemo, useState } from 'react';
import './home.css';
import Featureadifo from '../../components/featureadinfo/Featureadifo';
import Chart from '../../components/chart/Chart';

import WidgetSm from '../../components/widgetSm/WidgetSm';
import WidgetLg from '../../components/widgetLg/WidgetLg';
import { userRequest } from '../../requestMethods';

const Home = () => {
  const [userStats, setUserStats] = useState([]);
  const MONTH = useMemo(
    () => [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Nov',
      'Dec',
    ],
    []
  );
  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await userRequest.get("/users/stats");
        res.data.map((item) =>
          setUserStats((prev) => [
            ...prev,
            { name: MONTH[item._id - 1], 'Active User': item.total },
          ])
        );
      } catch (error) {}
    };
    getStats();
  }, [MONTH]);
console.log(userStats);
  return (
    <div className='home'>
      <Featureadifo />
      <Chart data={userStats} title="User Analytics" grid dataKey="Active User" />
      <div className="homeWidgets">
        <WidgetSm/>
        <WidgetLg/>
      </div>
    </div>
  );
};

export default Home;
