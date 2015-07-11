import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';


class RepositoryStatus extends Component {
    static propTypes: {
        onClickHandler: React.PropTypes.func,
        repository: React.PropTypes.object
    };

    render() {
        let { repository, onClickHandler } = this.props;
        return (
            <li key="" className="RepositoryStatus">
                <div>{repository.get('path')}</div>
                <button onClick={onClickHandler}>Poll</button>
            </li>
        );
    }

}

export default RepositoryStatus