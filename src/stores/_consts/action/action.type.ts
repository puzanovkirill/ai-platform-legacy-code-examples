type TAction<T> = {
  payload: T;
  type: string;
};

export default TAction;
