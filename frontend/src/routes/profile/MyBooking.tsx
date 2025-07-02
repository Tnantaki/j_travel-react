import { useEffect, useState } from "react";
import bookingService, { Booking } from "../../services/booking-service";
import { AxiosError, isAxiosError } from "axios";
import BookingList from "./BookingList";

const MyBooking = () => {
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

        setBooks(data);
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

  return <BookingList books={books} />;
};

export default MyBooking;
