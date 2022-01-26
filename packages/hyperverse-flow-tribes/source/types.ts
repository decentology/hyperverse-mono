type Tail<T extends readonly unknown[]> = T extends readonly [
    infer _,
    ...infer Tail
  ]
    ? Tail
    : [];
  
export type Bind1<Fn extends (...args: any) => any> = (
    ...args: Tail<Parameters<Fn>>
  ) => ReturnType<Fn>;


export type TribesData = {
  name: string,
  ipfsHash: string,
  description: string,
}