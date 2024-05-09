
import { ElderAuthContext } from "../context/authContextElder";
import { useContext } from "react";

export const useEldersAuthContext = () => {
    const context = useContext(ElderAuthContext);

    if (!context) {
        throw Error('authContextElder must be used inside a authContextElder');
    }

    return context;
};