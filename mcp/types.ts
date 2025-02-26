/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentType } from 'react';

// 组件信息接口
export interface ComponentInfo {
  component?: ComponentType<any>;
  description: string;
  propTypes: Record<string, {
    type: string;
    required: boolean;
    defaultValue?: any;
    description?: string;
  }>;
} 