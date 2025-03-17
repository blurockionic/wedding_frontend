const sampleData = [
    {
    eventName: "Biruly's Wedding",
    eventDescription: "A beautiful wedding ceremony in New York.",
    eventDate: "2025-06-15T00:00:00.000Z",
    eventStartTime: "2025-06-15T14:00:00.000Z",
    eventEndTime: "2025-06-15T20:00:00.000Z",
    eventBudget: "50000",
    eventTask: [
      {
        id: "1",
        items: {
          task: "Book farm house",
          status: "pending",
          dueDate: "2024-09-30",
        },
      },
    ],
    subEvent: [
      {
        subEventName: "Wedding party",
        subEventDescription: "A grand wedding reception with dinner and music.",
        subEventBudget: "5000",
        subEventDate: "2025-06-15T18:00:00.000Z",
        subEventStartTime: "2025-06-15T14:00:00.000Z",
        subEventEndTime: "2025-06-15T20:00:00.000Z",
        subEventTask: [
          {
            id: "2",
            items: {
              task: "Book venues in Ranchi",
              status: "pending",
              dueDate: "2024-09-30",
            },
          },
        ],
      },
    ],
  },
  {
    eventName: "Biruly's Wedding",
    eventDescription: "A beautiful wedding ceremony in New York.",
    eventDate: "2025-06-15T00:00:00.000Z",
    eventStartTime: "2025-06-15T14:00:00.000Z",
    eventEndTime: "2025-06-15T20:00:00.000Z",
    eventBudget: "50000",
    eventTask: [
      {
        id: "1",
        items: {
          task: "Book farm house",
          status: "pending",
          dueDate: "2024-09-30",
        },
      },
    ],
    subEvent: [
      {
        subEventName: "Wedding party",
        subEventDescription: "A grand wedding reception with dinner and music.",
        subEventBudget: "5000",
        subEventDate: "2025-06-15T18:00:00.000Z",
        subEventStartTime: "2025-06-15T14:00:00.000Z",
        subEventEndTime: "2025-06-15T20:00:00.000Z",
        subEventTask: [
          {
            id: "2",
            items: {
              task: "Book venues in Ranchi",
              status: "pending",
              dueDate: "2024-09-30",
            },
          },
        ],
      },
    ],
  },
]
  
  export default sampleData;
  