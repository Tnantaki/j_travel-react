import senso from "@img/location/senso-ji-temple-tokyo.png";
import osaka from "@img/location/Osaka-Castle-osaka.png";

const History = () => {
  const columns = ["No.", "Package", "Members", "Date"];

  const datas = [
    {
      package: senso,
      name: "Senso-ji Temple, Tokyo",
      members: 5,
      date: "14 Feb 2024 - 17 Feb 2024 ",
    },
    {
      package: osaka,
      name: "Osaka Castle, Osaka",
      members: 2,
      date: "5 Nov 2025 - 9 Nov 2025 ",
    },
  ];

  return (
    <div className="flex flex-col w-full profile-layout p-6 gap-4 h-full">
      <h4>Booking History</h4>
      <table>
        <thead className="font-medium body1 border-b-1 border-primary/40">
          <tr>
            {columns.map((c, idx) => (
              <th key={idx} className="py-2">{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {datas.map((data, idx) => (
            <tr key={idx} className="text-center *:py-2">
              <td>{idx + 1}</td>
              <td className="flex flex-row gap-2">
                <img className="size-16 rounded-sm" src={data.package} alt="location image" />
                {data.name}
              </td>
              <td>{data.members}</td>
              <td>{data.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default History;
