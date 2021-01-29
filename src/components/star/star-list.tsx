import { useSelector } from 'react-redux';
import { selectStarMax, selectStars } from '../../store/grid';
import { Star } from './star';
import styles from './star.module.css';

export function StarList() {
    const stars = useSelector(selectStars);
    const cantSelectMore = useSelector(selectStarMax);

    return (
        <div className={styles.starList}>
            { stars.map((isSelected: boolean, index: number) => (
                <Star
                    key={index}
                    identifier={index}
                    isSelected={isSelected}
                    isDisabled={!isSelected && cantSelectMore}
                />
            ))}
        </div>
    );
}
