import { create } from "zustand";

const useStore = create((set, get) => ({
  chatRooms: JSON.parse(localStorage.getItem("chatRooms")) || [],
  chatId: null,
  pdfName: "",
  chatRoomsRecord: [],
  addNewChatRoom: (id, name) =>
    set((state) => {
      const newChatRoom = { id, name: name || "New ChatRoom" };
      const updatedChatRooms = [...get().chatRooms, newChatRoom];
      localStorage.setItem("chatRooms", JSON.stringify(updatedChatRooms));
      set({ chatRooms: updatedChatRooms, chatId: id });
      return { chatRooms: [...state.chatRooms, newChatRoom], chatId: id };
    }),
  setChatId: (id) => set({ chatId: id }),
  setPDFName: (name) => set({ pdfName: name }),
  PDFtoString: "",
  setPDFtoString: (string) => set({ PDFtoString: string }),
}));

export default useStore;
