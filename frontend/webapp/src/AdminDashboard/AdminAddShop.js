// import React from 'react';
// import './AdminAddShop.css';
// import DashSide from './DashSide';
// import DashHeader from './DashHeader';
// import EnrollStore from './EnrollStore';

// function AdminAddShop() {
//   return (
//     <div className="admin-dashboard">
//       <DashSide />
//       <DashHeader />
//       <EnrollStore />
//     </div>
//   );
// }

// export default AdminAddShop;

import React from 'react';
import './AdminAddShop.css';
import DashSide from './DashSide';
import DashHeader from './DashHeader';
import EnrollStore from './EnrollStore';

function AdminAddShop() {
  return (
    <div className="admin-dashboard">
      <DashSide />
      <DashHeader />
      <div className="main-content">
        <EnrollStore />
      </div>
    </div>
  );
}

export default AdminAddShop;
