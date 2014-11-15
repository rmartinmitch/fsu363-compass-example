/* global d3, module */
var compass = (function () {
    'use strict';

    var svg = d3.select('.compass-container')
        .append('svg')
            .attr('width', '100%')
            .attr('height', '100%')
            .attr('viewBox', '0 0 100 100')
            .append('g')
                .attr('transform', 'translate(50, 50)');

    svg.append('circle')
        .attr('r', 36)
        .attr('fill', 'lightgray')
        .attr('stroke', 'black')
        .attr('stroke-width', '0.4');

    function updateHeading(angleDegrees) {
        updateNeedle(angleDegrees);

        updateHeadingText(angleDegrees);

        updateModifiedText();

        updateHeadings();
    }

    function updateNeedle(angleDegrees) {
        var needleData = {
            circle: [
                {
                    r: 2
                }
            ],
            needlePolygons: [
                {
                    color: 'red',
                    points: [
                        { x: -2, y: 0  },
                        { x: 2, y: 0 },
                        { x: 0, y: -25 },
                        { x: -2, y: 0 }
                    ]
                },
                {
                    color: 'white',
                    points: [
                        { x: -2, y: 0 },
                        { x: 2, y: 0 },
                        { x: 0, y: 25 },
                        { x: -2, y: 0 }
                    ]
                }
            ]
        };

        var needle = svg.selectAll('polygon').data(needleData.needlePolygons);
        needle.enter().append('polygon')
            .attr('points', function (d) {
                return d.points.map(function (d) {
                    return [d.x, d.y].join(',');
                }).join(' ');
            })
            .attr('stroke', 'black')
            .attr('stroke-width', 0.2)
            .attr('fill', function (d) {
                return d.color;
            });
        needle.transition().attr('transform', function () {
            return 'rotate(' + angleDegrees + ', 0,0)';
        });

        var circle = svg.selectAll('circle').data(needleData.circle);
        circle.enter().append('circle')
            .attr('r', 2);
    }

    function updateHeadingText(angleDegrees) {
        var headingText = svg.selectAll('#heading').data([1]);
        headingText.enter()
            .append('text')
            .attr('id', 'heading')
            .style('text-anchor', 'middle')
            .attr('font-size', '0.3em')
            .attr('x', 0)
            .attr('y', 43);

        headingText.text(function () {
            return angleDegrees.toFixed(2) + '\u00b0';
        });
        headingText.exit().remove();
    }

    function updateModifiedText() {
        var updateText = svg.selectAll('#update').data([1]);
        updateText.enter()
            .append('text')
            .attr('id', 'update')
            .style('text-anchor', 'middle')
            .attr('font-size', '0.3em')
            .attr('x', 0)
            .attr('y', 49);

        updateText.text(function () {
            return new Date().toLocaleTimeString();
        });
        updateText.exit().remove();
    }

    function updateHeadings() {

        var data = [
            {label: 'N', x: 0, y: -30},
            {label: 'S', x: 0, y: 33},
            {label: 'W', x: -31, y: 1},
            {label: 'E', x: 31, y: 1}
        ];

        var headingText = svg.selectAll('#N').data(data);
        headingText.enter()
            .append('text')
            .attr('id', 'N')
            .style('text-anchor', 'middle')
            .attr('font-size', '0.3em')
            .attr('x', function(d) {return d.x;})
            .attr('y', function(d) {return d.y;})
            .text(function(d) {return d.label;});

        headingText.exit().remove();
    }

    updateHeading(0);

    return {
        setHeading: updateHeading
    };
})();

if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = compass;
}