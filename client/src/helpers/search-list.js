const searchList = (list = [], searchValue = '') => {
  const searchValueList = searchValue
    .split(' ')
    .filter((e) => String(e).trim())
    .map((e) => e.toLowerCase());
  if (!searchValue) return list;
  return list.filter((item) => {
    return (
      item.name.english.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0 ||
      searchValueList.every(
        (searchType) => item.type.map((t) => t.toLowerCase()).indexOf(searchType) >= 0,
      )
    );
  });
};
export default searchList;
