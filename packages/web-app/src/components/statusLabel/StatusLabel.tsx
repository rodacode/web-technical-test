import React from 'react';

interface StatusLabelProps {
  status: 'AVAILABLE' | 'BOOKED' | 'MAINTENANCE' | 'DISABLED';
}

const StatusLabel: React.FC<StatusLabelProps> = ({ status }) => {
  const getStatusStyles = () => {
    switch (status) {
      case 'AVAILABLE':
        return 'bg-[#ECFDF3] text-[#17B26A]';
      case 'BOOKED':
        return 'bg-[#F2F4F7] text-[#475467]';
      case 'MAINTENANCE':
        return 'bg-[#FEF3F2] text-[#F04438]';
      default:
        return 'bg-gray-200 text-gray-600';
    }
  };

  return (
    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusStyles()}`}>
      {status}
    </span>
  );
};

export default StatusLabel;