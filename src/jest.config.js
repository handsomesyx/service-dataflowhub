module.exports = {
  roots: ['<rootDir>/src'], // 设置测试文件的根目录为 'src'
  transform: {
    '^.+\\.tsx?$': 'ts-jest', // 配置 Jest 如何处理 TypeScript 文件
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$', // 指定测试文件的命名规则
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'], // 指定可以导入的模块文件的扩展名
  coverageDirectory: './coverage/', // 指定生成代码覆盖率报告的目录
  collectCoverageFrom: ['src/**/*.{js,ts}', '!src/**/*.d.ts'], // 指定需要收集代码覆盖率信息的文件和文件夹
};
