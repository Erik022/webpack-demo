export const mapExample = () => {
    const obj = [
        {id: 1, name: 'John'},
        {id: 2, name: 'Elizabeth'},
        {id: 3, name: 'Michael'}
    ]
//we will get 'map' from  webpack.config.js -> plugins: ->   map: 'lodash/map'
    console.log(map(obj, 'name'))
}
