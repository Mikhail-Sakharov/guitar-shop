import {Outlet} from 'react-router-dom';
import {useAppSelector} from '../../hooks';
import LoadingScreen from '../../pages/loading-screen/loading-screen';
import {getDataLoadedStatus} from '../../store/app-data/selectors';
import Footer from '../footer/footer';
import Header from '../header/header';

function Layout() {
  const isDataLoaded = useAppSelector(getDataLoadedStatus);

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      {isDataLoaded && <LoadingScreen />}
    </>
  );
}

export default Layout;
