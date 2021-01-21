import React from 'react';
import { connect } from 'react-redux';
import { Cost } from './Cost';
import { loadPricesApi } from './gridSlice';
import { NumberList } from './NumberList';
import { StarList } from './StarList';
import styles from './Grid.module.css';

export class Grid extends React.Component<any> {
    constructor (props: any) {
        super(props);
    }

    componentDidMount() {
        this.props.loadPricesApi();
    }
    
    render() {
        return (
            <div className={styles.grid}>
                <Cost />
                <NumberList />
                <StarList />
            </div>
        );
    }
}

export default connect(
    null,
    { loadPricesApi }
)(Grid);
