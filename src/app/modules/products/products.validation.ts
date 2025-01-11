import { z } from "zod";

const createProductValidationSchema = z.object({
    name: z.string({
        required_error: "Product name is required",
        invalid_type_error: "Product name must be a string",
      }).min(1, "Product name cannot be empty"),
      
      description: z.string({
        required_error: "Product description is required",
        invalid_type_error: "Product description must be a string",
      }).min(1, "Product description cannot be empty"),

      category: z.string({
        required_error: "Product category is required",
        invalid_type_error: "Product category must be a string",
      }).min(1, "Product category cannot be empty"),
      
      discount: z.string({
        required_error: "Product discount is required",
        invalid_type_error: "Product discount must be a string",
      }).regex(/^\d+$/, "Discount must be a numeric value represented as a string"),
      
      image: z.string({
        required_error: "Product image is required",
        invalid_type_error: "Product image must be a string",
      }).url("Product image must be a valid URL"),
      
      price: z.number({
        required_error: "Product price is required",
        invalid_type_error: "Product price must be a number",
      }).positive("Product price must be greater than zero"),

      status: z.enum(["Stock Out", "In Stock"] as const, {
        invalid_type_error: "Product status must be a valid status",
        required_error: "Product status is required",
      }),
      
      is_deleted: z.boolean({
        invalid_type_error: "is_deleted must be a boolean value",
      }).optional(),
})

const updateProductValidationSchema = z.object({
    
})


export const productsValidationSchema = {
    createProductValidationSchema,
    updateProductValidationSchema
}