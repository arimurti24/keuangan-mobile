import React, { createContext, useState, useContext } from 'react';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const [dataTransaction, setDataTransaction] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const updateDataTransaction = (newData) => {
    setDataTransaction(newData);
  };

  return (
    <DataContext.Provider value={{ dataTransaction, updateDataTransaction, refreshing,setRefreshing}}>
      {children}
    </DataContext.Provider>
  );
};
