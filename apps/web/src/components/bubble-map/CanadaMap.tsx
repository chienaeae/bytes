'use client';

import { scaleSqrt } from 'd3-scale';
import { select } from 'd3-selection';
import React, { useEffect, useRef, useState } from 'react';

import canadaData from './CanadaMap.json';
import cropData from './cropData';

interface ProvinceData {
  id: string;
  d: string;
}

interface CropData {
  name: string;
  province: string;
  coordinates: [number, number];
  size: number;
  season: 'Spring' | 'Summer' | 'Fall' | 'Winter';
}

interface CanadaMapProps {
  width?: string;
  height?: string;
  viewBox?: string;
}

const CanadaMap: React.FC<CanadaMapProps> = ({
  width = '760',
  height = '620',
  viewBox = '0 0 760 620',
}) => {
  const [season, setSeason] = useState<'Spring' | 'Summer' | 'Fall' | 'Winter'>('Spring');

  const svgRef = useRef<SVGSVGElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);

  const maxCropSize = Math.max(...cropData.map((d) => d.size));
  const sizeScale = scaleSqrt().domain([0, maxCropSize]).range([3, 20]);

  useEffect(() => {
    // Ensure the SVG and Tooltip references are available
    if (!svgRef.current || !tooltipRef.current) {
      console.log('SVG or Tooltip ref is missing:', {
        svg: svgRef.current,
        tooltip: tooltipRef.current,
      });
      return;
    }

    const svg = select(svgRef.current);
    const tooltip = select(tooltipRef.current);

    // Clear the SVG content to avoid duplicate rendering
    svg.selectAll('*').remove();

    // Render provinces on the map
    svg
      .selectAll('path')
      .data(canadaData as ProvinceData[])
      .enter()
      .append('path')
      .attr('d', (d: ProvinceData) => d.d) // Set the path data for each province
      .attr('class', (d: ProvinceData) => d.id) // Assign a class based on province ID
      .attr('fill', 'lightblue')
      .attr('stroke', '#838383')
      .attr('stroke-width', 1.5);

    // Filter crop data based on the current season
    const filteredCrops: CropData[] = cropData.filter((crop) => crop.season === season);

    // Render bubbles for the filtered crop data
    const bubbles = svg
      .selectAll<SVGCircleElement, CropData>('circle')
      .data(filteredCrops, (d) => d.name)
      .join(
        (enter) =>
          enter
            .append('circle')
            .attr('cx', (d: CropData) => d.coordinates[0]) // Set x-coordinate
            .attr('cy', (d: CropData) => d.coordinates[1]) // Set y-coordinate
            .attr('r', (d: CropData) => sizeScale(d.size)) // Set bubble size based on crop size
            .attr('fill', 'rgba(0, 128, 0, 0.7)')
            .attr('stroke', '#000')
            .attr('stroke-width', 0.5)
            .attr('class', 'hover:cursor-pointer'),
        (update) => update, // Handle updates
        (exit) => exit.remove() // Remove bubbles that are no longer needed
      );

    // Add tooltip interactions for bubbles
    bubbles
      .on('mouseover', (_, d: CropData) => {
        tooltip
          .style('opacity', 1)
          .style('display', 'block')
          .style('z-index', '1000')
          .html(
            `<div class="text-start">
              <strong>${d.name}</strong><br/>
              Province: ${d.province}<br/>
              Value: ${d.size}
            </div>`
          );
      })
      .on('mousemove', (event: MouseEvent) => {
        // Update tooltip position based on mouse movement
        tooltip.style('left', `${event.layerX + 15}px`).style('top', `${event.layerY + 15}px`);
      })
      .on('mouseout', () => {
        // Hide tooltip when mouse leaves the bubble
        tooltip.style('opacity', 0).style('display', 'none');
      });
  }, [season, sizeScale]);

  return (
    <div className="text-center relative">
      <h2 className="text-xl font-bold">Canada Crop Production - {season}</h2>
      <div className="flex justify-center my-4 space-x-2">
        {(['Spring', 'Summer', 'Fall', 'Winter'] as const).map((s) => (
          <button
            key={s}
            onClick={() => setSeason(s)}
            className="px-4 py-2 rounded-md hover:bg-primary hover:text-white shadow-neumorphic ease-in-out duration-500"
          >
            {s}
          </button>
        ))}
      </div>
      <svg
        ref={svgRef}
        width={width}
        height={height}
        viewBox={viewBox}
        className="mx-auto"
        xmlns="http://www.w3.org/2000/svg"
      />
      <div ref={tooltipRef} className="absolute bg-white py-1 px-2 rounded shadow-lg z-[1000]" />
    </div>
  );
};

export default CanadaMap;
