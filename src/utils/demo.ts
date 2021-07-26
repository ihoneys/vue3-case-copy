interface Person {
    name: string,
    age: number,
    gender: number
}


type ReadOnlyType<T> = {
    readonly [p in keyof T]: T
}


type ReadOnlyPerson = ReadOnlyType<Person>

type ParamsType<T> = T extends (params: infer P) => any ? P : T

type FunctionType = (value: number) => boolean

type Param = ParamsType<FunctionType>





