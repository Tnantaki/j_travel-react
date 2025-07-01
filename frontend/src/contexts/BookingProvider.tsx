import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useReducer,
} from "react";

export interface SearchedMemberType {
  id: string;
  name: string;
  email: string;
}

interface BookingType {
  leader: SearchedMemberType | undefined;
  planId: string;
  members: SearchedMemberType[];
  groupId: string;
  startDate: Date | undefined;
  endDate: Date | undefined;
}

// Reducer
interface AddPlan {
  type: "add_plan";
  planId: string;
}

interface AddLeader {
  type: "add_leader";
  leader: SearchedMemberType;
}

interface AddMember {
  type: "add_member";
  member: SearchedMemberType;
}

interface DelMember {
  type: "del_member";
  memberId: string;
}

interface AddGroup {
  type: "add_groupId";
  groupId: string;
}

interface SelectDate {
  type: "select_date";
  startDate: Date;
  endDate: Date;
}

const bookingReducer = (
  book: BookingType,
  action: BookingAction
): BookingType => {
  switch (action.type) {
    case "add_plan":
      return {
        leader: book.leader,
        planId: action.planId,
        members: book.members,
        groupId: book.groupId,
        startDate: book.startDate,
        endDate: book.endDate,
      };
    case "add_leader":
      return {
        leader: action.leader,
        planId: book.planId,
        members: book.members,
        groupId: book.groupId,
        startDate: book.startDate,
        endDate: book.endDate,
      };
    case "add_member":
      return {
        leader: book.leader,
        planId: book.planId,
        members: [...book.members, action.member],
        groupId: book.groupId,
        startDate: book.startDate,
        endDate: book.endDate,
      };
    case "del_member":
      return {
        leader: book.leader,
        planId: book.planId,
        members: book.members.filter((member) => member.id !== action.memberId),
        groupId: book.groupId,
        startDate: book.startDate,
        endDate: book.endDate,
      };
    case "add_groupId":
      return {
        leader: book.leader,
        planId: book.planId,
        members: book.members,
        groupId: action.groupId,
        startDate: book.startDate,
        endDate: book.endDate,
      };
    case "select_date":
      return {
        leader: book.leader,
        planId: book.planId,
        members: book.members,
        groupId: book.groupId,
        startDate: action.startDate,
        endDate: action.endDate,
      };
  }
};

// Context
interface BookingContextType {
  booking: BookingType;
  bookDispatch: Dispatch<BookingAction>;
}

const BookingContext = createContext<BookingContextType>(
  {} as BookingContextType
);

// Group Provider
interface Props {
  children: ReactNode;
}

const BookingProvider = ({ children }: Props) => {
  const [booking, bookDispatch] = useReducer(bookingReducer, {
    planId: "",
    leader: undefined,
    members: [],
    groupId: "",
    startDate: undefined,
    endDate: undefined,
  });

  return (
    <BookingContext.Provider value={{ booking, bookDispatch }}>
      {children}
    </BookingContext.Provider>
  );
};

export type BookingAction =
  | AddPlan
  | AddLeader
  | AddMember
  | DelMember
  | AddGroup
  | SelectDate;
export const useBooking = () => useContext(BookingContext);
export default BookingProvider;
