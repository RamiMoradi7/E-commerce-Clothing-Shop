
class AppConfig {
  // Backend urls:
  public readonly baseUrl = "http://localhost:4000/api/";
  public readonly registerUrl = `${this.baseUrl}register/`;
  public readonly loginUrl = `${this.baseUrl}login/`;
  public readonly categoriesUrl = `${this.baseUrl}categories/`;
  public readonly subCategoriesByCategoryUrl = `${this.baseUrl}sub-categories-by-category/`;
  public readonly subCategoriesUrl = `${this.baseUrl}sub-categories/`;
  public readonly audiencesUrl = `${this.baseUrl}audiences/`;
  public readonly brandsUrl = `${this.baseUrl}brands/`;
  public readonly productsUrl = `${this.baseUrl}products`;
  public readonly shoesUrl = `${this.baseUrl}shoes/`;
  public readonly sizesUrl = `${this.baseUrl}cloth-sizes/`;
  public readonly shoeSizesUrl = `${this.baseUrl}shoe-sizes/`;
  public readonly colorsUrl = `${this.baseUrl}colors/`;
  public readonly ordersUrl = `${this.baseUrl}orders/`;

  //Axios options:
  public readonly axiosOptions = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
}

export const appConfig = new AppConfig();
