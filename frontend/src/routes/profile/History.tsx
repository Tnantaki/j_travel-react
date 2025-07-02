import { AxiosError, isAxiosError } from "axios";
import { useState, useEffect } from "react";
import bookingService, { Booking } from "../../services/booking-service";
import BookingList from "./BookingList";

const History = () => {
  const [books, setBooks] = useState<Booking[]>([]);

  useEffect(() => {
    const { request, cancel } = bookingService.getAll();

    const reqBookings = async () => {
      try {
        const res = await request;
        const data = res.data;

        if (!data) {
          return console.log(res);
        }
        const completedBooks = data.filter(book => book.status === 'completed')

        setBooks(completedBooks);
      } catch (error: any | AxiosError) {
        if (isAxiosError(error)) {
          if (error.response) {
            console.log(error.response.data);
          }
        } else {
          console.log(error.response.data);
        }
      }
    };

    reqBookings();
    return () => {
      cancel();
    };
  }, []);


  return (
    <BookingList books={books} />
    // <div className="flex flex-col w-full profile-layout p-6 gap-4 h-full">
    //   <table>
    //     <thead className="font-medium body1 border-b-1 border-primary/40">
    //       <tr>
    //         {columns.map((c, idx) => (
    //           <th key={idx} className="py-2">{c}</th>
    //         ))}
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {datas.map((data, idx) => (
    //         <tr key={idx} className="text-center *:py-2">
    //           <td>{idx + 1}</td>
    //           <td className="flex flex-row gap-2">
    //             <img className="size-16 rounded-sm" src={data.package} alt="location image" />
    //             {data.name}
    //           </td>
    //           <td>{data.members}</td>
    //           <td>{data.date}</td>
    //         </tr>
    //       ))}
    //     </tbody>
    //   </table>
    // </div>
  );
};

export default History;
