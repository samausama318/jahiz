import React from 'react';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  accent?: 'none' | 'blue' | 'purple' | 'gradient';
  title?: string;
  subtitle?: string;
  action?: React.ReactNode;
  headerBorder?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  accent = 'none',
  title,
  subtitle,
  action,
  headerBorder = true
}) => {
  const accentBorder = {
    none: '',
    blue: 'border-r-4 border-r-[#0877E8]',
    purple: 'border-r-4 border-r-[#FF8A00]',
    gradient: 'border-r-4 border-r-[#003E82]'
  };

  return (
    <div className={`jahez-card overflow-hidden ${accentBorder[accent]} ${className}`}>
      {(title || action) && (
        <div className={`p-4 sm:p-5 flex items-center justify-between gap-4 ${headerBorder ? 'border-b border-[#E6EAF0]' : ''}`}>
          <div>
            {title && <h3 className="font-semibold text-base text-[#172033] tracking-tight">{title}</h3>}
            {subtitle && <p className="text-xs text-[#667085] mt-0.5">{subtitle}</p>}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>
      )}
      <div className="p-4 sm:p-5">
        {children}
      </div>
    </div>
  );
};

interface KPICardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  description?: string;
  accentColor?: 'blue' | 'purple' | 'success' | 'indigo';
  onClick?: () => void;
}

export const KPICard: React.FC<KPICardProps> = ({
  title,
  value,
  icon: Icon,
  trend,
  description,
  accentColor = 'blue',
  onClick
}) => {
  const colorStyles = {
    blue: {
      bgIcon: 'bg-[#E3F0FD] text-[#0754A6]',
      borderHover: 'hover:border-[#0877E8]'
    },
    purple: {
      bgIcon: 'bg-[#FFF3E6] text-[#003E82]',
      borderHover: 'hover:border-[#FF8A00]'
    },
    success: {
      bgIcon: 'bg-[#E7F8EE] text-[#1D7E4C]',
      borderHover: 'hover:border-[#35B779]'
    },
    indigo: {
      bgIcon: 'bg-[#FFF0DE] text-[#002E63]',
      borderHover: 'hover:border-[#003E82]'
    }
  };

  return (
    <div 
      onClick={onClick}
      className={`jahez-card p-5 relative overflow-hidden transition-all duration-200 ${colorStyles[accentColor].borderHover} ${onClick ? 'cursor-pointer' : ''}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-[#667085]">{title}</p>
          <div className="text-2xl sm:text-3xl font-bold text-[#172033] mt-2 tracking-tight">
            {value}
          </div>
        </div>
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${colorStyles[accentColor].bgIcon}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between text-xs pt-3 border-t border-[#F1F4F9]">
        {trend && (
          <div className={`flex items-center gap-1 font-semibold ${trend.isPositive ? 'text-[#35B779]' : 'text-[#E45B6A]'}`}>
            {trend.isPositive ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
            <span dir="ltr">{trend.value}</span>
          </div>
        )}
        {description && (
          <span className="text-[#667085] truncate">{description}</span>
        )}
      </div>
    </div>
  );
};
