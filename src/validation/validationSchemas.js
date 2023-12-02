import * as yup from "yup";

export const registerSchema = yup
  .object({
    name: yup
      .string()
      .required("Username is required")
      .matches(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9_]{5,})$/, {
        message:
          "Minimum 5 characters long. Must include both letters and numbers. Capital letters and symbols like underscore are allowed.",
        excludeEmptyString: true,
      }),
    email: yup
      .string()
      .email("Must be a valid email")
      .matches(/@stud\.noroff\.no$/, {
        message: "Email must end with @stud.noroff.no",
        excludeEmptyString: true,
      })
      .required("Email is required"),
    password: yup
      .string()
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d_]{8,}$/, {
        message:
          "Minimum 8 characters long. Must include numbers, letters and at least one uppercase letter. Symbols like underscore are allowed.",
        excludeEmptyString: true,
      })
      .required("Password is required"),
    avatar: yup.string().url("Must be a valid URL").nullable(),
    venueManager: yup.boolean(),
  })
  .required();

export const loginSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email address")
    .matches(/@stud\.noroff\.no$/, {
      message: "Email must end with @stud.noroff.no",
      excludeEmptyString: true,
    })
    .required("Email is required"),
  password: yup
    .string()
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d_]{8,}$/, {
      message:
        "Minimum 8 characters long. Must include numbers, letters and at least one uppercase letter. Symbols like lowercase are allowed.",
      excludeEmptyString: true,
    })
    .required("Password is required"),
});

const isDateUnavailable = (date, bookedDates) => {
  const formattedDate = date.toISOString().split("T")[0];
  return bookedDates.some(
    (bookedDate) => bookedDate.toISOString().split("T")[0] === formattedDate
  );
};

const today = new Date();
today.setHours(0, 0, 0, 0);

export const bookingSchema = (bookedDates, maxGuests) =>
  yup.object({
    startDate: yup
      .date()
      .required("Start date is required")
      .min(today, "Start date cannot be in the past")
      .test(
        "startDate-available",
        "Start date is unavailable",
        (value) => !isDateUnavailable(value, bookedDates)
      ),
    endDate: yup
      .date()
      .required("End date is required")
      .when("startDate", (startDate, schema) => {
        if (!(startDate instanceof Date) || isNaN(startDate)) {
          return schema;
        }

        const minEndDate = new Date(startDate);
        minEndDate.setDate(minEndDate.getDate() + 1);

        return schema
          .min(minEndDate, "End date cannot be before start date")
          .test(
            "endDate-available",
            "End date is unavailable",
            (value) => !isDateUnavailable(value, bookedDates)
          );
      }),
    guests: yup
      .number()
      .required("Number of guests is required")
      .positive("Number of guests must be more than 0")
      .integer("Please enter a whole number for the number of guests")
      .max(maxGuests, `Guests cannot exceed ${maxGuests} people`)
      .min(1, "At least one guest is required"),
  });

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

export const updateVenueSchema = yup
  .object({
    name: yup.string(),
    description: yup.string().required("Description is required"),
    media: yup.array().of(yup.string().url()),
    price: yup.number().positive(),
    maxGuests: yup.number().positive().integer(),
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

export const updateProfileSchema = yup.object({
  avatar: yup
    .string()
    .url("Avatar URL must be a valid URL: https://example.com/avatar.jpg")
    .nullable()
    .required("Avatar URL is required"),
});
