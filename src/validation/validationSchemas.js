import * as yup from "yup";

export const registerSchema = yup
  .object({
    name: yup.string().required("Username is required"),
    email: yup
      .string()
      .email("Must be a valid email")
      .required("Email is required"),
    password: yup.string().required("Password is required"),
    avatar: yup.string().url().nullable(),
    venueManager: yup.boolean(),
  })
  .required();

export const loginSchema = yup
  .object({
    email: yup
      .string()
      .email("Invalid email address")
      .required("Email is required"),
    password: yup.string().required("Password is required"),
  })
  .required();

export const createVenueSchema = yup
  .object({
    name: yup.string().required("Name is required"),
    description: yup.string().required("Description is required"),
    media: yup.array().of(yup.string().url()),
    price: yup.number().positive().required("Price is required"),
    maxGuests: yup
      .number()
      .positive()
      .integer()
      .required("Maximum guests is required"),
    rating: yup.number().positive().max(5),
    meta: yup.object({
      wifi: yup.boolean(),
      parking: yup.boolean(),
      breakfast: yup.boolean(),
      pets: yup.boolean(),
    }),
    location: yup.object({
      address: yup.string(),
      city: yup.string(),
      zip: yup.string(),
      country: yup.string(),
      continent: yup.string(),
      lat: yup.number(),
      lng: yup.number(),
    }),
  })
  .required();

export const updateListingSchema = createVenueSchema.clone().noUnknown();
