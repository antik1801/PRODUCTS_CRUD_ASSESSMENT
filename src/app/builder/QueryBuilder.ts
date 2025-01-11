import { FilterQuery, Query } from "mongoose";

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;
  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  search(searchableFields: string[]) {
    // const searchTerm = this?.query?.searchTerm;
    // if (searchTerm) {
    //   this.modelQuery = this.modelQuery.find({
    //     $or: searchableFields.map(
    //       (field) =>
    //         ({
    //           [field]: { $regex: searchTerm, $options: 'i' },
    //         }) as FilterQuery<T>,
    //     ),
    //   });
    // }

    // return this;

    const searchTerm = this?.query?.searchTerm as string;

    if (searchTerm) {
      // Existing search functionality for `searchTerm`
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map(
          (field) =>
            ({
              [field]: { $regex: searchTerm, $options: "i" },
            } as FilterQuery<T>)
        ),
      });
    } else {
      // New functionality: handle direct field searches like `?name=value`
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields
          .filter((field) => this.query[field]) // Only include fields that exist in the query
          .map(
            (field) =>
              ({
                [field]: { $regex: this.query[field] as string, $options: "i" },
              } as FilterQuery<T>)
          ),
      });
    }

    return this;
  }
  filter() {
    const queryObj = { ...this.query }; // copy

    // Filtering
    // const excludeFields = ["searchTerm", "sort", "limit", "page", "fields"];

    const excludeFields = [
      "searchTerm",
      "sort",
      "limit",
      "page",
      "fields",
      "name",
    ];

    excludeFields.forEach((el) => delete queryObj[el]);

    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);

    return this;
  }
  sort() {
    const sort =
      (this?.query?.sort as string)?.split(",")?.join(" ") || "-createdAt";
    this.modelQuery = this.modelQuery.sort(sort as string);

    return this;
  }
  paginate() {
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 10;
    const skip = (page - 1) * limit;

    this.modelQuery = this.modelQuery.skip(skip).limit(limit);

    return this;
  }

  fields() {
    const fields =
      (this?.query?.fields as string)?.split(",")?.join(" ") || "-__v";

    this.modelQuery = this.modelQuery.select(fields);
    return this;
  }
}

export default QueryBuilder;
