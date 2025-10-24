import React from 'react';
import { RFP } from '../../types';

interface RfpListProps {
  rfps: RFP[];
}

const RfpList: React.FC<RfpListProps> = ({ rfps }) => {
  return (
    <div>
      <h2>Recent RFPs</h2>
      <ul>
        {rfps.map((rfp) => (
          <li key={rfp.id}>
            <a href={rfp.link} target="_blank" rel="noopener noreferrer">
              {rfp.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RfpList;
