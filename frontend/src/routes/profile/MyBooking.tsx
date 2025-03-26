import kinkakuji from "@img/location/kinkakuji-temple-kyoto.png";

const MyBooking = () => {
  const books = [
    {
      package: "Kinkaku-ji Temple (Golden Pavilion), Kyoto",
      image: kinkakuji,
      member: 3,
      date: "28 Aug 2025 - 31 Aug 2025 ",
      status: "Waiting for confirm",
    },
  ];

  return (
    <div className="flex flex-col w-full profile-layout p-6 gap-4 h-full">
      <h4>My Booking</h4>
      <ul className="flex flex-col p-2">
        {books.map((book, idx) => (
          <li
            key={idx}
            className="bg-frame-sec border-1 border-slate-400 flex flex-col px-6 py-4 rounded-md"
          >
            <p className="body1 font-medium border-b-1 border-primary/20 py-2">
              {book.package}
            </p>
            <div className="flex justify-between mt-3">
              <div className="flex flex-row gap-3">
                <img className="size-20  rounded-sm" src={book.image} />
                <div className="flex flex-col justify-between">
                  <div className="flex items-center">
                    <p className="body3 text-char-pri-tint me-1">member:</p>
                    <p className="body2 text-char-pri">{book.member}</p>
                  </div>
                  <div className="flex items-center">
                    <p className="body3 text-char-pri-tint me-1">date:</p>
                    <p className="body2 text-char-pri">{book.date}</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-between">
                <div className="flex items-center">
                  <p className="body3 text-char-pri-tint me-1">status:</p>
                  <p className="body2 text-char-pri">{book.status}</p>
                </div>
                <a href="#" className="body3 text-char-pri self-end">
                  View more detail
                </a>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyBooking;
