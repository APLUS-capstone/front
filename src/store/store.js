import { create } from "zustand";

const useStore = create((set) => ({
  chatRooms: [],
  chatId: null,
  addNewChatRoom: (id, name) =>
    set((state) => {
      const newChatRoom = { id, name: name || "New ChatRoom" };
      return { chatRooms: [...state.chatRooms, newChatRoom], chatId: id };
    }),
  setChatId: (id) => set({ chatId: id }),
  PDFtoString: "",
  setPDFtoString: (string) => set({ PDFtoString: string }),
}));

export default useStore;
