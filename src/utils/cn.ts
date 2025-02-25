import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * 合并 Tailwind CSS 类名的工具函数
 * 
 * @param inputs 要合并的类名
 * @returns 合并后的类名字符串
 * 
 * @example
 * ```tsx
 * import { cn } from '@/utils/cn';
 * 
 * function Component({ className }) {
 *   return <div className={cn('default-class', className, { 'conditional-class': true })} />;
 * }
 * ```
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
} 