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
import CheckGreen from '@/public/assets/check-score-icon.svg'; 
import CaretRight from '@/public/assets/arrow-right.svg';
import BrainHealth from '@/public/assets/brain-health-icon.svg';
import Detoxification from '@/public/assets/detoxification-icon.svg';
import EmotionalHealth from '@/public/assets/emotional-health-icon.svg';
import GutHealth from '@/public/assets/gut-health-icon.svg';
import HeartHealth from '@/public/assets/heart-health-icon.svg';
import HormoneHealth from '@/public/assets/hormone-health-icon.svg';
import ImmuneHealth from '@/public/assets/immune-health-icon.svg';
import Longevity from '@/public/assets/longevity-icon.svg';
import Movement from '@/public/assets/movement-icon.svg';
import Nutrition from '@/public/assets/nutrition-icon.svg';
import Recovery from '@/public/assets/recovery-icon.svg';
import RegenerativeMedicine from '@/public/assets/regenerative-medicine-icon.svg';
import BrainHealthLarge from '@/public/assets/brain-health-icon-large.svg';
import DetoxificationLarge from '@/public/assets/detoxification-icon-large.svg';
import EmotionalHealthLarge from '@/public/assets/emotional-health-icon-large.svg';
import GutHealthLarge from '@/public/assets/gut-health-icon-large.svg';
import HeartHealthLarge from '@/public/assets/heart-health-icon-large.svg';
import HormoneHealthLarge from '@/public/assets/hormone-health-icon-large.svg';
import ImmuneHealthLarge from '@/public/assets/immune-health-icon-large.svg';
import LongevityLarge from '@/public/assets/longevity-icon-large.svg';
import MovementLarge from '@/public/assets/movement-icon-large.svg';
import NutritionLarge from '@/public/assets/nutrition-icon-large.svg';
import RecoveryLarge from '@/public/assets/recovery-icon-large.svg';
import RegenerativeMedicineLarge from '@/public/assets/regenerative-medicine-icon-large.svg';
import SidebarCollapse from '@/public/assets/sidebar-expand-icon.svg';

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
  'check-green': CheckGreen,
  'caret-right': CaretRight,
  'brain-health': BrainHealth,
  'detoxification': Detoxification,
  'emotional-health': EmotionalHealth,
  'gut-health': GutHealth,
  'heart-health': HeartHealth,
  'hormone-health': HormoneHealth,
  'immune-health': ImmuneHealth,
  'longevity': Longevity,
  'movement': Movement,
  'nutrition': Nutrition,
  'recovery': Recovery,
  'regenerative-medicine': RegenerativeMedicine,
  'brain-health-large': BrainHealthLarge,
  'detoxification-large': DetoxificationLarge,
  'emotional-health-large': EmotionalHealthLarge,
  'gut-health-large': GutHealthLarge,
  'heart-health-large': HeartHealthLarge,
  'hormone-health-large': HormoneHealthLarge,
  'immune-health-large': ImmuneHealthLarge,
  'longevity-large': LongevityLarge,
  'movement-large': MovementLarge,
  'nutrition-large': NutritionLarge,
  'recovery-large': RecoveryLarge,
  'regenerative-medicine-large': RegenerativeMedicineLarge,
  'sidebar-collapse': SidebarCollapse,
};

export default function Icon({ name, size = 24, color = 'currentColor', fill = 'none', className = '' }) {
  const SvgComponent = icons[name];
  if (!SvgComponent) return null;
  return createElement(SvgComponent, { width: size, height: size, fill: fill, stroke: color, className });
}