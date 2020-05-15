/**
 * Adapted from https://github.com/reduxjs/redux/blob/master/rollup.config.js
 * Copyright (c) 2015-present Dan Abramov
 */

import nodeResolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import includePaths from 'rollup-plugin-includepaths';
import prepack from 'rollup-plugin-prepack';

let includePathOptions = {
    include: {},
    paths: ['src'],
    external: [],
    extensions: ['.js', '.json', '.html']
};



const defaultConf = {
  
  external: ['chalk','is-dom', 'prop-types',
  'react','@geekagency/composite-js','@geekagency/gen-classes',
  'formik','react-input-mask','react-icons','react-icons/fa',
  'react-icons/md','react-icons/libs','react-loading','react-draggable','react-icons/lib'],
  plugins: [
    nodeResolve({
      mainFields: ['module', 'jsnext:main', 'main'],
    }),
    commonjs({
      include: 'node_modules/**',
    }),
    babel({ runtimeHelpers: true }),
    includePaths(includePathOptions),
  ],
}

const defaultFormat = {
  format: 'cjs',
  indent: false,
  sourcemap: false,
  exports: 'named',
}

export default [
  Object.assign({},defaultConf,{
    input: 'src/Core/index.js',
    output: {
      file: 'dist/cjs/Core.js',
      ...defaultFormat
    }
  }),
  Object.assign({},defaultConf,{
    input: 'src/Effect/index.js',
    output: {
      file: 'dist/cjs/Effect.js',
      ...defaultFormat
    }
  }),
  Object.assign({},defaultConf,{
    input: 'src/chain.js',
    output: {
      file: 'dist/cjs/Chain.js',
      ...defaultFormat
    }
  }),
  Object.assign({},defaultConf,{
    input: 'src/deprecated.js',
    output: {
      file: 'dist/cjs/Legacy.js',
      ...defaultFormat
    }
  }),
  Object.assign({},defaultConf,{
    input: 'src/Minux/index.js',
    output: {
      file: 'dist/cjs/Minux.js',
      ...defaultFormat
    }
  }),
  Object.assign({},defaultConf,{
    input: 'src/Monad/index.js',
    output: {
      file: 'dist/cjs/Monad.js',
      ...defaultFormat
    }
  })
  ,
  Object.assign({},defaultConf,{
    input: 'src/Object/index.js',
    output: {
      file: 'dist/cjs/ObjectUtils.js',
      ...defaultFormat
    }
  }),
  Object.assign({},defaultConf,{
    input: 'src/List/index.js',
    output: {
      file: 'dist/cjs/List.js',
      ...defaultFormat
    }
  }),
  Object.assign({},defaultConf,{
    input: 'src/Combinator/index.js',
    output: {
      file: 'dist/cjs/Combinator.js',
      ...defaultFormat
    }
  }),
  Object.assign({},defaultConf,{
    input: 'src/ReactUtils/index.js',
    output: {
      file: 'dist/cjs/ReactUtils.js',
      ...defaultFormat
    }
  }),
  Object.assign({},defaultConf,{
    input: 'src/Validators/index.js',
    output: {
      file: 'dist/cjs/Validators.js',
      ...defaultFormat
    }
  }),
  Object.assign({},defaultConf,{
    input: 'src/ReduxUtils/index.js',
    output: {
      file: 'dist/cjs/ReduxUtils.js',
      ...defaultFormat
    }
  }),
  Object.assign({},defaultConf,{
    input: 'src/Geometry/index.js',
    output: {
      file: 'dist/cjs/Geometry.js',
      ...defaultFormat
    }
  }),
  Object.assign({},defaultConf,{
    input: 'src/StringUtils/index.js',
    output: {
      file: 'dist/cjs/String.js',
      ...defaultFormat
    }
  })
];
