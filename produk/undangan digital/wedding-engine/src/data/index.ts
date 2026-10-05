import { InvitationData } from '@/types';
import { vintageGardenTemplate } from './vintageGardenTemplate';

export const templatesRegistry: Record<string, InvitationData> = {
  'vintage-garden-04': vintageGardenTemplate,
  'vintage-04': vintageGardenTemplate,
  'default': vintageGardenTemplate,
};

export function getInvitationTemplate(slug?: string): InvitationData {
  if (!slug) return vintageGardenTemplate;
  return templatesRegistry[slug] || vintageGardenTemplate;
}

export { vintageGardenTemplate };
