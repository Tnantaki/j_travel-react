import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useReducer,
} from "react";
import { GroupType } from "../services/group-service";

// Reducer
interface AddPlan {
  type: "add_plan";
  planId: string;
}

interface AddLeader {
  type: "add_leader";
  userId: string;
}

interface AddMember {
  type: "add_member";
  memberId: string;
}

const groupReducer = (group: GroupType, action: GroupAction): GroupType => {
  switch (action.type) {
    case "add_plan":
      return {
        leader: group.leader,
        members: group.members,
        plan: action.planId,
      };
    case "add_leader":
      return {
        leader: action.userId,
        members: group.members,
        plan: group.plan,
      };
    case "add_member":
      return {
        leader: group.leader,
        members: [...group.members, action.memberId],
        plan: group.plan,
      };
  }
};

// Context
interface GroupContextType {
  group: GroupType;
  dispatchGroup: Dispatch<GroupAction>;
}

const GroupContext = createContext<GroupContextType>({} as GroupContextType);

// Group Provider
interface Props {
  children: ReactNode;
}

const GroupProvider = ({ children }: Props) => {
  const [group, dispatchGroup] = useReducer(groupReducer, {
    plan: "",
    leader: "",
    members: [],
  });

  return (
    <GroupContext.Provider value={{ group, dispatchGroup }}>
      {children}
    </GroupContext.Provider>
  );
};

export type GroupAction = AddPlan | AddLeader | AddMember;
export const useGroup = () => useContext(GroupContext);
export default GroupProvider;
