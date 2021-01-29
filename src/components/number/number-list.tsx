import { useSelector } from 'react-redux';
import { selectNumberMax, selectNumbers } from '../../store/grid';
import { Number } from './number';
import styles from './number.module.css';

export function NumberList() {
    const numbers = useSelector(selectNumbers);
    const cantSelectMore = useSelector(selectNumberMax);

    return (
        <div className={styles.numberList}>
            { numbers.map((isSelected: boolean, index: number) => (
                <Number
                    key={index}
                    identifier={index}
                    isSelected={isSelected}
                    isDisabled={!isSelected && cantSelectMore}
                />
            ))}
        </div>
    );
}
