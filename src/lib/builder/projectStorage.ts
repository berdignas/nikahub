import { GlobalProjectConfig } from '../../types/builder';
import { DEFAULT_INITIAL_PROJECT } from './presets';

const STORAGE_KEY_LIST = 'nikahhub_builder_projects_list';
const STORAGE_KEY_ACTIVE_ID = 'nikahhub_builder_active_project_id';
const STORAGE_KEY_LEGACY = 'nikahhub_wedding_builder_project';

// Initial Demo/Seed Projects
const createSeedProjects = (): GlobalProjectConfig[] => {
  // Base 1: Dion & Sarah (Completed)
  const projDion: GlobalProjectConfig = {
    ...DEFAULT_INITIAL_PROJECT,
    id: 'proj-dion-sarah',
    title: 'The Wedding of Dion & Sarah',
    status: 'completed',
    createdAt: '2026-10-04T10:00:00.000Z',
    updatedAt: new Date(Date.now() - 3600 * 1000 * 24).toISOString(), // Kemarin
  };

  // Base 2: Maulidiyah & Alfarisyi (In Progress - Sedang Berjalan)
  const projMaulidiyah: GlobalProjectConfig = {
    ...JSON.parse(JSON.stringify(DEFAULT_INITIAL_PROJECT)),
    id: 'proj-maulidiyah-alfarisyi',
    title: 'The Wedding of Maulidiyah & Alfarisyi',
    groomName: 'Alfarisyi Akbar, S.T.',
    brideName: 'Maulidiyah Putri, S.Farm.',
    eventDate: '2026-12-12',
    monogram: 'M & A',
    activePalette: 'champagne-gold',
    status: 'in_progress',
    createdAt: '2026-10-05T08:30:00.000Z',
    updatedAt: new Date(Date.now() - 3600 * 1000 * 2).toISOString(), // 2 jam lalu
  };

  // Base 3: Raden & Annisa (In Progress - Draft)
  const projRaden: GlobalProjectConfig = {
    ...JSON.parse(JSON.stringify(DEFAULT_INITIAL_PROJECT)),
    id: 'proj-raden-annisa',
    title: 'The Wedding of Raden & Annisa',
    groomName: 'Raden Mas Bagus',
    brideName: 'Annisa Larasati',
    eventDate: '2027-01-18',
    monogram: 'R & A',
    activePalette: 'dusty-rose',
    status: 'in_progress',
    createdAt: '2026-10-06T15:00:00.000Z',
    updatedAt: new Date(Date.now() - 3600 * 1000 * 18).toISOString(),
  };

  return [projMaulidiyah, projDion, projRaden];
};

/**
 * Retrieve all projects from localStorage.
 * Automatically migrates legacy single-project storage if present.
 */
export function getAllProjects(): GlobalProjectConfig[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_LIST);
    if (raw) {
      const list: GlobalProjectConfig[] = JSON.parse(raw);
      if (Array.isArray(list) && list.length > 0) {
        return list;
      }
    }

    // Check legacy single-project storage
    const legacyRaw = localStorage.getItem(STORAGE_KEY_LEGACY);
    const seedList = createSeedProjects();

    if (legacyRaw) {
      try {
        const legacyProj = JSON.parse(legacyRaw);
        if (legacyProj && legacyProj.id) {
          // Put user's existing work at the front
          const merged = [
            {
              ...legacyProj,
              id: legacyProj.id || 'proj-user-custom',
              status: legacyProj.status || 'in_progress',
              updatedAt: legacyProj.updatedAt || new Date().toISOString()
            },
            ...seedList.filter(p => p.id !== legacyProj.id)
          ];
          localStorage.setItem(STORAGE_KEY_LIST, JSON.stringify(merged));
          return merged;
        }
      } catch {
        // ignore legacy parsing error
      }
    }

    // Default seed
    localStorage.setItem(STORAGE_KEY_LIST, JSON.stringify(seedList));
    return seedList;
  } catch (err) {
    console.error('Error fetching projects list:', err);
    return createSeedProjects();
  }
}

/**
 * Get active project ID currently selected for editing.
 */
export function getActiveProjectId(): string {
  try {
    const id = localStorage.getItem(STORAGE_KEY_ACTIVE_ID);
    if (id) return id;
    const all = getAllProjects();
    return all[0]?.id || 'proj-maulidiyah-alfarisyi';
  } catch {
    return 'proj-maulidiyah-alfarisyi';
  }
}

/**
 * Set active project ID.
 */
export function setActiveProjectId(id: string): void {
  try {
    localStorage.setItem(STORAGE_KEY_ACTIVE_ID, id);
  } catch {
    // ignore
  }
}

/**
 * Get single project by ID.
 */
export function getProjectById(id: string): GlobalProjectConfig {
  const all = getAllProjects();
  const found = all.find(p => p.id === id);
  if (found) return found;

  // Fallback to first project or default
  return all[0] || DEFAULT_INITIAL_PROJECT;
}

/**
 * Save / Auto-save project back into localStorage list.
 */
export function saveProject(updatedProject: GlobalProjectConfig): void {
  try {
    const all = getAllProjects();
    const nowIso = new Date().toISOString();
    const preparedProject: GlobalProjectConfig = {
      ...updatedProject,
      updatedAt: nowIso,
      status: updatedProject.status || 'in_progress'
    };

    const index = all.findIndex(p => p.id === preparedProject.id);
    if (index >= 0) {
      all[index] = preparedProject;
    } else {
      all.unshift(preparedProject);
    }

    localStorage.setItem(STORAGE_KEY_LIST, JSON.stringify(all));
    localStorage.setItem(STORAGE_KEY_ACTIVE_ID, preparedProject.id);

    // Keep legacy key synced for fallback
    localStorage.setItem(STORAGE_KEY_LEGACY, JSON.stringify(preparedProject));
  } catch (err) {
    console.warn('Auto-save to localStorage failed (quota or error):', err);
  }
}

/**
 * Create a new blank or templated project.
 */
export function createNewProject(params: {
  title: string;
  groomName: string;
  brideName: string;
  eventDate?: string;
  activePalette?: string;
}): GlobalProjectConfig {
  const all = getAllProjects();
  const newId = `proj-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;

  const groomInitial = (params.groomName.trim() || 'A').charAt(0).toUpperCase();
  const brideInitial = (params.brideName.trim() || 'B').charAt(0).toUpperCase();
  const monogram = `${groomInitial} & ${brideInitial}`;

  // Clone default sections with adapted content
  const clonedBase = JSON.parse(JSON.stringify(DEFAULT_INITIAL_PROJECT));
  
  // Customize couple name in cover if element exists
  if (clonedBase.sections && clonedBase.sections[0]?.elements) {
    const nameEl = clonedBase.sections[0].elements.find((el: any) => el.id === 'el-cover-names');
    if (nameEl) {
      nameEl.content = `${params.groomName || 'Pengantin Pria'} & ${params.brideName || 'Pengantin Wanita'}`;
    }
  }

  const newProject: GlobalProjectConfig = {
    ...clonedBase,
    id: newId,
    title: params.title || `The Wedding of ${params.groomName} & ${params.brideName}`,
    groomName: params.groomName,
    brideName: params.brideName,
    eventDate: params.eventDate || '2026-12-25',
    monogram,
    activePalette: params.activePalette || 'sage-botanical',
    status: 'in_progress', // Draft yang sedang berjalan
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  all.unshift(newProject);
  localStorage.setItem(STORAGE_KEY_LIST, JSON.stringify(all));
  localStorage.setItem(STORAGE_KEY_ACTIVE_ID, newId);
  localStorage.setItem(STORAGE_KEY_LEGACY, JSON.stringify(newProject));

  return newProject;
}

/**
 * Duplicate an existing project.
 */
export function duplicateProject(id: string): GlobalProjectConfig | null {
  const all = getAllProjects();
  const source = all.find(p => p.id === id);
  if (!source) return null;

  const newId = `proj-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
  const copy: GlobalProjectConfig = {
    ...JSON.parse(JSON.stringify(source)),
    id: newId,
    title: `${source.title} (Salinan)`,
    status: 'in_progress',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  all.unshift(copy);
  localStorage.setItem(STORAGE_KEY_LIST, JSON.stringify(all));
  return copy;
}

/**
 * Delete a project by ID.
 */
export function deleteProject(id: string): boolean {
  const all = getAllProjects();
  const filtered = all.filter(p => p.id !== id);
  if (filtered.length === all.length) return false;

  // Ensure at least 1 project exists
  if (filtered.length === 0) {
    const fresh = createSeedProjects();
    localStorage.setItem(STORAGE_KEY_LIST, JSON.stringify(fresh));
    localStorage.setItem(STORAGE_KEY_ACTIVE_ID, fresh[0].id);
    return true;
  }

  localStorage.setItem(STORAGE_KEY_LIST, JSON.stringify(filtered));
  const activeId = getActiveProjectId();
  if (activeId === id) {
    localStorage.setItem(STORAGE_KEY_ACTIVE_ID, filtered[0].id);
  }
  return true;
}

/**
 * Toggle or update status of a project.
 */
export function updateProjectStatus(id: string, status: 'in_progress' | 'completed' | 'draft'): void {
  const all = getAllProjects();
  const p = all.find(item => item.id === id);
  if (p) {
    p.status = status;
    p.updatedAt = new Date().toISOString();
    localStorage.setItem(STORAGE_KEY_LIST, JSON.stringify(all));
  }
}
