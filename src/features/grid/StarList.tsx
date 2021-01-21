import { useSelector } from 'react-redux';
import { selectStars } from './gridSlice';
import { Star } from './Star';
import styles from './Grid.module.css';

export function StarList() {
    const stars = useSelector(selectStars);
    return (
        <div className={styles.starList}>
            { stars.map((isSelected: boolean, index: number) => (
                <Star key={index} identifier={index} isSelected={isSelected} />
            ))}
        </div>
    );
}
