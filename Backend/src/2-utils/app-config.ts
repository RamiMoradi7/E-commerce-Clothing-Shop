import dotenv from "dotenv";

dotenv.config();

class AppConfig {
  public readonly isDevelopment = process.env.ENVIRONMENT === "development";
  public readonly isProduction = process.env.ENVIRONMENT === "production";
  public readonly port = process.env.PORT;
  public readonly mongodbConnectionString =
    process.env.MONGODB_CONNECTION_STRING;
  public readonly jwtSecretKey = process.env.JWT_SECRET_KEY;
  public readonly passwordSalt = process.env.PASSWORD_SALT;
  public readonly paymentSalt = process.env.PAYMENT_SALT;
  public readonly baseImageUrl = process.env.BASE_IMAGE_URL;
  public readonly baseClothUrl = process.env.BASE_CLOTH_IMAGE_URL;
  public readonly baseAccessoryUrl = process.env.BASE_ACCESSORY_IMAGE_URL;
  public readonly baseShoeUrl = process.env.BASE_SHOE_IMAGE_URL;
  public readonly baseCategoryUrl = process.env.BASE_CATEGORY_IMAGE_URL;
  public readonly baseBrandUrl = process.env.BASE_BRAND_IMAGE_URL;
}

export const appConfig = new AppConfig();
