export interface IBody {
    name: string
    isParent: boolean | null,
    parent: number | null
}

export interface ICategoryCreateInput extends Omit<IBody, ""> {}