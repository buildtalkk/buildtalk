// StateContext.js
import { createContext, useContext, useState } from "react";

type BuildingInfo = {
  address: string;
  usage: string;
  mechanicalParking: string;
  selfParking: string;
  sewageTreatmentFacility: string;
};

interface State {
  floorInfo: any;
  setFloorInfo: (i: any) => void;
  buildingInfo: BuildingInfo | null;
  setBuildingInfo: (i: BuildingInfo) => void;
}

const StateContext = createContext<State>({} as State);

export const StateProvider = ({ children }: { children: React.ReactNode }) => {
  const [floorInfo, setFloorInfo] = useState(null);
  const [buildingInfo, setBuildingInfo] = useState<BuildingInfo | null>(null);

  return (
    <StateContext.Provider
      value={{
        floorInfo,
        setFloorInfo,
        buildingInfo,
        setBuildingInfo,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
