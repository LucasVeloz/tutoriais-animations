import axios from "axios";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useWindowDimensions } from "react-native";

export type ItemType = {
  avatar_url: string;
  login: string;
  id: number;
}

interface GlobalCTXProps {
  data: ItemType[];
  selectedIndex: number;
  selectedID: number;
  updateSelectedID: (x?: number, id?: number) => void;
}


interface Props {
  children: ReactNode;
}

const globalCTX = createContext({} as GlobalCTXProps);


const URL = 'https://api.github.com/users';


export const GlobalProvider = ({ children }: Props) => {
  const [data, setData] = useState<ItemType[]>([]);
  const [selectedID, setSelectedID] = useState(-1);
  const { width } = useWindowDimensions();

  const selectedIndex = data.findIndex(item => item.id === selectedID);

  const updateSelectedID = (x?: number, id?: number) => {
    if (x && x > -1) {
      const id = data[x/width].id;
      setSelectedID(id)
    } else if (id && id > -1) {
      setSelectedID(id)
    }
  }



  useEffect(() => {
    (async () => {
      const { data: me } = await axios.get(`${URL}/LucasVeloz`);
      const { data } = await axios.get(URL);
      const formattedData = [me, ...data];
      setData(formattedData);
    })()
  }, [])

  return (
    <globalCTX.Provider value={{ data, selectedIndex, selectedID, updateSelectedID }}>
      {children}
    </globalCTX.Provider>
  )
}

export const useGlobalCTX = () => {
  const ctx = useContext(globalCTX);
  if (!ctx) throw new Error('Deu ruim');
  return ctx;
}
