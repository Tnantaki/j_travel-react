const startDate = [
  "2025-04-01",
  "2025-04-08",
  "2025-04-16",
  "2025-04-24",
  "2025-04-02",
];

const addDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

const datePackages = [
  {
    start: new Date(startDate[0]),
    end: addDays(new Date(startDate[0]), 5),
  },
  {
    start: new Date(startDate[1]),
    end: addDays(new Date(startDate[1]), 5),
  },
  {
    start: new Date(startDate[2]),
    end: addDays(new Date(startDate[2]), 5),
  },
  {
    start: new Date(startDate[3]),
    end: addDays(new Date(startDate[3]), 5),
  },
  {
    start: new Date(startDate[4]),
    end: addDays(new Date(startDate[4]), 5),
  },
];

// const datePackages = [
//   {
//     id: "osaka",
//     date: [
//       {
//         start: new Date(startDate[0]),
//         end: addDays(new Date(startDate[0]), 5),
//       },
//       {
//         start: new Date(startDate[1]),
//         end: addDays(new Date(startDate[1]), 5),
//       },
//       {
//         start: new Date(startDate[2]),
//         end: addDays(new Date(startDate[2]), 5),
//       },
//       {
//         start: new Date(startDate[3]),
//         end: addDays(new Date(startDate[3]), 5),
//       },
//       {
//         start: new Date(startDate[4]),
//         end: addDays(new Date(startDate[4]), 5),
//       },
//     ],
//   },
//   {
//     id: "kinkakuji",
//     date: [
//       {
//         start: new Date(startDate[0]),
//         end: addDays(new Date(startDate[0]), 5),
//       },
//       {
//         start: new Date(startDate[1]),
//         end: addDays(new Date(startDate[1]), 5),
//       },
//       {
//         start: new Date(startDate[2]),
//         end: addDays(new Date(startDate[2]), 5),
//       },
//       {
//         start: new Date(startDate[3]),
//         end: addDays(new Date(startDate[3]), 5),
//       },
//       {
//         start: new Date(startDate[4]),
//         end: addDays(new Date(startDate[4]), 5),
//       },
//     ],
//   },
//   {
//     id: "senso",
//     date: [
//       {
//         start: new Date(startDate[0]),
//         end: addDays(new Date(startDate[0]), 5),
//       },
//       {
//         start: new Date(startDate[1]),
//         end: addDays(new Date(startDate[1]), 5),
//       },
//       {
//         start: new Date(startDate[2]),
//         end: addDays(new Date(startDate[2]), 5),
//       },
//       {
//         start: new Date(startDate[3]),
//         end: addDays(new Date(startDate[3]), 5),
//       },
//       {
//         start: new Date(startDate[4]),
//         end: addDays(new Date(startDate[4]), 5),
//       },
//     ],
//   },
// ];

export default datePackages;
