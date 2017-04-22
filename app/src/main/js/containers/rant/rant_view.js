import React from 'react';
import STATE from '../../consts/state';
import RantCard from '../rant/rant_card';
import RantItem from '../rant/rant_item';

export function filterDuplicate(rants, newRants) {
//   if (!rants) return newRants;
  // let temp = [];
  // for (i in rants) {
  //     temp.push()
  // }
  const ids = [];
  rants.map(rs => rs.map(r => ids.push(r.id)));
  return newRants.filter(rant => ids.indexOf(rant.id) === -1);
}

export function basicRantView(rants) {
  if (rants.state === STATE.LOADING && rants.currentRants.length === 0) {
    return (
      <div style={{ display: 'flex' }}>
        <div id="loaderCont" >
          <div className="loader" id="loader1" />
          <div className="loader" id="loader2" />
        </div>
      </div>
    );
  }
  return (
    <div>
      <RantItem />
      <div className="row rantContainer" >
        {
        rants.currentRants.map((currentRants, index) => {
          const key = `column${index}`;
          return (
            <div className="rants col s6" id={key} key={key} >
              {
                currentRants.map(rant => <RantCard rant={rant} key={rant.id} />)
              }
            </div>
          );
        })
        }
      </div>
    </div>
  );
}
