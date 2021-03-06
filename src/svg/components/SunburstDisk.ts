import Component from './Component';
import XRadialAxis from './XRadialAxis';
import YRadialAxis from './YRadialAxis';
import { arc, stratify, partition } from 'd3';

class SunburstDisk extends Component {

    private x: XRadialAxis;
    private y: YRadialAxis;

    constructor(x: XRadialAxis, y: YRadialAxis) {
        super();
        this.x = x;
        this.y = y;

    }

    /**
     * Removes all the paths (arcs). Doing this before each redraw prevents the
     * transition to mess up the arcs.
     * @private
     */
    private removePaths() {
        this.svg.select('.sunburstDisksSet').selectAll('*').remove();
    }

    /**
     * From: http://bl.ocks.org/kerryrodden/7090426
     * @param node
     * @returns {Array}
     * @private
     */
    private getAncestors(node: any) {
        let path = [];
        let current = node;
        while (current.parent) {
            path.unshift(current);
            current = current.parent;
        }
        return path;
    }

    update(data: [any]): void {
        let arcGen = arc()
            .startAngle((d: any) => Math.max(0, Math.min(2 * Math.PI, this.x.xRadialAxis(d.x0))))
            .endAngle((d: any) => Math.max(0, Math.min(2 * Math.PI, this.x.xRadialAxis(d.x1))))
            .innerRadius((d: any) => Math.max(0, this.y.yRadialAxis(d.y0)))
            .outerRadius((d: any) => Math.max(0, this.y.yRadialAxis(d.y1)));
        let colorScale = this.config.get('colorScale');

        // Remove all the paths before redrawing
        this.removePaths();

        // Create layout partition
        let root = stratify()
            .id((d: any) => d.id)
            .parentId((d: any) => d.parent)
            (data);
        root.sum((d: any) => d.value);
        partition()(root);

        let serie = this.svg.select('.sunburstDisksSet').selectAll('g.sunburstDisks');
        
        // Draw the paths (arcs)
        let paths = serie.data(root.descendants())
            .enter().append('g')
            .attr('class', 'sunburstDisks')
            .append('svg:path')
            .attr('d', (d: any) => arcGen(d))
            .style('fill', (d: any) => {
                if (!d.parent) {
                    return 'white';
                } else {
                    return colorScale(d.data.label);
                }
            })
            .style('stroke', '#fff')
            .style('stroke-width', '2')
            .style('shape-rendering', 'crispEdge');

        paths // TODO extract events to config?
            .on('mouseover.default', (d: any) => {
                let ancestors = this.getAncestors(d);
                // Fade all the arcs
                if (ancestors.length > 0) {
                    this.svg.selectAll('path')
                        .style('opacity', 0.3);
                }
                this.svg.selectAll('path')
                    .filter((node) => ancestors.indexOf(node) >= 0)
                    .style('opacity', 1);
                // Hightlight the hovered arc
                this.svg.select('.text-indicator .label').text(d.data.label);
                this.svg.select('.text-indicator .value').text(d.value);
            })
            .on('mouseout.default', (d) => {
                this.svg.selectAll('path').style('opacity', 1);
                this.svg.select('.text-indicator .label').style('font-weight', 'normal');
                this.svg.select('.text-indicator .label').text('');
                this.svg.select('.text-indicator .value').text('');
            });

        paths
            .on('mousedown.user', this.config.get('onDown'))
            .on('mouseup.user', this.config.get('onUp'))
            .on('mouseleave.user', this.config.get('onLeave'))
            .on('mouseover.user', this.config.get('onHover'))
            .on('click.user', this.config.get('onClick'));
    }

    render(): void {
        this.svg.append('g').attr('class', 'sunburstDisksSet');
    }

    public clear() {
        console.warn('Not yet implemented');
    }

    public transition() {
        // console.warn('no transition implemented for sun disk');
    }

}

export default SunburstDisk;
