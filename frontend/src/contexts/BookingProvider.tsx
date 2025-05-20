import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useReducer,
} from "react";

interface BookingType {
  leaderId: string;
  planId: string;
  memberIds: string[];
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
  userId: string;
}

interface AddMember {
  type: "add_member";
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
        leaderId: book.leaderId,
        planId: action.planId,
        memberIds: book.memberIds,
        groupId: book.groupId,
        startDate: book.startDate,
        endDate: book.endDate,
      };
    case "add_leader":
      return {
        leaderId: action.userId,
        planId: book.planId,
        memberIds: book.memberIds,
        groupId: book.groupId,
        startDate: book.startDate,
        endDate: book.endDate,
      };
    case "add_member":
      return {
        leaderId: book.leaderId,
        planId: book.planId,
        memberIds: [...book.memberIds, action.memberId],
        groupId: book.groupId,
        startDate: book.startDate,
        endDate: book.endDate,
      };
    case "add_groupId":
      return {
        leaderId: book.leaderId,
        planId: book.planId,
        memberIds: book.memberIds,
        groupId: action.groupId,
        startDate: book.startDate,
        endDate: book.endDate,
      };
    case "select_date":
      return {
        leaderId: book.leaderId,
        planId: book.planId,
        memberIds: book.memberIds,
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
    leaderId: "",
    memberIds: [],
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
  | AddGroup
  | SelectDate;
export const useBooking = () => useContext(BookingContext);
export default BookingProvider;
