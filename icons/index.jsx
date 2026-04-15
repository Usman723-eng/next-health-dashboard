import { createElement } from 'react';

import BiomarkersBlack from '@/public/assets/biomarkers-icon-black.svg';
import BiomarkersGray from '@/public/assets/biomarkers-icon-gray.svg';
import BiomarkersPrimary from '@/public/assets/biomarkers-icon-primary.svg';
import BiomarkersWhite from '@/public/assets/biomarkers-icon-white.svg';
import DeviceGray from '@/public/assets/device-icon-gray.svg';
import DevicePrimary from '@/public/assets/device-icon-primary.svg';
import DeviceWhite from '@/public/assets/device-icon-white.svg';
import HealthPlanGray from '@/public/assets/health-plan-icon-gray.svg';
import HealthPlanPrimary from '@/public/assets/health-plan-icon-primary.svg';
import HealthPlanWhite from '@/public/assets/health-plan-icon-white.svg';
import HomeBlack from '@/public/assets/home-icon-black.svg';
import HomeGray from '@/public/assets/home-icon-gray.svg';
import HomePrimary from '@/public/assets/home-icon-primary.svg';
import HomeWhite from '@/public/assets/home-icon-white.svg';

const icons = {
  'biomarkers-black': BiomarkersBlack,
  'biomarkers-gray': BiomarkersGray,
  'biomarkers-primary': BiomarkersPrimary,
  'biomarkers-white': BiomarkersWhite,
  'device-gray': DeviceGray,
  'device-primary': DevicePrimary,
  'device-white': DeviceWhite,
  'health-plan-gray': HealthPlanGray,
  'health-plan-primary': HealthPlanPrimary,
  'health-plan-white': HealthPlanWhite,
  'home-black': HomeBlack,
  'home-gray': HomeGray,
  'home-primary': HomePrimary,
  'home-white': HomeWhite,
};

export default function Icon({ name, size = 24, color = 'currentColor', fill = 'none', className = '' }) {
  const SvgComponent = icons[name];
  if (!SvgComponent) return null;
  return createElement(SvgComponent, { width: size, height: size, fill: fill, stroke: color, className });
}