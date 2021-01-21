import { useSelector } from 'react-redux';
import { selectCost } from './gridSlice';
import styles from './Grid.module.css';

export function Cost() {
    const cost = useSelector(selectCost);
    return (
        <div className={styles.cost}>
            <div className={styles.title}>Grille 1</div>
            <div className={styles.price}>
                Mise total: { cost } €
            </div>
        </div>
    );
}
