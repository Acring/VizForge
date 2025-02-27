import { ComponentInfo } from './types';

// 导入各个组件信息
import HelloWorldInfo from './components/HelloWorld';
import TitleWithAuthorInfo from './components/TitleWithAuthor';
import ComparisonChartInfo from './components/ComparisonChart';
import SvgRendererInfo from './components/SvgRenderer';
import CanvasRendererInfo from './components/CanvasRenderer';
import LineChartInfo from './components/LineChart';
import MermaidRendererInfo from './components/MermaidRenderer';
import FeatureShowcaseInfo from './components/FeatureShowcase';

// 组件映射表
const ComponentMap: Record<string, ComponentInfo> = {
  'HelloWorld': HelloWorldInfo,
  'TitleWithAuthor': TitleWithAuthorInfo,
  'ComparisonChart': ComparisonChartInfo,
  'SvgRenderer': SvgRendererInfo,
  'CanvasRenderer': CanvasRendererInfo,
  'LineChart': LineChartInfo,
  'MermaidRenderer': MermaidRendererInfo,
  'FeatureShowcase': FeatureShowcaseInfo,
  // 可以在此处添加更多组件
};

export default ComponentMap; 