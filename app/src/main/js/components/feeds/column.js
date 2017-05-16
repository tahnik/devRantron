import React from 'react';
import PropTypes from 'prop-types';
import RantCard from '../rant/rant_card';
import Loading from '../utilities/loading';
import ColumnTopBar from './column_topbar';
import { STATE } from '../../consts/types';

const Column = (props) => {
  const { feed, theme, vote, fetch, open, filters } = props;
  return (
    <div
      className="column"
      style={{ width: `${theme.column.width}rem` }}
    >
      <ColumnTopBar filters={filters} fetch={fetch} />
      <div className="items_container">
        {
          feed.state === STATE.LOADING || !feed.items ?
            <Loading
              backgroundColor={theme.backgroundColor}
            /> :
            feed.items.map(item => (
              <RantCard
                fetch={fetch}
                item={item}
                open={(type, id) => open(type, id)}
                key={item.id} theme={theme} vote={vote}
              />
            ))
        }
      </div>
    </div>
  );
};

Column.propTypes = {
  fetch: PropTypes.func.isRequired,
  feed: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  vote: PropTypes.func.isRequired,
  open: PropTypes.func.isRequired,
  filters: PropTypes.object.isRequired,
};

export default Column;
