// copied from class code
type DatabaseConstraintError = {
  type: 'unique' | 'check' | 'not null' | 'foreign key' | 'unknown';
  columnName?: string;
  message?: string;
};

type AuthRequest = {
  email: string;
  userName: string;
  password: string;
};

type LoginRequest = {
  email: string;
  password: string;
};

// User Utils
type UserIdParam = {
  userId: string;
};

type UsernameParam = {
  userName: string;
};

// Set Utils
type SetNameTestParam = {
  setName: string;
};

type SetIdParam = {
  setId: string;
};

type NewSetRequest = {
  setName: string;
};
