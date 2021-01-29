import React from 'react';
import { useSelector } from 'react-redux';
import { selectCost } from '../../store/grid';
import { NumberList } from '../number/number-list';
import { StarList } from '../star/star-list';
import styles from './grid.module.css';

export function Grid() {
    const cost = useSelector(selectCost);

    return (
        <div className={styles.grid}>
            <div className={styles.cost}>
                <div className={styles.title}>Grille 1</div>
                <div className={styles.price}>
                    Mise total: { cost } €
                </div>
            </div>

            <NumberList />

            <StarList />
        </div>
    );
}

export default Grid;
