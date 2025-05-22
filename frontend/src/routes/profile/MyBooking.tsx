import { useEffect, useState } from "react";
import bookingService, { BookingType } from "../../services/booking-service";
import ModalBookingInfo from "../../components/modals/ModalBookingInfo";

// const bookings = [
//   {
//     package: "Kinkaku-ji Temple (Golden Pavilion), Kyoto",
//     image: kinkakuji,
//     member: 3,
//     date: "28 Aug 2025 - 31 Aug 2025 ",
//     status: "Waiting for confirm",
//   },
// ];

const MyBooking = () => {
  const [books, setBooks] = useState<BookingType[]>([]);
  const [currentBook, setCurrentBook] = useState<BookingType>();
  const [isOpenModalBook, setIsOpenModalBook] = useState<boolean>(false);

  useEffect(() => {
    const { request, cancel } = bookingService.getBooking();

    const reqBookings = async () => {
      try {
        const res = await request;
        const data = res.data;

        if (!data) {
          return console.log(res);
        }

        setBooks(
          data.map((book) => ({
            ...book,
            firstDay: new Date(book.firstDay),
            lastDay: new Date(book.lastDay),
          }))
        );
      } catch (error: any) {
        console.log(error);
      }
    };
    reqBookings();
    return () => {
      cancel();
    };
  }, []);

  const handleViewMore = (book: BookingType) => {
    setCurrentBook(book);
    setIsOpenModalBook(true)
  };

  return (
    <div className="flex flex-col grow-1 w-full profile-layout p-6 gap-4">
      {/* <h4>My Booking</h4> */}
      <ul className="flex flex-col gap-4 p-2">
        {books.map((book) => (
          <li
            key={book._id}
            className="bg-slate-300 border-1 border-slate-400 flex flex-col px-6 py-4 rounded-md"
          >
            <p className="body1 font-medium border-b-1 border-primary/20 py-2">
              {book.plan.title}
            </p>
            <div className="flex justify-between mt-3 gap-2">
              <div className="flex flex-row gap-2">
                <img
                  className="size-20 shrink-0 rounded-sm"
                  src={book.plan.image}
                />
                <div className="flex flex-col justify-between">
                  <div className="flex items-center">
                    <p className="indent-4 pb-2">{book.plan.description}</p>
                  </div>
                  <div className="flex items-center">
                    <p className="body3 text-char-pri-tint me-1">member:</p>
                    <p className="body2 text-char-pri">
                      {book.group.members.length + 1}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <p className="body3 text-char-pri-tint me-1">date:</p>
                    <p className="body2 text-char-pri">
                      {book.firstDay.toISOString().split("T")[0] +
                        " - " +
                        book.lastDay.toISOString().split("T")[0]}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-between">
                <div className="flex items-center">
                  <p className="body3 text-char-pri-tint me-1">status:</p>
                  <p className="body2 text-char-pri">{book.status}</p>
                </div>
                <button
                  className="body3 text-char-pri self-end hover:underline hover:cursor-pointer"
                  onClick={() => handleViewMore(book)}
                >
                  View more detail
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      {currentBook && (
        <ModalBookingInfo
          book={currentBook}
          isOpen={isOpenModalBook}
          onClose={() => setIsOpenModalBook(false)}
        />
      )}
    </div>
  );
};

export default MyBooking;
