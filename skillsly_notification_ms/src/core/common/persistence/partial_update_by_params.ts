export interface PartialUpdateByParams<Q, U, T> {
  partialUpdate(params: Q, updates: U): Promise<T>;
}
