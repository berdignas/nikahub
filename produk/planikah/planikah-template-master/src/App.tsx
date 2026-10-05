import React, { useState, useEffect, useMemo } from 'react';
import { Navbar, ActiveTabType } from './components/Navbar';
import { ProfileHeader } from './components/ProfileHeader';
import { DashboardOverview } from './components/DashboardOverview';
import { ChecklistManager } from './components/ChecklistManager';
import { BudgetTracker } from './components/BudgetTracker';
import { GuestManager } from './components/GuestManager';
import { RundownManager } from './components/RundownManager';
import { GateReception } from './components/GateReception';
import { CateringEstimator } from './components/CateringEstimator';
import { GiftAngpaoTracker } from './components/GiftAngpaoTracker';
import { PostWeddingAudit } from './components/PostWeddingAudit';
import { ProfileView } from './components/ProfileView';

// Modals
import { TaskModal } from './components/TaskModal';
import { ExpenseModal } from './components/ExpenseModal';
import { TerminModal } from './components/TerminModal';
import { GuestModal } from './components/GuestModal';
import { WhatsAppBlastModal } from './components/WhatsAppBlastModal';
import { RundownModal } from './components/RundownModal';
import { GiftModal } from './components/GiftModal';
import { ProfileEditorModal } from './components/ProfileEditorModal';
import { ExportReportModal } from './components/ExportReportModal';

// Data & Types
import { 
  defaultProfile, 
  defaultTasks, 
  defaultExpenses, 
  defaultGuests, 
  defaultRundowns,
  defaultGifts,
  defaultCateringMenus,
  defaultVendorReviews
} from './data/defaultData';
import { 
  WeddingProfile, 
  WeddingTask, 
  WeddingExpense, 
  BudgetSummary, 
  PaymentTermin,
  WeddingGuest,
  WeddingRundownItem,
  WeddingGift,
  CateringMenuItem,
  VendorReview
} from './types/wedding';

const STORAGE_KEYS = {
  PROFILE: 'planikah_master_profile_v5_clean_zero',
  TASKS: 'planikah_master_tasks_v5_clean_zero',
  EXPENSES: 'planikah_master_expenses_v5_clean_zero',
  GUESTS: 'planikah_master_guests_v5_clean_zero',
  RUNDOWNS: 'planikah_master_rundowns_v5_clean_zero',
  GIFTS: 'planikah_master_gifts_v5_clean_zero',
  CATERING: 'planikah_master_catering_v5_clean_zero',
  REVIEWS: 'planikah_master_reviews_v5_clean_zero'
};

export const App: React.FC = () => {
  // 1. Profile State
  const [profile, setProfile] = useState<WeddingProfile>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PROFILE);
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return defaultProfile;
  });

  // 2. Tasks State
  const [tasks, setTasks] = useState<WeddingTask[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.TASKS);
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return defaultTasks;
  });

  // 3. Expenses State
  const [expenses, setExpenses] = useState<WeddingExpense[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.EXPENSES);
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return defaultExpenses;
  });

  // 4. Guests State
  const [guests, setGuests] = useState<WeddingGuest[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.GUESTS);
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return defaultGuests;
  });

  // 5. Rundowns State
  const [rundowns, setRundowns] = useState<WeddingRundownItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.RUNDOWNS);
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return defaultRundowns;
  });

  // 6. Gifts State (Sprint 3)
  const [gifts, setGifts] = useState<WeddingGift[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.GIFTS);
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return defaultGifts;
  });

  // 7. Catering State (Sprint 3)
  const [cateringMenus, setCateringMenus] = useState<CateringMenuItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CATERING);
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return defaultCateringMenus;
  });

  // 8. Vendor Reviews State (Sprint 3)
  const [vendorReviews, setVendorReviews] = useState<VendorReview[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.REVIEWS);
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return defaultVendorReviews;
  });

  // Active Navigation Tab
  const [activeTab, setActiveTab] = useState<ActiveTabType>('dashboard');

  // Modal States
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<WeddingTask | null>(null);

  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<WeddingExpense | null>(null);

  const [isTerminModalOpen, setIsTerminModalOpen] = useState(false);
  const [terminActiveExpense, setTerminActiveExpense] = useState<WeddingExpense | null>(null);

  const [isGuestModalOpen, setIsGuestModalOpen] = useState(false);
  const [selectedGuest, setSelectedGuest] = useState<WeddingGuest | null>(null);

  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);
  const [whatsAppGuest, setWhatsAppGuest] = useState<WeddingGuest | null>(null);

  const [isRundownModalOpen, setIsRundownModalOpen] = useState(false);
  const [selectedRundown, setSelectedRundown] = useState<WeddingRundownItem | null>(null);

  const [isGiftModalOpen, setIsGiftModalOpen] = useState(false);
  const [selectedGift, setSelectedGift] = useState<WeddingGift | null>(null);

  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  // Clear legacy storage keys on mount
  useEffect(() => {
    try {
      const keysToRemove: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('planikah_') && !key.includes('v5_clean_zero')) {
          keysToRemove.push(key);
        }
      }
      keysToRemove.forEach(k => localStorage.removeItem(k));
    } catch {}
  }, []);

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.EXPENSES, JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.GUESTS, JSON.stringify(guests));
  }, [guests]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.RUNDOWNS, JSON.stringify(rundowns));
  }, [rundowns]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.GIFTS, JSON.stringify(gifts));
  }, [gifts]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CATERING, JSON.stringify(cateringMenus));
  }, [cateringMenus]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(vendorReviews));
  }, [vendorReviews]);

  // Compute Overall Financial Summary
  const summary: BudgetSummary = useMemo(() => {
    const totalTarget = profile.target_budget || 0;
    let totalEstimated = 0;
    let totalActual = 0;
    let totalPaid = 0;

    expenses.forEach(exp => {
      const itemCost = exp.actual_cost || exp.estimated_cost;
      totalEstimated += exp.estimated_cost;
      totalActual += itemCost;

      const itemPaid = exp.termins
        .filter(t => t.is_paid)
        .reduce((sum, t) => sum + t.amount, 0);
      totalPaid += itemPaid;
    });

    const remainingObligation = Math.max(0, totalActual - totalPaid);
    const overBudgetAmount = totalActual > totalTarget ? totalActual - totalTarget : 0;
    const paidPercentage = totalActual > 0 ? Math.round((totalPaid / totalActual) * 100) : 0;

    return {
      totalTarget,
      totalEstimated,
      totalActual,
      totalPaid,
      remainingObligation,
      overBudgetAmount,
      paidPercentage
    };
  }, [profile.target_budget, expenses]);

  // Checked-in guests for thank you messages
  const checkedInGuests = useMemo(() => {
    return guests.filter(g => g.checked_in);
  }, [guests]);

  // ================= TASK HANDLERS =================
  const handleToggleTask = (taskId: string) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, is_completed: !t.is_completed } : t));
  };

  const handleOpenAddTask = () => {
    setSelectedTask(null);
    setIsTaskModalOpen(true);
  };

  const handleOpenEditTask = (task: WeddingTask) => {
    setSelectedTask(task);
    setIsTaskModalOpen(true);
  };

  const handleSaveTask = (taskData: Partial<WeddingTask>) => {
    if (selectedTask) {
      setTasks(prev => prev.map(t => t.id === selectedTask.id ? { ...t, ...taskData } : t));
    } else {
      const newTask: WeddingTask = {
        id: `task-${Date.now()}`,
        wedding_id: profile.id,
        title: taskData.title || '',
        category: taskData.category || 'Venue & Dekorasi',
        phase: taskData.phase || 'H-6 sd H-3 Bulan',
        priority: taskData.priority || 'Sedang',
        assigned_to: taskData.assigned_to || 'Bersama',
        due_date: taskData.due_date || new Date().toISOString().split('T')[0],
        is_completed: false,
        notes: taskData.notes
      };
      setTasks(prev => [newTask, ...prev]);
    }
  };

  const handleDeleteTask = (taskId: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus tugas ini?')) {
      setTasks(prev => prev.filter(t => t.id !== taskId));
    }
  };

  // ================= EXPENSE & TERMIN HANDLERS =================
  const handleOpenAddExpense = () => {
    setSelectedExpense(null);
    setIsExpenseModalOpen(true);
  };

  const handleOpenEditExpense = (expense: WeddingExpense) => {
    setSelectedExpense(expense);
    setIsExpenseModalOpen(true);
  };

  const handleSaveExpense = (expenseData: Partial<WeddingExpense>) => {
    if (selectedExpense) {
      setExpenses(prev => prev.map(e => e.id === selectedExpense.id ? { ...e, ...expenseData } : e));
    } else {
      const est = expenseData.estimated_cost || 0;
      const act = expenseData.actual_cost || est;
      const newExpenseId = `exp-${Date.now()}`;
      
      const defaultTermins: PaymentTermin[] = [
        {
          id: `t-${Date.now()}-1`,
          expense_id: newExpenseId,
          title: 'DP 1 (Booking)',
          amount: Math.round(act * 0.3),
          due_date: new Date().toISOString().split('T')[0],
          is_paid: false,
          payment_method: 'Transfer Bank'
        },
        {
          id: `t-${Date.now()}-2`,
          expense_id: newExpenseId,
          title: 'Pelunasan (H-14)',
          amount: act - Math.round(act * 0.3),
          due_date: profile.wedding_date,
          is_paid: false,
          payment_method: 'Transfer Bank'
        }
      ];

      const newExpense: WeddingExpense = {
        id: newExpenseId,
        wedding_id: profile.id,
        category: expenseData.category || 'Venue & Dekorasi',
        item_name: expenseData.item_name || '',
        vendor_name: expenseData.vendor_name || '',
        vendor_contact: expenseData.vendor_contact,
        estimated_cost: est,
        actual_cost: act,
        payer: expenseData.payer || 'Bersama',
        status: expenseData.status || 'Belum Bayar',
        notes: expenseData.notes,
        termins: defaultTermins
      };

      setExpenses(prev => [newExpense, ...prev]);
    }
  };

  const handleDeleteExpense = (expenseId: string) => {
    if (confirm('Hapus pos pengeluaran ini dan seluruh catatan terminnya?')) {
      setExpenses(prev => prev.filter(e => e.id !== expenseId));
    }
  };

  const handleOpenTerminModal = (expense: WeddingExpense) => {
    setTerminActiveExpense(expense);
    setIsTerminModalOpen(true);
  };

  const handleSaveTermins = (expenseId: string, updatedTermins: PaymentTermin[]) => {
    setExpenses(prev => prev.map(exp => {
      if (exp.id === expenseId) {
        const totalPaid = updatedTermins.filter(t => t.is_paid).reduce((sum, t) => sum + t.amount, 0);
        const totalCost = exp.actual_cost || exp.estimated_cost;
        
        let newStatus = exp.status;
        if (totalPaid >= totalCost && totalCost > 0) {
          newStatus = 'Lunas';
        } else if (totalPaid > 0) {
          newStatus = 'DP / Cicilan';
        } else {
          newStatus = 'Belum Bayar';
        }

        return {
          ...exp,
          termins: updatedTermins,
          status: newStatus
        };
      }
      return exp;
    }));
  };

  // ================= GUEST & RECEPTION HANDLERS =================
  const handleOpenAddGuest = () => {
    setSelectedGuest(null);
    setIsGuestModalOpen(true);
  };

  const handleOpenEditGuest = (guest: WeddingGuest) => {
    setSelectedGuest(guest);
    setIsGuestModalOpen(true);
  };

  const handleSaveGuest = (guestData: Partial<WeddingGuest>) => {
    if (selectedGuest) {
      setGuests(prev => prev.map(g => g.id === selectedGuest.id ? { ...g, ...guestData } : g));
    } else {
      const newGuest: WeddingGuest = {
        id: `guest-${Date.now()}`,
        wedding_id: profile.id,
        name: guestData.name || '',
        phone_number: guestData.phone_number,
        side: guestData.side || 'Bersama',
        tier: guestData.tier || 'VIP',
        pax_allotted: guestData.pax_allotted || 2,
        pax_confirmed: guestData.pax_confirmed || 0,
        rsvp_status: guestData.rsvp_status || 'Menunggu Konfirmasi',
        table_number: guestData.table_number,
        qr_token: guestData.qr_token || `TKN-${Date.now().toString().slice(-6)}`,
        dietary_notes: guestData.dietary_notes,
        custom_notes: guestData.custom_notes,
        invitation_sent: false
      };
      setGuests(prev => [newGuest, ...prev]);
    }
  };

  const handleDeleteGuest = (guestId: string) => {
    if (confirm('Hapus tamu undangan ini?')) {
      setGuests(prev => prev.filter(g => g.id !== guestId));
    }
  };

  const handleOpenWhatsAppModal = (guest: WeddingGuest) => {
    setWhatsAppGuest(guest);
    setIsWhatsAppModalOpen(true);
  };

  const handleMarkInvitationSent = (guestId: string) => {
    setGuests(prev => prev.map(g => {
      if (g.id === guestId) {
        return {
          ...g,
          invitation_sent: true,
          sent_date: new Date().toISOString().split('T')[0]
        };
      }
      return g;
    }));
  };

  const handleToggleCheckIn = (guestId: string) => {
    setGuests(prev => prev.map(g => {
      if (g.id === guestId) {
        const nextState = !g.checked_in;
        return {
          ...g,
          checked_in: nextState,
          checked_in_at: nextState ? new Date().toISOString() : undefined
        };
      }
      return g;
    }));
  };

  const handleToggleSouvenir = (guestId: string) => {
    setGuests(prev => prev.map(g => {
      if (g.id === guestId) {
        return {
          ...g,
          souvenir_claimed: !g.souvenir_claimed
        };
      }
      return g;
    }));
  };

  // ================= RUNDOWN HANDLERS =================
  const handleOpenAddRundown = () => {
    setSelectedRundown(null);
    setIsRundownModalOpen(true);
  };

  const handleOpenEditRundown = (item: WeddingRundownItem) => {
    setSelectedRundown(item);
    setIsRundownModalOpen(true);
  };

  const handleSaveRundown = (rundownData: Partial<WeddingRundownItem>) => {
    if (selectedRundown) {
      setRundowns(prev => prev.map(r => r.id === selectedRundown.id ? { ...r, ...rundownData } : r));
    } else {
      const newItem: WeddingRundownItem = {
        id: `rd-${Date.now()}`,
        wedding_id: profile.id,
        session: rundownData.session || 'Akad Nikah / Pemberkatan',
        start_time: rundownData.start_time || '08:00',
        end_time: rundownData.end_time || '09:00',
        activity_title: rundownData.activity_title || '',
        pic_name: rundownData.pic_name || 'Tim WO',
        pic_phone: rundownData.pic_phone,
        location_spot: rundownData.location_spot || 'Panggung Pelaminan',
        music_audio_cue: rundownData.music_audio_cue,
        lighting_cue: rundownData.lighting_cue,
        logistics_notes: rundownData.logistics_notes,
        is_completed: false
      };
      setRundowns(prev => [...prev, newItem]);
    }
  };

  const handleDeleteRundown = (itemId: string) => {
    if (confirm('Hapus sesi acara ini dari Master Rundown?')) {
      setRundowns(prev => prev.filter(r => r.id !== itemId));
    }
  };

  const handleToggleRundownComplete = (itemId: string) => {
    setRundowns(prev => prev.map(r => r.id === itemId ? { ...r, is_completed: !r.is_completed } : r));
  };

  // ================= CATERING HANDLERS (SPRINT 3) =================
  const handleAddCateringRefill = (menuId: string, amount: number) => {
    setCateringMenus(prev => prev.map(m => {
      if (m.id === menuId) {
        const newPrepared = m.portion_prepared + amount;
        return {
          ...m,
          portion_prepared: newPrepared,
          refill_count: m.refill_count + 1,
          status: (m.portion_consumed / newPrepared) > 0.85 ? 'Menipis' : 'Aman'
        };
      }
      return m;
    }));
  };

  const handleUpdateCateringConsumed = (menuId: string, consumed: number) => {
    setCateringMenus(prev => prev.map(m => {
      if (m.id === menuId) {
        const percentage = consumed / m.portion_prepared;
        let newStatus: 'Aman' | 'Menipis' | 'Habis' = 'Aman';
        if (consumed >= m.portion_prepared) newStatus = 'Habis';
        else if (percentage > 0.8) newStatus = 'Menipis';

        return {
          ...m,
          portion_consumed: consumed,
          status: newStatus
        };
      }
      return m;
    }));
  };

  const handleAddCateringMenu = (newItem: Partial<CateringMenuItem>) => {
    const newMenu: CateringMenuItem = {
      id: `cat-${Date.now()}`,
      wedding_id: profile.id,
      name: newItem.name || '',
      type: newItem.type || 'Food Stall / Gubukan',
      portion_prepared: newItem.portion_prepared || 300,
      portion_consumed: 0,
      refill_count: 0,
      status: 'Aman',
      notes: newItem.notes
    };
    setCateringMenus(prev => [...prev, newMenu]);
  };

  // ================= GIFTS / ANGPAO HANDLERS (SPRINT 3) =================
  const handleOpenAddGift = () => {
    setSelectedGift(null);
    setIsGiftModalOpen(true);
  };

  const handleOpenEditGift = (gift: WeddingGift) => {
    setSelectedGift(gift);
    setIsGiftModalOpen(true);
  };

  const handleSaveGift = (giftData: Partial<WeddingGift>) => {
    if (selectedGift) {
      setGifts(prev => prev.map(g => g.id === selectedGift.id ? { ...g, ...giftData } : g));
    } else {
      const newGift: WeddingGift = {
        id: `gift-${Date.now()}`,
        wedding_id: profile.id,
        envelope_number: giftData.envelope_number || `ENV-${Date.now().toString().slice(-3)}`,
        giver_name: giftData.giver_name || '',
        giver_phone: giftData.giver_phone,
        gift_type: giftData.gift_type || 'Amplop Tunai',
        amount: giftData.amount || 0,
        item_description: giftData.item_description,
        recipient_side: giftData.recipient_side || 'Bersama',
        thank_you_sent: false,
        notes: giftData.notes
      };
      setGifts(prev => [newGift, ...prev]);
    }
  };

  const handleDeleteGift = (giftId: string) => {
    if (confirm('Hapus catatan amplop/hadiah ini?')) {
      setGifts(prev => prev.filter(g => g.id !== giftId));
    }
  };

  const handleToggleGiftThankYou = (giftId: string) => {
    setGifts(prev => prev.map(g => g.id === giftId ? { ...g, thank_you_sent: !g.thank_you_sent } : g));
  };

  // ================= VENDOR REVIEW HANDLERS (SPRINT 3) =================
  const handleAddVendorReview = (newReview: Partial<VendorReview>) => {
    const review: VendorReview = {
      id: `rev-${Date.now()}`,
      wedding_id: profile.id,
      vendor_name: newReview.vendor_name || '',
      category: newReview.category || 'Venue & Dekorasi',
      rating_stars: newReview.rating_stars || 5,
      feedback_notes: newReview.feedback_notes || '',
      is_recommended: (newReview.rating_stars || 5) >= 4
    };
    setVendorReviews(prev => [review, ...prev]);
  };

  const handleDeleteVendorReview = (reviewId: string) => {
    if (confirm('Hapus ulasan vendor ini?')) {
      setVendorReviews(prev => prev.filter(r => r.id !== reviewId));
    }
  };

  // Profile Save
  const handleSaveProfile = (updatedProfile: Partial<WeddingProfile>) => {
    setProfile(prev => ({ ...prev, ...updatedProfile }));
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-900 flex flex-col antialiased">
      
      {/* Top Main Navigation */}
      <Navbar
        profile={profile}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onExport={() => setIsExportModalOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        
        {/* Profile Hero Banner */}
        <ProfileHeader
          profile={profile}
          tasks={tasks}
          summary={summary}
          onEditProfile={() => setIsProfileModalOpen(true)}
        />

        {/* Tab 1: Dashboard Overview */}
        {activeTab === 'dashboard' && (
          <DashboardOverview
            profile={profile}
            tasks={tasks}
            expenses={expenses}
            guests={guests}
            rundowns={rundowns}
            summary={summary}
            onNavigateTab={setActiveTab}
            onToggleTask={handleToggleTask}
            onOpenTerminModal={handleOpenTerminModal}
          />
        )}

        {/* Tab 2: Smart Checklist */}
        {activeTab === 'checklist' && (
          <ChecklistManager
            tasks={tasks}
            onToggleTask={handleToggleTask}
            onAddTask={handleOpenAddTask}
            onEditTask={handleOpenEditTask}
            onDeleteTask={handleDeleteTask}
          />
        )}

        {/* Tab 3: Budget & Termin Tracker */}
        {activeTab === 'budget' && (
          <BudgetTracker
            expenses={expenses}
            summary={summary}
            onAddExpense={handleOpenAddExpense}
            onEditExpense={handleOpenEditExpense}
            onDeleteExpense={handleDeleteExpense}
            onOpenTerminModal={handleOpenTerminModal}
          />
        )}

        {/* Tab 4: Guest List & Digital RSVP */}
        {activeTab === 'guests' && (
          <GuestManager
            guests={guests}
            onAddGuest={handleOpenAddGuest}
            onEditGuest={handleOpenEditGuest}
            onDeleteGuest={handleDeleteGuest}
            onOpenWhatsAppModal={handleOpenWhatsAppModal}
            onToggleCheckIn={handleToggleCheckIn}
          />
        )}

        {/* Tab 5: Master Rundown */}
        {activeTab === 'rundown' && (
          <RundownManager
            rundowns={rundowns}
            onAddRundown={handleOpenAddRundown}
            onEditRundown={handleOpenEditRundown}
            onDeleteRundown={handleDeleteRundown}
            onToggleComplete={handleToggleRundownComplete}
          />
        )}

        {/* Tab 6: Gate Reception & QR Scanner (Sprint 3) */}
        {activeTab === 'reception' && (
          <GateReception
            guests={guests}
            profile={profile}
            onToggleCheckIn={handleToggleCheckIn}
            onToggleSouvenir={handleToggleSouvenir}
          />
        )}

        {/* Tab 7: Catering Estimator & Live Monitor (Sprint 3) */}
        {activeTab === 'catering' && (
          <CateringEstimator
            menus={cateringMenus}
            onAddRefill={handleAddCateringRefill}
            onUpdateConsumed={handleUpdateCateringConsumed}
            onAddMenuItem={handleAddCateringMenu}
          />
        )}

        {/* Tab 8: Gift & Angpao Tracker (Sprint 3) */}
        {activeTab === 'gifts' && (
          <GiftAngpaoTracker
            gifts={gifts}
            summary={summary}
            onAddGift={handleOpenAddGift}
            onEditGift={handleOpenEditGift}
            onDeleteGift={handleDeleteGift}
            onToggleThankYou={handleToggleGiftThankYou}
          />
        )}

        {/* Tab 9: Post-Wedding Audit & Media Hub (Sprint 3) */}
        {activeTab === 'evaluation' && (
          <PostWeddingAudit
            reviews={vendorReviews}
            profile={profile}
            checkedInGuests={checkedInGuests}
            onAddReview={handleAddVendorReview}
            onDeleteReview={handleDeleteVendorReview}
          />
        )}

        {/* Tab 10: Profile Details View */}
        {activeTab === 'profile' && (
          <ProfileView
            profile={profile}
            tasks={tasks}
            summary={summary}
            onEditProfile={() => setIsProfileModalOpen(true)}
          />
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-stone-200/80 bg-white py-6 mt-12 text-center text-xs text-stone-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            &copy; {new Date().getFullYear()} <strong>Planikah OS Full Suite</strong> &bull; Sistem Perencanaan & Manajemen Pernikahan Enterprise.
          </div>
          <div className="text-stone-400">
            Sprint 1, 2, dan 3: Checklist, Anggaran, Tamu, Rundown, Gate QR, Catering, Angpao & Evaluasi
          </div>
        </div>
      </footer>

      {/* Modals Container */}
      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        onSave={handleSaveTask}
        initialData={selectedTask}
      />

      <ExpenseModal
        isOpen={isExpenseModalOpen}
        onClose={() => setIsExpenseModalOpen(false)}
        onSave={handleSaveExpense}
        initialData={selectedExpense}
      />

      <TerminModal
        isOpen={isTerminModalOpen}
        onClose={() => setIsTerminModalOpen(false)}
        onSaveTermins={handleSaveTermins}
        expense={terminActiveExpense}
      />

      <GuestModal
        isOpen={isGuestModalOpen}
        onClose={() => setIsGuestModalOpen(false)}
        onSave={handleSaveGuest}
        initialData={selectedGuest}
      />

      <WhatsAppBlastModal
        isOpen={isWhatsAppModalOpen}
        onClose={() => setIsWhatsAppModalOpen(false)}
        guest={whatsAppGuest}
        profile={profile}
        onMarkSent={handleMarkInvitationSent}
      />

      <RundownModal
        isOpen={isRundownModalOpen}
        onClose={() => setIsRundownModalOpen(false)}
        onSave={handleSaveRundown}
        initialData={selectedRundown}
      />

      <GiftModal
        isOpen={isGiftModalOpen}
        onClose={() => setIsGiftModalOpen(false)}
        onSave={handleSaveGift}
        initialData={selectedGift}
      />

      <ProfileEditorModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        onSave={handleSaveProfile}
        profile={profile}
      />

      <ExportReportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        profile={profile}
        tasks={tasks}
        expenses={expenses}
        guests={guests}
        rundowns={rundowns}
        summary={summary}
      />

    </div>
  );
};
export default App;
