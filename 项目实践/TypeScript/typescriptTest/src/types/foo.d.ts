// 1、直接导出 declare可有可无
export const name: string;
export function getName(): string;
export declare namespace test {
  const name: string;
}

// 2、间接导出
declare const all: string;
export { all };

// 3、 直接默认导出 仅支持function class interface
// export default class test4 {}

// 4、间接默认导出 都支持
declare const test5: string;
export default test5;

// 5、commonjs语法
