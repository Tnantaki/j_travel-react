import { useEffect, useState } from "react";
import bookingService, { Booking } from "../../services/booking-service";
import { AxiosError, AxiosResponse, isAxiosError } from "axios";
import BookingList from "./BookingList";

const MyBooking = () => {
  const [books, setBooks] = useState<Booking[]>([]);

  const reqBookings = async (
    request: Promise<AxiosResponse<Booking[], any>>
  ) => {
    try {
      const res = await request;
      const data = res.data;

      if (!data) {
        return console.log(res);
      }
      const fillteredBooks = data.filter((book) => book.status !== "completed");

      setBooks(fillteredBooks);
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

  useEffect(() => {
    const { request, cancel } = bookingService.getAll();

    reqBookings(request);
    return () => {
      cancel();
    };
  }, []);

  return (
    <BookingList
      books={books}
      updatedBooks={() => {
        reqBookings(bookingService.getAll().request)
        console.log('update')
      }}
    />
  );
};

export default MyBooking;
