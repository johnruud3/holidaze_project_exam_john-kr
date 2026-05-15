// Register user types

export type RegisterUserT = {
  name: string;
  email: string;
  password: string;
  bio: string;
  avatar?: {
    url: string;
    alt?: string;
  };
  banner?: {
    url: string;
    alt?: string;
  };
  venueManager: boolean;
};

// Register user response types

export type RegisterResponse = {
  data: {
    name: string;
    email: string;
    bio?: string;
    avatar?: { url: string; alt?: string };
    banner?: { url: string; alt?: string };
    venueManager?: boolean;
  };
  meta: Record<string, unknown>;
};

// Login user types

export type LoginUserT = {
  email: string;
  password: string;
};

// Login user Response types

export type LoginResponse = {
  data: {
    name: string;
    email: string;
    avatar?: { url: string; alt?: string };
    banner?: { url: string; alt?: string };
    accessToken: string;
    venueManager?: boolean;
  };
  meta: Record<string, unknown>;
};
