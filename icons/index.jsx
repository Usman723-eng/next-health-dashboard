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
import ArrowLeftCircle from '@/public/assets/arrow-left-circle-icon.svg';
import StatusOptimal from '@/public/assets/optimal-icon.svg';
import StatusWarning from '@/public/assets/warning-icon.svg';
import BrainHealth from '@/public/assets/brain-health-icon.svg';
import Detoxification from '@/public/assets/detoxification-icon.svg';
import EmotionalHealth from '@/public/assets/emotional-health-icon.svg';
import GutHealth from '@/public/assets/gut-health-icon.svg';
import HeartHealth from '@/public/assets/heart-health-icon.svg';
import HormoneHealth from '@/public/assets/hormone-health-icon.svg';
import ImmuneHealth from '@/public/assets/immune-health-icon.svg';
import Longevity from '@/public/assets/longevity-icon.svg';
import Metabolic from '@/public/assets/metabolic-icon.svg';
import Movement from '@/public/assets/movement-icon.svg';
import Nutrition from '@/public/assets/nutrition-icon.svg';
import Inflammation from '@/public/assets/inflammation-icon.svg';
import LiverKidney from '@/public/assets/liver-kidney-icon.svg';
import Recovery from '@/public/assets/recovery-icon.svg';
import RegenerativeMedicine from '@/public/assets/regenerative-medicine-icon.svg';
import ToxinExposure from '@/public/assets/toxin-exposure-icon.svg';
import BrainHealthLarge from '@/public/assets/brain-health-icon-large.svg';
import DetoxificationLarge from '@/public/assets/detoxification-icon-large.svg';
import EmotionalHealthLarge from '@/public/assets/emotional-health-icon-large.svg';
import GutHealthLarge from '@/public/assets/gut-health-icon-large.svg';
import HeartHealthLarge from '@/public/assets/heart-health-icon-large.svg';
import HormoneHealthLarge from '@/public/assets/hormone-health-icon-large.svg';
import ImmuneHealthLarge from '@/public/assets/immune-health-icon-large.svg';
import LongevityLarge from '@/public/assets/longevity-icon-large.svg';
import MetabolicLarge from '@/public/assets/metabolic-icon-large.svg';
import MovementLarge from '@/public/assets/movement-icon-large.svg';
import NutritionLarge from '@/public/assets/nutrition-icon-large.svg';
import InflammationLarge from '@/public/assets/inflammation-icon-large.svg';
import LiverKidneyLarge from '@/public/assets/liver-kidney-icon-large.svg';
import RecoveryLarge from '@/public/assets/recovery-icon-large.svg';
import RegenerativeMedicineLarge from '@/public/assets/regenerative-medicine-icon-large.svg';
import ToxinExposureLarge from '@/public/assets/toxin-exposure-icon-large.svg';
import SidebarCollapse from '@/public/assets/sidebar-expand-icon.svg';
import WearablePin from '@/public/assets/pin-icon.svg';
import WearableAi from '@/public/assets/ai-icon.svg';
import AiChatClose from '@/public/assets/close-icon.svg';
import AiChatAttach from '@/public/assets/upload-document-icon.svg';
import AiChatVoice from '@/public/assets/voice-icon.svg';
import AllBiomarkersGrid from '@/public/assets/SquaresFour-icon.svg';
import AllBiomarkersGridLarge from '@/public/assets/biomarkers-grid-icon-large.svg';
import SummaryTotalBiomarkers from '@/public/assets/total-biomarkers-icon.svg';
import SummaryInRange from '@/public/assets/in-range-icon.svg';
import SummaryOutOfRange from '@/public/assets/out-of-range-icon.svg';
import SummaryCalendarDots from '@/public/assets/CalendarDots-icon.svg';
import CustomizeSetting from '@/public/assets/customize-setting-icon.svg';
import SortableIcon from '@/public/assets/sortable-icon.svg';
import RecordsTotal from '@/public/assets/total-records-icon.svg';
import RecordsQuestionMark from '@/public/assets/QuestionMark-icon.svg';
import RecordsLabResults from '@/public/assets/lub-results-icon.svg';
import RecordsImaging from '@/public/assets/imagine-icon.svg';
import RecordsGenetics from '@/public/assets/genetic-icon.svg';
import RecordsPrescription from '@/public/assets/Prescription-icon.svg';
import RecordsReports from '@/public/assets/reports-ChartLineUp-icon.svg';
import UploadSimple from '@/public/assets/UploadSimple-icon.svg';
import QuestionnaireArticle from '@/public/assets/ArticleNyTimes-icon.svg';
import RecordsEye from '@/public/assets/Eye-icon.svg';
import RecordsClock from '@/public/assets/Clock-icon.svg';
import RecordsDownload from '@/public/assets/DownloadSimple-icon.svg';
import RecordsTrash from '@/public/assets/Trash-icon.svg';
import ChartLineTab from '@/public/assets/line-chart-icon.svg';
import ChartBarTab from '@/public/assets/bar-chart-icon.svg';
import TrendUp from '@/public/assets/trend-up.svg';

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
  'arrow-left-circle': ArrowLeftCircle,
  'status-optimal': StatusOptimal,
  'status-warning': StatusWarning,
  'status-poor': SummaryOutOfRange,
  'brain-health': BrainHealth,
  'detoxification': Detoxification,
  'emotional-health': EmotionalHealth,
  'gut-health': GutHealth,
  'heart-health': HeartHealth,
  'hormone-health': HormoneHealth,
  'immune-health': ImmuneHealth,
  'inflammation': Inflammation,
  'liver-kidney': LiverKidney,
  'longevity': Longevity,
  'metabolic': Metabolic,
  'movement': Movement,
  'nutrition': Nutrition,
  'recovery': Recovery,
  'regenerative-medicine': RegenerativeMedicine,
  'toxin-exposure': ToxinExposure,
  'brain-health-large': BrainHealthLarge,
  'detoxification-large': DetoxificationLarge,
  'emotional-health-large': EmotionalHealthLarge,
  'gut-health-large': GutHealthLarge,
  'heart-health-large': HeartHealthLarge,
  'hormone-health-large': HormoneHealthLarge,
  'immune-health-large': ImmuneHealthLarge,
  'inflammation-large': InflammationLarge,
  'liver-kidney-large': LiverKidneyLarge,
  'longevity-large': LongevityLarge,
  'metabolic-large': MetabolicLarge,
  'movement-large': MovementLarge,
  'nutrition-large': NutritionLarge,
  'recovery-large': RecoveryLarge,
  'regenerative-medicine-large': RegenerativeMedicineLarge,
  'toxin-exposure-large': ToxinExposureLarge,
  'sidebar-collapse': SidebarCollapse,
  'wearable-pin': WearablePin,
  'wearable-ai': WearableAi,
  'ai-chat-close': AiChatClose,
  'ai-chat-attach': AiChatAttach,
  'ai-chat-voice': AiChatVoice,
  'all-biomarkers-grid': AllBiomarkersGrid,
  'all-biomarkers-grid-large': AllBiomarkersGridLarge,
  'summary-total-biomarkers': SummaryTotalBiomarkers,
  'summary-in-range': SummaryInRange,
  'summary-out-of-range': SummaryOutOfRange,
  'summary-calendar-dots': SummaryCalendarDots,
  'customize-setting': CustomizeSetting,
  sortable: SortableIcon,
  'records-total': RecordsTotal,
  'records-questionnaire': RecordsQuestionMark,
  'records-lab-results': RecordsLabResults,
  'records-imaging': RecordsImaging,
  'records-genetics': RecordsGenetics,
  'records-prescription': RecordsPrescription,
  'records-reports': RecordsReports,
  'upload-simple': UploadSimple,
  'questionnaire-article': QuestionnaireArticle,
  'records-eye': RecordsEye,
  'records-calendar': SummaryCalendarDots,
  'records-clock': RecordsClock,
  'records-download': RecordsDownload,
  'records-trash': RecordsTrash,
  'records-ask-ai': WearableAi,
  'chart-line': ChartLineTab,
  'chart-bar': ChartBarTab,
  'trend-up': TrendUp,
};

export default function Icon({ name, size = 24, color = 'currentColor', fill = 'none', className = '' }) {
  const SvgComponent = icons[name];
  if (!SvgComponent) return null;
  return createElement(SvgComponent, { width: size, height: size, fill: fill, stroke: color, className });
}