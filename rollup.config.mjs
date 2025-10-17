import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'

export default [
  // ESM 版本
  {
    input: 'src/qqmap-jssdk.min.js',
    output: {
      file: 'dist/index.esm.js',
      format: 'es',
      sourcemap: false
    },
    plugins: [
      nodeResolve(),
      commonjs({
        defaultIsModuleExports: true
      })
    ]
  },
  // CJS 版本
  {
    input: 'src/qqmap-jssdk.min.js',
    output: {
      file: 'dist/index.cjs.js',
      format: 'cjs',
      sourcemap: false,
      exports: 'default'
    },
    plugins: [
      nodeResolve(),
      commonjs({
        defaultIsModuleExports: true
      })
    ]
  }
]