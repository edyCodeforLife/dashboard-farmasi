export const SetStorage = (key: string, value: string) => {
  try {
    localStorage.setItem(key, value);
  } catch (e: any) {
    //
  }
};

export const GetStorage = (key: string) => {
  try {
    return localStorage.getItem(key);
  } catch (e: any) {
    return null;
  }
};

export const RemoveStorage = (key: string) => {
  try {
    localStorage.removeItem(key);
  } catch (e: any) {
    //
  }
};
