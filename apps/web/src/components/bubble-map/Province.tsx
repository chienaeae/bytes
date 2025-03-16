import React, { useEffect, useState } from 'react';

interface ProvinceProps {
  id: string;
  d: string;
  selected: string | null;
  onSelect: (id: string) => void;
}

const Province: React.FC<ProvinceProps> = ({ id, d, selected }) => {
  const [fill, setFill] = useState<string>('lightblue');

  useEffect(() => {
    if (selected !== id && fill === 'navy') {
      setFill('lightblue');
    }
  }, [selected, id, fill]);

  return (
    <g key={`g-${id}`}>
      <path
        key={`path-${id}`}
        d={d}
        className={`${id}`}
        fill={fill}
        stroke="#838383"
        strokeWidth={1.5}
      />
    </g>
  );
};

export default Province;
