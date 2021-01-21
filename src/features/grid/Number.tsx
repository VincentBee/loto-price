import { useDispatch } from 'react-redux';
import { toggleNumber } from './gridSlice';
import styles from './Grid.module.css';

export function Number({ identifier, isSelected }: { identifier: number, isSelected: boolean }) {
    const dispatch = useDispatch();

    return (
        <div className={`${styles.number} ${isSelected ? styles.numberSelected : ''}`} onClick={() => dispatch(toggleNumber({ identifier, checked: !isSelected}))}>
            { identifier + 1 }
        </div>
    );
}
