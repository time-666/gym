


const data = [10, 20, 30, 40, 50];

// 创建 SVG 元素
const svg = d3.select('#chart-container')
  .append('svg')
  .attr('width', '100%')
  .attr('height', 300)
  .attr('viewBox', '0 0 400 300') // 可视区域设置，根据实际需要调整
  .attr('preserveAspectRatio', 'xMidYMid');

// 创建柱状图
svg.selectAll('rect')
  .data(data)
  .enter()
  .append('rect')
  .attr('x', (d, i) => i * 70)
  .attr('y', d => 300 - d * 5)
  .attr('width', 60)
  .attr('height', d => d * 5)
  .attr('fill', 'teal');

// 添加文本标签
svg.selectAll('text')
  .data(data)
  .enter()
  .append('text')
  .text(d => d)
  .attr('x', (d, i) => i * 70 + 30)
  .attr('y', d => 300 - d * 5 + 20)
  .attr('text-anchor', 'middle')
  .attr('fill', 'white');
