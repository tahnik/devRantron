import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Dropdown extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
      selected: 0,
    };
  }
  handleClick(index) {
    const { items } = this.props;
    this.setState({ selected: index, open: false });
    this.props.onSelect(items[index]);
  }
  render() {
    const { noBackground, items } = this.props;
    const { selected, open } = this.state;
    const selectedItem = items[selected];
    let dropItemsStyle = {};
    if (noBackground) {
      dropItemsStyle = {
        padding: 0,
        backgroundColor: 'transparent',
        marginTop: 0,
      };
    }
    return (
      <div className="dropdown">
        <div className="selected" onClick={() => { this.setState({ open: !open }); }}>
          <div className="drop_item" style={{ backgroundColor: selectedItem.color }}>
            { selectedItem.icon ?
              <div className="drop_icon" ><i className={selectedItem.icon} /></div>
              : null
            }
            { selectedItem.header ? <span className="drop_header">{selectedItem.header}</span>
              : null
            }
            { selectedItem.body ? <span className="drop_body">{selectedItem.body}</span> : null }
            <i className="ion-chevron-down" />
          </div>
        </div>
        <div className={`drop_items ${open ? 'active' : ''}`} style={dropItemsStyle} >
          {
            items.map((item, index) => (
              <div
                className="drop_item"
                key={`${item.header}_${item.body}`}
                style={{ backgroundColor: item.color }}
                onClick={() => this.handleClick(index)}
              >
                { selectedItem.icon ?
                  <div className="drop_icon" ><i className={item.icon} /></div>
                  : null
                }
                { item.header ? <span className="drop_header">{item.header}</span> : null }
                { item.body ? <span className="drop_body">{item.body}</span> : null }
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}


Dropdown.propTypes = {
  onSelect: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
  noBackground: PropTypes.bool,
};

export default Dropdown;
