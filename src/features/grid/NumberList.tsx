import { useSelector } from 'react-redux';
import { selectNumbers } from './gridSlice';
import { Number } from './Number';
import styles from './Grid.module.css';

export function NumberList() {
    const numbers = useSelector(selectNumbers);
    return (
        <div className={styles.numberList}>
            { numbers.map((isSelected: boolean, index: number) => (
                <Number key={index} identifier={index} isSelected={isSelected} />
            ))}
        </div>
    );
}
