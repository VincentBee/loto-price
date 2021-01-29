import { useDispatch } from 'react-redux';
import { toggleNumber } from '../../store/grid';
import styles from './number.module.css';

interface Props {
    identifier: number;
    isSelected: boolean;
    isDisabled: boolean;
}

export function Number({ identifier, isSelected, isDisabled }: Props) {
    const dispatch = useDispatch();
    const statusClass = isSelected? styles.numberSelected : isDisabled ? styles.numberDisabled : '';

    return (
        <div
            className={`${styles.number} ${statusClass}`}
            onClick={() => !isDisabled && dispatch(toggleNumber({ identifier, checked: !isSelected}))}>

            <span>{ identifier + 1 }</span>
        </div>
    );
}
