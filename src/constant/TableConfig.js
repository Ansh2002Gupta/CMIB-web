// export const getSortedData = ({
//   sortKeyName,
//   direction,
//   setSortByNameObj,
//   setSortByCreatedAtObj,
// }) => {
//   fetchData({
//     queryParamsObject: {
//       perPage: pageSize,
//       page: current,
//       q: searchedValue,
//       queryType: filterArray,
//       sortDirection: toggleSorting(direction),
//       sortField: sortKeyName,
//     },
//     onSuccessCallback: () => {
//       setSearchParams((prevValue) => {
//         prevValue.set(
//           SORTING_QUERY_PARAMS.SORTED_DIRECTION,
//           toggleSorting(direction)
//         );
//         prevValue.set(SORTING_QUERY_PARAMS.SORTED_KEY, sortKeyName);
//         return prevValue;
//       });

//       setSortByName((prev) => {
//         return {
//           ...prev,
//           ...setSortByNameObj,
//         };
//       });

//       setSortByCreatedAt((prev) => {
//         return {
//           ...prev,
//           ...setSortByCreatedAtObj,
//         };
//       });
//     },
//   });
// };
