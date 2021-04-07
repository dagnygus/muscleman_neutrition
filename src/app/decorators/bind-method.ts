export function BindMethod(target: any, methodName: string, descriptor: TypedPropertyDescriptor<((...args: any[]) => any)>): any {
  const method = descriptor.value;
  const newDescriptor: PropertyDescriptor = {
    get(): any {
      return method?.bind(this);
    },
  };
  return newDescriptor;
}
