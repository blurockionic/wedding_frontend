import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    category: "Venue & Decorations",
    items: [
      { name: "Book the wedding venue", done: false },
      { name: "Confirm the capacity and amenities of the venue", done: false },
      { name: "Select a theme for decorations", done: false },
      { name: "Hire a wedding decorator", done: false },
      { name: "Rent furniture, lighting, and props", done: false },
      { name: "Confirm tent house arrangements", done: false },
      { name: "Book florists for floral arrangements", done: false },
    ],
  },
  {
    category: "Catering & Cakes",
    items: [
      { name: "Shortlist catering services", done: false },
      { name: "Finalize the menu", done: false },
      { name: "Schedule food tasting with caterers", done: false },
      { name: "Decide on beverages", done: false },
      { name: "Order the wedding cake", done: false },
    ],
  },
  {
    category: "Photography & Videography",
    items: [
      { name: "Hire photographers (traditional and candid)", done: false },
      { name: "Hire videographers for event coverage", done: false },
      { name: "Book a photobooth with props", done: false },
      { name: "Discuss pre-wedding shoot requirements", done: false },
      { name: "Confirm delivery timeline for photos and videos", done: false },
    ],
  },
  {
    category: "Music & Entertainment",
    items: [
      { name: "Book a wedding DJ or live band", done: false },
      { name: "Choose the type of music for each function", done: false },
      { name: "Plan entertainment performances", done: false },
      { name: "Arrange sound and lighting equipment", done: false },
    ],
  },
  {
    category: "Invitations & Gifts",
    items: [
      { name: "Finalize the design of wedding invitations", done: false },
      { name: "Choose digital or printed invitations", done: false },
      { name: "Order wedding gifts or return favors", done: false },
      { name: "Create a guest list and send out invitations", done: false },
    ],
  },
  {
    category: "Transport & Logistics",
    items: [
      { name: "Book transportation for the wedding party and guests", done: false },
      { name: "Arrange parking space at the venue", done: false },
      { name: "Plan transportation for out-of-town guests", done: false },
    ],
  },
  {
    category: "Religious & Cultural Services",
    items: [
      { name: "Book a pandit or religious officiant", done: false },
      { name: "Arrange for pooja items or ceremony essentials", done: false },
      { name: "Consult astrologers (if required for muhurat or compatibility checks)", done: false },
    ],
  },
  {
    category: "Planning & Coordination",
    items: [
      { name: "Hire a wedding planner or coordinator", done: false },
      { name: "Prepare a timeline for each event", done: false },
      { name: "Assign point-of-contact roles to key people", done: false },
      { name: "Schedule vendor meetings and walkthroughs", done: false },
    ],
  },
  {
    category: "Miscellaneous",
    items: [
      { name: "Arrange for a bridal makeup artist and hairstylist", done: false },
      { name: "Confirm the attire for bride, groom, and close family members", done: false },
      { name: "Prepare an emergency kit", done: false },
      { name: "Ensure backup power or generators at the venue", done: false },
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
            items: [...category.items, { name: itemName, done: false }],
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
      return action.payload; // Replaces the entire checklist state
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
      return state.filter(category => category.category !== categoryTitle);
    },
  }
});

export const { toggleItemState, addItem, removeItem, setChecklist, addCategory, removeCategory } = checklistSlice.actions;
export default checklistSlice;
