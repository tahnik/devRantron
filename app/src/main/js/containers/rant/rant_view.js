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
