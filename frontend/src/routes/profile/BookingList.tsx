import { useState } from "react";
import { Booking } from "../../services/booking-service";
import ModalBookingInfo from "../../components/modals/ModalBookingInfo";
import Status from "../../components/common/Status";
import placeHolder from "@img/background/placeholder-image.jpg";

interface Props {
  books: Booking[];
  updatedBooks?: () => void
}

const BookingList = ({ books, updatedBooks }: Props) => {
  const [currentBook, setCurrentBook] = useState<Booking>();
  const [isOpenModalBook, setIsOpenModalBook] = useState<boolean>(false);

  const handleViewMore = (book: Booking) => {
    setCurrentBook(book);
    setIsOpenModalBook(true);
  };

  return (
    <div className="flex flex-col grow-1 w-full profile-layout p-6 gap-4">
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
                  src={
                    book.plan.images.length
                      ? book.plan.images[0].imageUrl
                      : placeHolder
                  }
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
                      {new Date(book.firstDay).toISOString().split("T")[0] +
                        " - " +
                        new Date(book.lastDay).toISOString().split("T")[0]}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-between">
                <div className="flex items-center">
                  <p className="body3 text-char-pri-tint me-1">status:</p>
                  <Status status={book.status} />
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
          // bookingId={currentBook._id}
          book={currentBook}
          isOpen={isOpenModalBook}
          onClose={() => setIsOpenModalBook(false)}
          updatedBooks={updatedBooks}
        />
      )}
    </div>
  );
};

export default BookingList;
