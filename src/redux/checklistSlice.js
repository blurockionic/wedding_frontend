import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    category: "Venue & Decorations",
    items: [
      { name: "Book the wedding venue", done: false, scheduleDate: null },
      { name: "Confirm the capacity and amenities of the venue", done: false, scheduleDate: null },
      { name: "Select a theme for decorations", done: false, scheduleDate: null },
      { name: "Hire a wedding decorator", done: false, scheduleDate: null },
      { name: "Rent furniture, lighting, and props", done: false, scheduleDate: null },
      { name: "Confirm tent house arrangements", done: false, scheduleDate: null },
      { name: "Book florists for floral arrangements", done: false, scheduleDate: null },
    ],
  },
  {
    category: "Catering & Cakes",
    items: [
      { name: "Shortlist catering services", done: false, scheduleDate: null },
      { name: "Finalize the menu", done: false, scheduleDate: null },
      { name: "Schedule food tasting with caterers", done: false, scheduleDate: null },
      { name: "Decide on beverages", done: false, scheduleDate: null },
      { name: "Order the wedding cake", done: false, scheduleDate: null },
    ],
  },
  {
    category: "Photography & Videography",
    items: [
      { name: "Hire photographers (traditional and candid)", done: false, scheduleDate: null },
      { name: "Hire videographers for event coverage", done: false, scheduleDate: null },
      { name: "Book a photobooth with props", done: false, scheduleDate: null },
      { name: "Discuss pre-wedding shoot requirements", done: false, scheduleDate: null },
      { name: "Confirm delivery timeline for photos and videos", done: false, scheduleDate: null },
    ],
  },
  {
    category: "Music & Entertainment",
    items: [
      { name: "Book a wedding DJ or live band", done: false, scheduleDate: null },
      { name: "Choose the type of music for each function", done: false, scheduleDate: null },
      { name: "Plan entertainment performances", done: false, scheduleDate: null },
      { name: "Arrange sound and lighting equipment", done: false, scheduleDate: null },
    ],
  },
  {
    category: "Invitations & Gifts",
    items: [
      { name: "Finalize the design of wedding invitations", done: false, scheduleDate: null },
      { name: "Choose digital or printed invitations", done: false, scheduleDate: null },
      { name: "Order wedding gifts or return favors", done: false, scheduleDate: null },
      { name: "Create a guest list and send out invitations", done: false, scheduleDate: null },
    ],
  },
  {
    category: "Transport & Logistics",
    items: [
      { name: "Book transportation for the wedding party and guests", done: false, scheduleDate: null },
      { name: "Arrange parking space at the venue", done: false, scheduleDate: null },
      { name: "Plan transportation for out-of-town guests", done: false, scheduleDate: null },
    ],
  },
  {
    category: "Religious & Cultural Services",
    items: [
      { name: "Book a pandit or religious officiant", done: false, scheduleDate: null },
      { name: "Arrange for pooja items or ceremony essentials", done: false, scheduleDate: null },
      { name: "Consult astrologers", done: false, scheduleDate: null },
    ],
  },
  {
    category: "Planning & Coordination",
    items: [
      { name: "Hire a wedding planner or coordinator", done: false, scheduleDate: null },
      { name: "Prepare a timeline for each event", done: false, scheduleDate: null },
      { name: "Assign point-of-contact roles to key people", done: false, scheduleDate: null },
      { name: "Schedule vendor meetings and walkthroughs", done: false, scheduleDate: null },
    ],
  },
  {
    category: "Miscellaneous",
    items: [
      { name: "Arrange for a bridal makeup artist and hairstylist", done: false, scheduleDate: null },
      { name: "Confirm the attire for bride, groom, and close family members", done: false, scheduleDate: null },
      { name: "Prepare an emergency kit", done: false, scheduleDate: null },
      { name: "Ensure backup power or generators at the venue", done: false, scheduleDate: null },
    ],
  },
];

const checklistSlice = createSlice({
  name: "checklist",
  initialState,
  reducers: {
    toggleItemState: (state, action) => {
      const { categoryTitle, itemIndex } = action.payload;
      return state.map((category) => {
        if (category.category === categoryTitle) {
          return {
            ...category,
            items: category.items.map((item, index) =>
              index === itemIndex ? { ...item, done: !item.done } : item
            ),
          };
        }
        return category;
      });
    },
    addItem: (state, action) => {
      const { categoryTitle, itemName } = action.payload;
      return state.map((category) => {
        if (category.category === categoryTitle) {
          return {
            ...category,
            items: [...category.items, { name: itemName, done: false, scheduleDate: null }],
          };
        }
        return category;
      });
    },
    removeItem: (state, action) => {
      const { categoryTitle, itemIndex } = action.payload;
      return state.map((category) => {
        if (category.category === categoryTitle) {
          return {
            ...category,
            items: category.items.filter((_, index) => index !== itemIndex),
          };
        }
        return category;
      });
    },
    setChecklist: (state, action) => {
      return action.payload;
    },

    addCategory: (state, action) => {
      const { categoryTitle } = action.payload;
      const categoryExists = state.some(category => category.category === categoryTitle);
      if (!categoryExists) {
        state.push({ category: categoryTitle, items: [] });
      }
    },

    removeCategory: (state, action) => {
      const { categoryTitle } = action.payload;
      const tempState = state.filter(category => category.category !== categoryTitle)
      return tempState;
    },

    setScheduleDate: (state, action) => {
        const { categoryTitle, itemIndex, date } = action.payload;
        return state.map((category) => {
            if (category.category === categoryTitle) {
                return {
                    ...category,
                    items: category.items.map((item, index) =>
                        index === itemIndex ? { ...item, scheduleDate: date } : item
                    ),
                };
            }
            return category;
        });
    },
  },
});

export const {
  toggleItemState,
  addItem,
  removeItem,
  setChecklist,
  addCategory,
  removeCategory,
  setScheduleDate,
} = checklistSlice.actions;

export default checklistSlice;