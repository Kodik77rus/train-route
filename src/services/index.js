export const getFileFromSrver = async (file) => {
  try {
    const response = await fetch(`http://localhost/${file}`);
    return await response.json();
  } catch (e) {
    return e;
  }
};
