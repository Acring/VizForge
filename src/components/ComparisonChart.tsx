import React from 'react';

export interface ComparisonItem {
  feature: string;
  item1Value: string | React.ReactNode;
  item2Value: string | React.ReactNode;
}

export interface ComparisonChartProps {
  title?: string;
  item1Name: string;
  item2Name: string;
  items: ComparisonItem[];
  featureTitle?: string;
  headerBgColor?: string;
  item1BgColor?: string;
  item2BgColor?: string;
  textColor?: string;
  style?: React.CSSProperties;
}

const ComparisonChart: React.FC<ComparisonChartProps> = ({
  title,
  item1Name,
  item2Name,
  items,
  featureTitle = '特性',
  headerBgColor = '#3b82f6',
  item1BgColor = '#eff6ff',
  item2BgColor = '#dbeafe',
  textColor = '#1e3a8a',
  style = {},
}) => {
  return (
    <div 
      className="w-full overflow-hidden rounded-xl shadow-lg bg-white dark:bg-gray-800" 
      style={{
        ...style,
        boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.1), 0 8px 10px -6px rgba(59, 130, 246, 0.1)'
      }}
    >
      {title && (
        <div 
          className="p-5 text-center text-white font-bold text-xl"
          style={{ 
            backgroundColor: headerBgColor,
            backgroundImage: `linear-gradient(135deg, ${headerBgColor} 0%, rgba(59, 130, 246, 0.8) 100%)`,
          }}
        >
          {title}
        </div>
      )}
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-0">
              <th 
                className="p-4 text-left font-semibold"
                style={{ color: textColor, fontSize: '1.05rem', backgroundColor: item1BgColor }}
              >
                {featureTitle}
              </th>
              <th 
                className="p-4 text-center font-semibold"
                style={{ 
                  backgroundColor: item1BgColor, 
                  color: textColor,
                  fontSize: '1.05rem',
                  transition: 'all 0.3s ease'
                }}
              >
                {item1Name}
              </th>
              <th 
                className="p-4 text-center font-semibold"
                style={{ 
                  backgroundColor: item2BgColor, 
                  color: textColor,
                  fontSize: '1.05rem',
                  transition: 'all 0.3s ease'
                }}
              >
                {item2Name}
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr 
                key={index}
                className="hover:bg-opacity-80"
                style={{ transition: 'all 0.2s ease' }}
              >
                <td 
                  className="p-4 font-medium"
                  style={{ color: textColor, backgroundColor: item1BgColor }}
                >
                  {item.feature}
                </td>
                <td 
                  className="p-4 text-center"
                  style={{ 
                    backgroundColor: item1BgColor, 
                    color: textColor,
                    transition: 'all 0.3s ease'
                  }}
                >
                  {item.item1Value}
                </td>
                <td 
                  className="p-4 text-center"
                  style={{ 
                    backgroundColor: item2BgColor, 
                    color: textColor,
                    transition: 'all 0.3s ease'
                  }}
                >
                  {item.item2Value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComparisonChart; 