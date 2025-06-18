import z from 'zod';


export const shortenerSchema = z.object({
    url: z
        .string({ required_error: "URL is required" })
        .trim()
        .url({ message: "Please enter a valid URL." })
        .max(1024, { message: "URL can not be longer than 1024 character" }),

    shortcode: z
        .string({ required_error: "Short code is required." })
        .trim()
        .min(2, { message: "Short code must be at least 2 character long" })
        .max(50, { message: "Short code can not be longer than 50 character" })
});