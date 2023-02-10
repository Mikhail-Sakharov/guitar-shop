import {ClipLoader} from 'react-spinners';
import styles from './loading-screen.module.css';

function LoadingScreen(): JSX.Element {
  return (
    <div className={styles.container} data-testid="loadingScreen">
      <div className={styles.spinner}>
        <ClipLoader color={'#5C2800'} size={70}/>
      </div>
    </div>
  );
}

export default LoadingScreen;
