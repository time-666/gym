d3.json('muscle.json').then(data => {
    const width = 960;
    const height = 600;

    // 创建 SVG 元素
    const svg = d3.select('#chart-container3')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('viewBox', `0 0 ${width} ${height}`)
        .attr('preserveAspectRatio', 'xMidYMid meet')
        .style('display', 'block')  // 确保 SVG 以块级元素显示，以便设置 margin 属性
        .style('margin', 'auto');   // 设置 margin 属性为自动，实现水平居中

    // 投影和路径生成器
    const projection = d3.geoIdentity()
        .reflectY(true) // 将 Y 轴反射，实现镜像效果
        .fitSize([width, height], data);
    const path = d3.geoPath().projection(projection);

    // 创建颜色比例尺，这里使用的是schemeCategory10，因此有10种颜色，可以通过名称来索引颜色
    const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

    // 数据准备
    this.geoData = data; // 假设 this.geoData 是一个属性用于存储地理数据
    this.colorScale = colorScale; // 假设 this.colorScale 是一个属性用于存储颜色比例尺

    // 绘制图像
    svg.selectAll('path')
        .data(this.geoData.features)
        .enter()
        .append('path')
        .attr('d', path)
        .attr('fill', d => {
            // 获取肌肉的名称，并作为颜色的索引
            let muscleName = d.properties.肌肉;
            // 使用名称索引颜色比例尺
            return this.colorScale(muscleName);
        })
        .attr('stroke', 'white')
        .attr('stroke-width', 1)
        .on('mouseover', function(d) {
            d3.select(this)
                .attr('opacity', 0.7)
                .attr('stroke', 'black')
                .attr('stroke-width', 2);
        })
        .on('mouseout', function(d) {
            d3.select(this)
                .attr('opacity', 1)
                .attr('stroke', 'white')
                .attr('stroke-width', 1);
        })
        .append('title')
        .text(d => `${d.properties.肌肉}`);

});






// d3.json('test.json').then(data => {
//     const width = 960;
//     const height = 600;
//
//     // 创建 SVG 元素
//     const svg = d3.select('#chart-container')
//         .append('svg')
//         .attr('width', width)
//         .attr('height', height)
//         .attr('viewBox', `0 0 ${width} ${height}`)
//         .attr('preserveAspectRatio', 'xMidYMid meet');
//
//     // 投影和路径生成器
//     const projection = d3.geoIdentity()
//         .reflectY(true) // 将 Y 轴反射，实现镜像效果
//         .fitSize([width, height], data);
//     const path = d3.geoPath().projection(projection);
//
//     // 创建颜色比例尺
//     const colorScale = d3.scaleOrdinal(d3.schemeCategory10); // 假设你已经定义了 colorScale
//
//     // 数据准备
//     this.geoData = data; // 假设 this.geoData 是一个属性用于存储地理数据
//     this.colorScale = colorScale; // 假设 this.colorScale 是一个属性用于存储颜色比例尺
//
//     // 绘制图像
//     svg.selectAll('path')
//         .data(this.geoData.features)
//         .enter()
//         .append('path')
//         .attr('d', path)
//         .attr('fill', d => {
//             let cityName = d.properties.name;
//             return this.colorScale(cityName);
//         })
//         .attr('stroke', 'white')
//         .attr('stroke-width', 1)
//         .on('mouseover', function(d) {
//             d3.select(this)
//                 .attr('opacity', 0.7)
//                 .attr('stroke', 'black')
//                 .attr('stroke-width', 2);
//         })
//         .on('mouseout', function(d) {
//             d3.select(this)
//                 .attr('opacity', 1)
//                 .attr('stroke', 'white')
//                 .attr('stroke-width', 1);
//         })
//         .append('title')
//         .text(d => d.properties.name);
// });



