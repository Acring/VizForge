import React from 'react';

interface TitleWithAuthorProps {
  title: string;
  subtitle?: string;
  author?: string;
  tagline?: string;
  textColor?: string;
  backgroundColor?: string;
  style?: React.CSSProperties;
}

const TitleWithAuthor: React.FC<TitleWithAuthorProps> = ({
  title,
  subtitle = '',
  author = '',
  tagline = '',
  textColor = '#f7f6dc',
  backgroundColor = 'linear-gradient(135deg, #1e40af 0%, #4b5563 50%, #111827 100%)',
  style = {},
}) => {
  // 创建容器样式
  const containerStyle: React.CSSProperties = {
    background: backgroundColor,
    position: 'relative',
    overflow: 'hidden',
    ...style
  };

  // 创建标题样式
  const titleStyle: React.CSSProperties = {
    color: textColor,
    fontWeight: 'bold',
    letterSpacing: '0.05em',
  };

  // 创建副标题样式
  const subtitleStyle: React.CSSProperties = {
    color: textColor,
    opacity: 0.9,
  };

  // 创建作者和标语样式
  const metaStyle: React.CSSProperties = {
    color: textColor,
    opacity: 0.8,
  };

  return (
    <div 
      className="flex flex-col justify-between p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
      style={containerStyle}
    >
      <div className="flex-grow flex flex-col items-center justify-center py-16">
        <h1 
          className="text-5xl md:text-7xl font-bold tracking-wide text-center"
          style={titleStyle}
        >
          {title}
        </h1>
        {subtitle && (
          <h2 
            className="text-xl md:text-2xl mt-4 text-center"
            style={subtitleStyle}
          >
            {subtitle}
          </h2>
        )}
      </div>
      
      {(author || tagline) && (
        <div className="mt-auto">
          {author && (
            <p className="text-sm font-medium" style={metaStyle}>
              {author}
            </p>
          )}
          {tagline && (
            <p className="text-xs tracking-wider uppercase mt-1" style={metaStyle}>
              {tagline}
            </p>
          )}
        </div>
      )}
      
      {/* 添加一层噪点纹理效果 */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
        }}
      />
    </div>
  );
};

export default TitleWithAuthor; 