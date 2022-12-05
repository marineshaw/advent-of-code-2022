export const deleteIndex = ({
  list,
  index,
}: {
  list: any[];
  index: number;
}) => {
  return list.slice(0, index).concat(list.slice(index + 1));
};
