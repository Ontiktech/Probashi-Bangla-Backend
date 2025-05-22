export type AdminUserPayload = {
  id: string
  email: string
};

export type AppUserPayload = {
  id: string
  phoneNumber: string | null
  firstName: string | null
  lastName: string | null
  email: string
};
