export const parseId = (id: string, entityName = "Entity") => {
  const parsedId = Number(id);

  if (!Number.isInteger(parsedId) || parsedId <= 0) {
    throw new Error(`Invalid ${entityName} id`);
  }

  return parsedId;
};
