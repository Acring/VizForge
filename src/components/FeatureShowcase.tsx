import React from 'react';

/**
 * 功能点展示组件属性接口
 */
interface FeatureShowcaseProps {
  title: string;
  subtitle?: string;
  features: string[];
  backgroundColor?: string; // 直接的背景样式字符串
  textColor?: string;
  titleSize?: string;
  subtitleSize?: string;
  featureSize?: string;
  className?: string;
}

/**
 * 功能点展示组件
 * 
 * 展示主标题、副标题和功能点列表，支持自定义渐变背景和噪点效果
 */
const FeatureShowcase: React.FC<FeatureShowcaseProps> = ({
  title,
  subtitle,
  features,
  backgroundColor = 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 50%, #9333EA 100%)',
  textColor = 'white',
  titleSize = '2.5rem',
  subtitleSize = '0.8rem',
  featureSize = '1rem',
  className = '',
}) => {
  return (
    <div 
      className={`relative overflow-hidden rounded-xl p-8 ${className}`}
      style={{
        background: backgroundColor,
        color: textColor,
      }}
    >
      {/* 添加一层噪点纹理效果 */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
        }}
      />
      
      {/* 内容区域 */}
      <div className="relative z-10">
        {/* 主标题 */}
        <h2 className="font-bold" style={{ fontSize: titleSize, marginBottom: '0.75rem' }}>
          {title}
        </h2>
        
        {/* 副标题（可选） */}
        {subtitle && (
          <h3 className="font-normal opacity-90" style={{ fontSize: subtitleSize, marginBottom: '1.5rem' }}>
            {subtitle}
          </h3>
        )}
        
        {/* 功能点列表 */}
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li 
              key={index} 
              className="flex items-center"
              style={{ fontSize: featureSize }}
            >
              <span className="mr-2 text-lg">•</span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FeatureShowcase; 