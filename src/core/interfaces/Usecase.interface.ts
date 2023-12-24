export interface IUsecase<I, O> {
    execute(data: I): Promise<O>
}
