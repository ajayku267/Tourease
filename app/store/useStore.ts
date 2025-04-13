import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: string;
  name: string;
  email: string;
  photoURL?: string;
}

interface Trip {
  id: string;
  title: string;
  destination: string;
  startDate: string;
  endDate: string;
  budget: number;
  description?: string;
  userId: string;
  createdAt: string;
}

interface AppState {
  user: User | null;
  trips: Trip[];
  isLoading: boolean;
  error: string | null;
  setUser: (user: User | null) => void;
  setTrips: (trips: Trip[]) => void;
  addTrip: (trip: Trip) => void;
  updateTrip: (trip: Trip) => void;
  deleteTrip: (id: string) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      user: null,
      trips: [],
      isLoading: false,
      error: null,
      setUser: (user) => set({ user }),
      setTrips: (trips) => set({ trips }),
      addTrip: (trip) =>
        set((state) => ({ trips: [...state.trips, trip] })),
      updateTrip: (trip) =>
        set((state) => ({
          trips: state.trips.map((t) =>
            t.id === trip.id ? trip : t
          ),
        })),
      deleteTrip: (id) =>
        set((state) => ({
          trips: state.trips.filter((t) => t.id !== id),
        })),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
    }),
    {
      name: "tourease-storage",
    }
  )
); 