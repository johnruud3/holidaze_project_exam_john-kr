import type { Venue } from "./venues";

export type HolidazeProfile = {
  name: string;
  email: string;
  bio?: string;
  avatar?: { url: string; alt?: string };
  banner?: { url: string; alt?: string };
  venueManager?: boolean;
  venues?: Venue[];
  _count?: { venues?: number; bookings?: number };
};

export type HolidazeProfileResponse = {
  data: HolidazeProfile;
  meta: Record<string, unknown>;
};
