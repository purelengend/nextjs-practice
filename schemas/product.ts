import { z } from "zod";

// Constants
import {
  ACCEPTED_IMAGE_TYPES,
  FORM_MESSAGES,
  MAX_IMAGE_FILE_SIZE,
} from "@/constants";

export const ProductFormSchema = z
  .object({
    id: z.string(),
    category: z
      .string({
        required_error: FORM_MESSAGES.PRODUCT.CATEGORY.REQUIRED,
      })
      .min(1, FORM_MESSAGES.PRODUCT.CATEGORY.REQUIRED),
    title: z
      .string({ required_error: FORM_MESSAGES.PRODUCT.TITLE.REQUIRED })
      .min(2, FORM_MESSAGES.PRODUCT.TITLE.MIN)
      .max(100, FORM_MESSAGES.PRODUCT.TITLE.MAX),
    description: z
      .string()
      .max(200, FORM_MESSAGES.PRODUCT.DESCRIPTION.MAX)
      .optional(),
    sales: z
      .number({ required_error: FORM_MESSAGES.PRODUCT.SALES.REQUIRED })
      .min(0, FORM_MESSAGES.PRODUCT.SALES.MIN)
      .max(9999999999, FORM_MESSAGES.PRODUCT.SALES.MAX),
    originalPrice: z
      .number({ required_error: FORM_MESSAGES.PRODUCT.ORIGINAL_PRICE.REQUIRED })
      .min(0.01, FORM_MESSAGES.PRODUCT.ORIGINAL_PRICE.MIN)
      .max(9999999999, FORM_MESSAGES.PRODUCT.ORIGINAL_PRICE.MAX)
      .refine((value) => /^\d*\.?\d{0,2}$/.test(value.toString()), {
        message: FORM_MESSAGES.PRODUCT.ORIGINAL_PRICE.DECIMAL_MAX,
      }),
    salePrice: z
      .number({ required_error: FORM_MESSAGES.PRODUCT.SALE_PRICE.REQUIRED })
      .min(0.01, FORM_MESSAGES.PRODUCT.SALE_PRICE.MIN)
      .refine((value) => /^\d*\.?\d{0,2}$/.test(value.toString()), {
        message: FORM_MESSAGES.PRODUCT.SALE_PRICE.DECIMAL_MAX,
      }),
    rate: z
      .number({ required_error: FORM_MESSAGES.PRODUCT.RATE.REQUIRED })
      .min(0, FORM_MESSAGES.PRODUCT.RATE.MIN)
      .max(5, FORM_MESSAGES.PRODUCT.RATE.MAX)
      .refine(
        (val) => {
          return /^\d+(\.\d)?$/.test(val.toString());
        },
        {
          message: FORM_MESSAGES.PRODUCT.RATE.DECIMAL,
        },
      ),
    coverImageUrl: z.string().optional(),
    coverImage: z
      .any()
      .optional()
      .refine(
        (file) => !file || file?.size <= MAX_IMAGE_FILE_SIZE,
        FORM_MESSAGES.PRODUCT.COVER_IMAGE.MAX_SIZE,
      )
      .refine(
        (file) => !file || ACCEPTED_IMAGE_TYPES.includes(file?.type),
        FORM_MESSAGES.PRODUCT.COVER_IMAGE.ACCEPTED_FORMATS,
      ),
    createdAt: z.number().optional(),
    isFavorited: z.number().optional(),
  })
  .refine((schema) => schema.originalPrice >= schema.salePrice, {
    message: FORM_MESSAGES.PRODUCT.SALE_PRICE.MAX,
    path: ["salePrice"],
  })
  .refine((schema) => schema.originalPrice >= schema.salePrice, {
    message: FORM_MESSAGES.PRODUCT.ORIGINAL_PRICE.CONSTRAINT,
    path: ["originalPrice"],
  });
