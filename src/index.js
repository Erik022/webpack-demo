import * as home from "./app/home";
import {mapExample} from './app/lodash/lodashMapExample'
// this import handled in webpack.config.js resolve -> alias -> old.
import * as old from 'old';
import './index.scss'

console.log(home.default);
document.getElementById('btn').addEventListener('click', () => {
    // signal webpack that this module needed to load lazy
    require.ensure([], (require) => {
        let lazy = require('./app/lazy');
        console.log(lazy.lazy);
    })
})
// work with webpack context dynamic loading, use bundle-loader
let moduleName = location.pathname.slice(1);
try {
    let module = require('bundle-loader!./app/routes/' + moduleName);
    if (module) {
        module((route) => {
            route.default();
        });
    }
} catch (e) {
    console.log(e);
}
old.startWork('some work');
// old.finishWork('some work');
mapExample();


