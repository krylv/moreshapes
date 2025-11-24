import type { TShapeTypes } from "../../types";

export interface ICreateForm {
    shapeType?:TShapeTypes | ''
    color?:string
    size?:number
}

export type TCreateFormErrors = Partial<Record<keyof ICreateForm, string>>