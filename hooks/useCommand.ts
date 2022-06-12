import { CommandContext } from "contexts/CommandContext";
import { useContext } from "react";

export const useCommand = () => useContext(CommandContext);