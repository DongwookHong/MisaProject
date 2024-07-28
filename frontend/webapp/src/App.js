import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Park from './ParkPage/ParkPage.js';
import QrPage from './QRpage/QrPage.js';
import FindSpot from './FindSpot/FindSpot.js';
import FloorMenu from './FloorMenu/FloorMenu.js';
import MainComponent, {
  mainComponentLoader,

} from './FloorSpecific/MainComponent.js';
import Main from './MainMenu/Main.js';
import BlogPage, { blogLoader } from './BlogPage/Blog';
import StoreList from './StoreList/StoreList.js';
import FindAD from './Fix/FindAD.js';
import NotFound from './Static/NotFound.js';
import Admin from './Admin/AdminPage.js';
import AddShop from './AdminDashboard/AdminAddShop.js';

const router = createBrowserRouter([
  { path: '/', element: <Main /> },
  { path: '/qr/:id', element: <QrPage /> },
  {
    path: '/storeinfo/:name',
    element: <BlogPage />,
    loader: blogLoader,
    errorElement: <NotFound />,
  },
  { path: '/storelist', element: <StoreList /> },
  { path: '/parkinfo', element: <Park /> },
  { path: '/findspot/:name', element: <FindSpot /> }, // findSpotLoader 제거
  { path: '/floormenu', element: <FloorMenu /> },
  {
    path: '/:building/:wing',
    element: <MainComponent />,
    loader: mainComponentLoader,
    errorElement: <NotFound />,
  },
  { path: '/admin', element: <Admin /> },
  { path: '/addshop', element: <AddShop /> },

  { path: '/findad', element: <FindAD /> },
  { path: '*', element: <NotFound /> },
]);
function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
