import { create, StateCreator } from "zustand";
import { QRCode } from "@prisma/client";
import { getQRCodeList } from "../actions/getQRCodeList";
import { fetchSingleLink } from "@/app/[locale]/actions/fetchSingleLink";
import { devtools } from "zustand/middleware";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Session } from "next-auth";

interface QRCodeStore {
  qrCodes: QRCode[];
  isLoading: boolean;
  error: string | null;
  fetchQRCodeList: (userId: string) => Promise<void>;
  reset: () => void;
}

const createQRCodeStore: StateCreator<QRCodeStore> = (set) => ({
  qrCodes: [],
  isLoading: false,
  error: null,
  fetchQRCodeList: async (userId: string) => {
    set({ isLoading: true, error: null });

    try {
      const qrCodes = await getQRCodeList({ userId });
      set({ qrCodes });
    } catch (error) {
      set({
        qrCodes:[],
        error:
          error instanceof Error ? error.message : "Failed to fetch QR codes",
      });
    } finally {
      set({ isLoading: false });
    }
  },
  reset: () => set({ qrCodes: [], isLoading: false, error: null }),
});

export const useQRCodeStore = create<QRCodeStore>()(
  devtools(createQRCodeStore, { name: "qr-code-store" })
);
