import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Capacitor } from '@capacitor/core';
import { LocalNotifications } from '@capacitor/local-notifications';
import { 
  CheckCircle2, Circle, Calendar as CalendarIcon, Clock, Focus, Settings as SettingsIcon, 
  Plus, Search, Filter, Trash2, Edit3, Play, Pause, RotateCcw, 
  ChevronLeft, ChevronRight, Moon, Sun, Monitor, Globe, Bell, 
  Tag, AlertCircle, Check, X, ArrowRight,
  BarChart2, Award, RefreshCw, Layers, HelpCircle
} from 'lucide-react';

const translations = {
  en: {
    appName: "Momentum",
    tagline: "Daily Planner & Focus",
    today: "Today",
    week: "Week",
    month: "Month",
    focus: "Focus",
    settings: "Settings",
    goodMorning: "Good morning",
    goodAfternoon: "Good afternoon",
    goodEvening: "Good evening",
    userName: "User Name",
    yourName: "Your Name",
    enterNamePlaceholder: "Enter your name...",
    dailyProgress: "Daily Progress",
    tasksCompleted: "tasks completed",
    noTasksToday: "No tasks scheduled for today. Take a moment to plan ahead!",
    addNewTask: "Add New Task",
    all: "All",
    pending: "Pending",
    completed: "Completed",
    overdue: "Overdue",
    morning: "Morning",
    afternoon: "Afternoon",
    evening: "Evening",
    noTimeSet: "No Time Set",
    priority: "Priority",
    category: "Category",
    reminder: "Reminder",
    dueDate: "Due Date",
    time: "Time",
    duration: "Duration (min)",
    notes: "Notes",
    recurrence: "Recurrence",
    none: "None",
    daily: "Daily",
    weekly: "Weekly",
    monthly: "Monthly",
    work: "Work",
    personal: "Personal",
    health: "Health",
    study: "Study",
    errands: "Errands",
    other: "Other",
    low: "Low",
    medium: "Medium",
    high: "High",
    urgent: "Urgent",
    save: "Save Task",
    cancel: "Cancel",
    delete: "Delete",
    edit: "Edit",
    searchTasks: "Search tasks...",
    filterByCategory: "Filter by category...",
    filterByPriority: "Filter by priority...",
    sortBy: "Sort by",
    timeSort: "Time",
    prioritySort: "Priority",
    titleSort: "Title",
    pomodoro: "Pomodoro",
    shortBreak: "Short Break",
    longBreak: "Long Break",
    start: "Start",
    pause: "Pause",
    resume: "Resume",
    reset: "Reset",
    focusSessionCompleted: "Focus session completed! Take a well-deserved break.",
    breakFinished: "Break finished! Ready to get back to momentum?",
    associatedTask: "Associated Task",
    noTaskLinked: "No task linked (Free focus)",
    appearance: "Appearance",
    light: "Light",
    dark: "Dark",
    system: "System Default",
    language: "Language",
    notifications: "Notifications",
    enableReminders: "Enable Task Reminders",
    enableFocusNotif: "Enable Focus Session Alerts",
    defaultOffset: "Default Reminder Offset",
    atTime: "At scheduled time",
    min5Before: "5 minutes before",
    min10Before: "10 minutes before",
    min15Before: "15 minutes before",
    startOfWeek: "Start of Week",
    monday: "Monday",
    sunday: "Sunday",
    timeFormat: "Time Format",
    h12: "12-Hour (AM/PM)",
    h24: "24-Hour",
    confirmDelete: "Are you sure you want to delete this task?",
    notificationPermissionNotice: "Android reminders need notification permission. Android 12 and later may also require exact-alarm access.",
    permissionGranted: "Notification permission granted.",
    permissionDenied: "Notification permission denied. Please enable in Android settings.",
    exactAlarmRequired: "Enable exact alarms in Android settings to receive reminders on time.",
    notificationError: "The reminder could not be scheduled.",
    notificationUnsupported: "Notifications are not supported in this environment.",
    requestPermission: "Request Permission",
    backToCurrent: "Today",
    stats: "Statistics",
    totalFocusTime: "Total Focus Time",
    sessionsCompleted: "Sessions Completed",
    streakDays: "Day Streak"
  },
  es: {
    appName: "Momentum",
    tagline: "Agenda Diaria y Enfoque",
    today: "Hoy",
    week: "Semana",
    month: "Mes",
    focus: "Enfoque",
    settings: "Ajustes",
    goodMorning: "Buenos días",
    goodAfternoon: "Buenas tardes",
    goodEvening: "Buenas noches",
    userName: "Nombre del Usuario",
    yourName: "Tu Nombre",
    enterNamePlaceholder: "Escribe tu nombre...",
    dailyProgress: "Progreso Diario",
    tasksCompleted: "tareas completadas",
    noTasksToday: "No hay tareas programadas para hoy. ¡Tómate un momento para planificar!",
    addNewTask: "Nueva Tarea",
    all: "Todas",
    pending: "Pendientes",
    completed: "Completadas",
    overdue: "Vencidas",
    morning: "Mañana",
    afternoon: "Tarde",
    evening: "Noche",
    noTimeSet: "Sin hora",
    priority: "Prioridad",
    category: "Categoría",
    reminder: "Recordatorio",
    dueDate: "Fecha",
    time: "Hora",
    duration: "Duración (min)",
    notes: "Notas",
    recurrence: "Repetición",
    none: "Ninguna",
    daily: "Diaria",
    weekly: "Semanal",
    monthly: "Mensual",
    work: "Trabajo",
    personal: "Personal",
    health: "Salud",
    study: "Estudio",
    errands: "Mandados",
    other: "Otro",
    low: "Baja",
    medium: "Media",
    high: "Alta",
    urgent: "Urgente",
    save: "Guardar Tarea",
    cancel: "Cancelar",
    delete: "Eliminar",
    edit: "Editar",
    searchTasks: "Buscar tareas...",
    filterByCategory: "Filtrar por categoría...",
    filterByPriority: "Filtrar por prioridad...",
    sortBy: "Ordenar por",
    timeSort: "Hora",
    prioritySort: "Prioridad",
    titleSort: "Título",
    pomodoro: "Pomodoro",
    shortBreak: "Descanso Corto",
    longBreak: "Descanso Largo",
    start: "Iniciar",
    pause: "Pausar",
    resume: "Reanudar",
    reset: "Reiniciar",
    focusSessionCompleted: "¡Sesión de enfoque completada! Toma un descanso bien merecido.",
    breakFinished: "¡Descanso terminado! ¿Listo para retomar el impulso?",
    associatedTask: "Tarea Asociada",
    noTaskLinked: "Sin tarea vinculada (Enfoque libre)",
    appearance: "Apariencia",
    light: "Claro",
    dark: "Oscuro",
    system: "Predeterminado del sistema",
    language: "Idioma",
    notifications: "Notificaciones",
    enableReminders: "Activar recordatorios de tareas",
    enableFocusNotif: "Activar avisos de sesiones de enfoque",
    defaultOffset: "Anticipación predeterminada",
    atTime: "A la hora programada",
    min5Before: "5 minutos antes",
    min10Before: "10 minutos antes",
    min15Before: "15 minutos antes",
    startOfWeek: "Inicio de semana",
    monday: "Lunes",
    sunday: "Domingo",
    timeFormat: "Formato de hora",
    h12: "12 horas (AM/PM)",
    h24: "24 horas",
    confirmDelete: "¿Estás seguro de que deseas eliminar esta tarea?",
    notificationPermissionNotice: "Los recordatorios necesitan permiso de notificaciones. Android 12 y posteriores también pueden requerir permiso para alarmas exactas.",
    permissionGranted: "Permiso de notificaciones concedido.",
    permissionDenied: "Permiso denegado. Habilítalo en los ajustes de Android.",
    exactAlarmRequired: "Activa las alarmas exactas en los ajustes de Android para recibir los recordatorios a tiempo.",
    notificationError: "No se pudo programar el recordatorio.",
    notificationUnsupported: "Las notificaciones no son compatibles con este entorno.",
    requestPermission: "Solicitar Permiso",
    backToCurrent: "Hoy",
    stats: "Estadísticas",
    totalFocusTime: "Tiempo Total de Enfoque",
    sessionsCompleted: "Sesiones Completadas",
    streakDays: "Racha de Días"
  }
};

const getTodayDateString = () => {
  const d = new Date();
  return d.toISOString().split('T')[0];
};

const formatDateDisplay = (dateStr, lang) => {
  if (!dateStr) return '';
  const [year, month, day] = dateStr.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString(lang === 'es' ? 'es-ES' : 'en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });
};

const getNotificationId = (id) => {
  const numericId = Number(id);
  if (Number.isSafeInteger(numericId) && numericId > 0) return numericId;
  return [...String(id)].reduce((hash, char) => (hash * 31 + char.charCodeAt(0)) & 0x7fffffff, 0) || 1;
};

const getNotificationPermission = async () => {
  const { display } = await LocalNotifications.checkPermissions();
  if (Capacitor.getPlatform() === 'android' && display === 'granted') {
    const { exact_alarm } = await LocalNotifications.checkExactNotificationSetting();
    if (exact_alarm !== 'granted') return 'exact alarm required';
  }
  return display;
};

export default function App() {
  const [activeTab, setActiveTab] = useState('today');
  
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('momentum_tasks');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    const today = getTodayDateString();
    return [
      {
        id: '1',
        title: 'Review project architecture & Capacitor config',
        description: 'Verify Android permissions and local notifications setup.',
        date: today,
        time: '09:00',
        duration: 45,
        priority: 'urgent',
        category: 'Work',
        reminder: true,
        recurrence: 'none',
        completed: false,
        notes: 'Check manifest permissions.'
      },
      {
        id: '2',
        title: 'Morning workout & hydration',
        description: '30 min cardio and stretching.',
        date: today,
        time: '07:30',
        duration: 30,
        priority: 'high',
        category: 'Health',
        reminder: true,
        recurrence: 'daily',
        completed: true,
        notes: 'Drink at least 500ml water.'
      },
      {
        id: '3',
        title: 'Team sync meeting',
        description: 'Discuss sprint goals and deliverables.',
        date: today,
        time: '14:00',
        duration: 60,
        priority: 'medium',
        category: 'Work',
        reminder: true,
        recurrence: 'none',
        completed: false,
        notes: 'Prepare slide deck.'
      }
    ];
  });

  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem('momentum_categories');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return ['Work', 'Personal', 'Health', 'Study', 'Errands', 'Other'];
  });

  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('momentum_settings');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return {
      userName: '',
      theme: 'system',
      language: 'en',
      enableReminders: true,
      enableFocusNotif: true,
      defaultOffset: 0,
      startOfWeek: 'monday',
      timeFormat: 'h24'
    };
  });

  const [focusStats, setFocusStats] = useState(() => {
    const saved = localStorage.getItem('momentum_focus_stats');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return { totalMinutes: 125, sessionsCompleted: 5, streak: 3 };
  });

  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [modalInitialDate, setModalInitialDate] = useState(getTodayDateString());
  const [notificationPermission, setNotificationPermission] = useState('default');
  const [toastMessage, setToastMessage] = useState(null);

  const [selectedDate, setSelectedDate] = useState(getTodayDateString());
  const [calendarMonthCursor, setCalendarMonthCursor] = useState(() => {
    const now = new Date();
    return { year: now.getFullYear(), month: now.getMonth() };
  });

  useEffect(() => {
    localStorage.setItem('momentum_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('momentum_categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('momentum_settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('momentum_focus_stats', JSON.stringify(focusStats));
  }, [focusStats]);

  useEffect(() => {
    const root = document.documentElement;
    root.lang = settings.language;
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
    const applyTheme = () => {
      const isDark = settings.theme === 'dark' ||
        (settings.theme === 'system' && systemTheme.matches);
      root.classList.toggle('dark', isDark);
      root.style.colorScheme = isDark ? 'dark' : 'light';
    };

    applyTheme();
    if (settings.theme === 'system') {
      systemTheme.addEventListener('change', applyTheme);
      return () => systemTheme.removeEventListener('change', applyTheme);
    }
  }, [settings.theme, settings.language]);

  useEffect(() => {
    const loadPermission = async () => {
      try {
        if (Capacitor.isNativePlatform()) {
          setNotificationPermission(await getNotificationPermission());
        } else if (typeof window !== 'undefined' && 'Notification' in window) {
          setNotificationPermission(Notification.permission);
        }
      } catch (error) {
        console.error('Failed to check notification permission:', error);
      }
    };
    void loadPermission();
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const t = translations[settings.language];

  const requestNotificationPermission = async () => {
    try {
      let result;
      if (Capacitor.isNativePlatform()) {
        ({ display: result } = await LocalNotifications.requestPermissions());
        if (Capacitor.getPlatform() === 'android' && result === 'granted') {
          let { exact_alarm } = await LocalNotifications.checkExactNotificationSetting();
          if (exact_alarm !== 'granted') {
            ({ exact_alarm } = await LocalNotifications.changeExactNotificationSetting());
          }
          if (exact_alarm !== 'granted') result = 'exact alarm required';
        }
      } else if (typeof window !== 'undefined' && 'Notification' in window) {
        result = await Notification.requestPermission();
      } else {
        showToast(t.notificationUnsupported);
        return;
      }
      setNotificationPermission(result);
      if (result === 'granted') {
        showToast(t.permissionGranted);
      } else if (result === 'exact alarm required') {
        showToast(t.exactAlarmRequired);
      } else {
        showToast(t.permissionDenied);
      }
    } catch (error) {
      console.error('Failed to request notification permission:', error);
      showToast(t.notificationError);
    }
  };

  const handleSaveTask = (taskData) => {
    if (editingTask) {
      void cancelScheduledNotification(editingTask.id);
      setTasks(tasks.map(t => t.id === editingTask.id ? { ...taskData, id: t.id } : t));
      showToast("Task updated successfully");
      if (settings.enableReminders && taskData.reminder && taskData.date && taskData.time) {
        void scheduleNotification({ ...taskData, id: editingTask.id });
      }
    } else {
      const newTask = {
        ...taskData,
        id: Date.now().toString(),
        completed: false
      };
      setTasks([...tasks, newTask]);
      showToast("Task created successfully");

      if (settings.enableReminders && newTask.reminder && newTask.date && newTask.time) {
        void scheduleNotification(newTask);
      }
    }
    setIsTaskModalOpen(false);
    setEditingTask(null);
  };

  const cancelScheduledNotification = async (taskId) => {
    if (!Capacitor.isNativePlatform()) return;
    try {
      await LocalNotifications.cancel({
        notifications: [{ id: getNotificationId(taskId) }],
      });
    } catch (error) {
      console.error('Failed to cancel task notification:', error);
      showToast(t.notificationError);
    }
  };

  const scheduleNotification = async (task) => {
    try {
      const [year, month, day] = task.date.split('-').map(Number);
      const [hours, minutes] = task.time.split(':').map(Number);
      const taskDate = new Date(year, month - 1, day, hours, minutes);
      const triggerTime = taskDate.getTime() - (settings.defaultOffset || 0) * 60 * 1000;
      if (triggerTime <= Date.now()) return;

      if (Capacitor.isNativePlatform()) {
        if (await getNotificationPermission() !== 'granted') return;
        await LocalNotifications.schedule({
          notifications: [{
            id: getNotificationId(task.id),
            title: 'Momentum Reminder',
            body: `Task due: ${task.title} at ${task.time}`,
            schedule: { at: new Date(triggerTime) },
          }],
        });
        return;
      }

      if (typeof window === 'undefined' || !('Notification' in window)) return;
      if (Notification.permission !== 'granted') return;
      window.setTimeout(() => {
        new Notification('Momentum Reminder', {
          body: `Task due: ${task.title} at ${task.time}`,
        });
      }, triggerTime - Date.now());
    } catch (error) {
      console.error('Failed to schedule notification:', error);
      showToast(t.notificationError);
    }
  };

  const toggleTaskComplete = (id) => {
    setTasks(tasks.map(t => {
      if (t.id === id) {
        const updatedStatus = !t.completed;
        if (updatedStatus && t.recurrence && t.recurrence !== 'none') {
          generateNextRecurrence(t);
        }
        return { ...t, completed: updatedStatus };
      }
      return t;
    }));
  };

  const generateNextRecurrence = (task) => {
    const [year, month, day] = task.date.split('-').map(Number);
    const d = new Date(year, month - 1, day);
    
    if (task.recurrence === 'daily') {
      d.setDate(d.getDate() + 1);
    } else if (task.recurrence === 'weekly') {
      d.setDate(d.getDate() + 7);
    } else if (task.recurrence === 'monthly') {
      d.setMonth(d.getMonth() + 1);
    }

    const nextDateStr = d.toISOString().split('T')[0];
    const newRecurrenceTask = {
      ...task,
      id: Date.now().toString(),
      date: nextDateStr,
      completed: false
    };

    setTimeout(() => {
      setTasks(prev => [...prev, newRecurrenceTask]);
    }, 100);
  };

  const deleteTask = (id) => {
    void cancelScheduledNotification(id);
    setTasks(tasks.filter(t => t.id !== id));
    showToast("Task deleted");
  };

  const openNewTaskModal = (dateStr = getTodayDateString()) => {
    setEditingTask(null);
    setModalInitialDate(dateStr);
    setIsTaskModalOpen(true);
  };

  const openEditTaskModal = (task) => {
    setEditingTask(task);
    setModalInitialDate(task.date);
    setIsTaskModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans pb-24 transition-colors duration-200 flex flex-col">
      
      {toastMessage && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-slate-900 dark:bg-slate-800 text-white px-4 py-2.5 rounded-full shadow-lg text-sm font-medium flex items-center space-x-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-sky-500 dark:text-teal-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      <main className="flex-1 max-w-md w-full mx-auto px-4 py-5 pb-8">
        {activeTab === 'today' && (
          <TodayView 
            tasks={tasks} 
            t={t} 
            lang={settings.language}
            userName={settings.userName}
            onToggleComplete={toggleTaskComplete}
            onEditTask={openEditTaskModal}
            onDeleteTask={deleteTask}
            onAddNew={() => openNewTaskModal(getTodayDateString())}
          />
        )}
        {activeTab === 'week' && (
          <WeekView 
            tasks={tasks} 
            t={t} 
            lang={settings.language}
            startOfWeek={settings.startOfWeek}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            onToggleComplete={toggleTaskComplete}
            onEditTask={openEditTaskModal}
            onDeleteTask={deleteTask}
            onAddNew={openNewTaskModal}
          />
        )}
        {activeTab === 'month' && (
          <MonthView 
            tasks={tasks} 
            t={t} 
            lang={settings.language}
            cursor={calendarMonthCursor}
            setCursor={setCalendarMonthCursor}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            onToggleComplete={toggleTaskComplete}
            onEditTask={openEditTaskModal}
            onDeleteTask={deleteTask}
            onAddNew={openNewTaskModal}
          />
        )}
        {activeTab === 'focus' && (
          <FocusView 
            tasks={tasks} 
            t={t} 
            focusStats={focusStats}
            setFocusStats={setFocusStats}
            showToast={showToast}
          />
        )}
        {activeTab === 'settings' && (
          <SettingsView 
            settings={settings} 
            setSettings={setSettings}
            categories={categories}
            setCategories={setCategories}
            notificationPermission={notificationPermission}
            requestNotificationPermission={requestNotificationPermission}
            t={t}
            showToast={showToast}
          />
        )}
      </main>

      <button
        type="button"
        aria-label={t.addNewTask}
        title={t.addNewTask}
        onClick={() => openNewTaskModal(getTodayDateString())}
        className="fixed bottom-20 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-sky-500 text-white shadow-lg shadow-sky-500/30 transition-transform hover:scale-105 hover:bg-sky-600 active:scale-95 dark:bg-teal-600 dark:shadow-teal-600/30 dark:hover:bg-teal-700"
      >
        <Plus className="h-7 w-7" />
      </button>

      <nav className="fixed bottom-0 left-0 right-0 z-30 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 py-2 px-3 flex justify-around items-center max-w-md mx-auto">
        <button
          onClick={() => setActiveTab('today')}
          className={`flex flex-col items-center justify-center w-14 py-1 rounded-xl transition-all ${
            activeTab === 'today' ? 'text-sky-500 dark:text-teal-400 font-bold' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
          }`}
        >
          <CheckCircle2 className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">{t.today}</span>
        </button>

        <button
          onClick={() => setActiveTab('week')}
          className={`flex flex-col items-center justify-center w-14 py-1 rounded-xl transition-all ${
            activeTab === 'week' ? 'text-sky-500 dark:text-teal-400 font-bold' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
          }`}
        >
          <CalendarIcon className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">{t.week}</span>
        </button>

        <button
          onClick={() => setActiveTab('month')}
          className={`flex flex-col items-center justify-center w-14 py-1 rounded-xl transition-all ${
            activeTab === 'month' ? 'text-sky-500 dark:text-teal-400 font-bold' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
          }`}
        >
          <Layers className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">{t.month}</span>
        </button>

        <button
          onClick={() => setActiveTab('focus')}
          className={`flex flex-col items-center justify-center w-14 py-1 rounded-xl transition-all ${
            activeTab === 'focus' ? 'text-sky-500 dark:text-teal-400 font-bold' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
          }`}
        >
          <Focus className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">{t.focus}</span>
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`flex flex-col items-center justify-center w-14 py-1 rounded-xl transition-all ${
            activeTab === 'settings' ? 'text-sky-500 dark:text-teal-400 font-bold' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
          }`}
        >
          <SettingsIcon className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">{t.settings}</span>
        </button>
      </nav>

      {isTaskModalOpen && (
        <TaskModal 
          initialTask={editingTask}
          initialDate={modalInitialDate}
          categories={categories}
          t={t}
          onClose={() => setIsTaskModalOpen(false)}
          onSave={handleSaveTask}
        />
      )}

    </div>
  );
}

function TodayView({ tasks, t, lang, userName, onToggleComplete, onEditTask, onDeleteTask, onAddNew }) {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('all');
  const [selectedPriorityFilter, setSelectedPriorityFilter] = useState('all');

  const todayStr = getTodayDateString();
  const todayTasks = useMemo(() => {
    return tasks.filter(task => {
      return task.date === todayStr || (!task.completed && task.date < todayStr);
    });
  }, [tasks, todayStr]);

  const filteredTasks = useMemo(() => {
    return todayTasks.filter(task => {
      if (filter === 'pending' && task.completed) return false;
      if (filter === 'completed' && !task.completed) return false;
      if (selectedCategoryFilter !== 'all' && task.category !== selectedCategoryFilter) return false;
      if (selectedPriorityFilter !== 'all' && task.priority !== selectedPriorityFilter) return false;
      if (searchQuery && !task.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    });
  }, [todayTasks, filter, selectedCategoryFilter, selectedPriorityFilter, searchQuery]);

  const overdueTasks = filteredTasks.filter(t => !t.completed && t.date < todayStr);
  const morningTasks = filteredTasks.filter(t => t.date === todayStr && t.time && t.time < '12:00');
  const afternoonTasks = filteredTasks.filter(t => t.date === todayStr && t.time && t.time >= '12:00' && t.time < '17:00');
  const eveningTasks = filteredTasks.filter(t => t.date === todayStr && t.time && t.time >= '17:00');
  const noTimeTasks = filteredTasks.filter(t => t.date === todayStr && !t.time);

  const completedCount = todayTasks.filter(t => t.completed).length;
  const totalCount = todayTasks.length;
  const progressPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const now = new Date();
  const hour = now.getHours();
  const baseGreeting = hour < 12 ? t.goodMorning : hour < 18 ? t.goodAfternoon : t.goodEvening;
  const greeting = userName && userName.trim() ? `${baseGreeting}, ${userName.trim()}` : baseGreeting;
  const dateDisplay = now.toLocaleDateString(lang === 'es' ? 'es-ES' : 'en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="space-y-6">
      
      <div className="bg-gradient-to-br from-sky-400 to-blue-500 dark:from-teal-500 dark:to-emerald-600 rounded-2xl p-5 text-white shadow-lg shadow-sky-500/15 dark:shadow-teal-500/15">
        <p className="text-sky-100 dark:text-teal-100 text-xs font-medium uppercase tracking-wider">{dateDisplay}</p>
        <h2 className="text-2xl font-bold mt-0.5 tracking-tight">{greeting}!</h2>
        
        <div className="mt-4 pt-3 border-t border-white/20">
          <div className="flex justify-between items-center text-xs mb-1.5 font-medium">
            <span>{t.dailyProgress}</span>
            <span>{completedCount}/{totalCount} {t.tasksCompleted} ({progressPercentage}%)</span>
          </div>
          <div className="w-full bg-black/20 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-white h-full rounded-full transition-all duration-500 ease-out" 
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
          <input 
            type="text"
            placeholder={t.searchTasks}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:border-sky-500 dark:focus:border-teal-500 transition-colors shadow-sm"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex items-center justify-between text-xs font-medium">
          <div className="flex space-x-1.5 bg-slate-200/70 dark:bg-slate-900 p-1 rounded-xl">
            <button 
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 rounded-lg transition-all ${filter === 'all' ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500'}`}
            >
              {t.all}
            </button>
            <button 
              onClick={() => setFilter('pending')}
              className={`px-3 py-1.5 rounded-lg transition-all ${filter === 'pending' ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500'}`}
            >
              {t.pending}
            </button>
            <button 
              onClick={() => setFilter('completed')}
              className={`px-3 py-1.5 rounded-lg transition-all ${filter === 'completed' ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500'}`}
            >
              {t.completed}
            </button>
          </div>

          <select
            value={selectedPriorityFilter}
            onChange={(e) => setSelectedPriorityFilter(e.target.value)}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 rounded-xl px-3 py-1.5 text-xs outline-none shadow-sm"
          >
            <option value="all">{t.priority}: {t.all}</option>
            <option value="urgent">{t.urgent}</option>
            <option value="high">{t.high}</option>
            <option value="medium">{t.medium}</option>
            <option value="low">{t.low}</option>
          </select>
        </div>
      </div>

      {filteredTasks.length === 0 ? (
        <div className="text-center py-12 px-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm">
          <div className="w-12 h-12 bg-sky-50 dark:bg-teal-950/50 text-sky-600 dark:text-teal-400 rounded-full flex items-center justify-center mx-auto mb-3">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h3 className="font-semibold text-slate-800 dark:text-slate-200">{t.noTasksToday}</h3>
          <p className="text-slate-500 text-xs mt-1 mb-4">Get ahead by creating your first task.</p>
          <button 
            onClick={onAddNew}
            className="bg-sky-500 hover:bg-sky-600 dark:bg-teal-600 text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-md shadow-sky-500/20 dark:shadow-teal-600/20"
          >
            {t.addNewTask}
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {overdueTasks.length > 0 && (
            <TaskSection title={t.overdue} tasks={overdueTasks} onToggleComplete={onToggleComplete} onEdit={onEditTask} onDelete={onDeleteTask} urgentBadge />
          )}
          {morningTasks.length > 0 && (
            <TaskSection title={t.morning} tasks={morningTasks} onToggleComplete={onToggleComplete} onEdit={onEditTask} onDelete={onDeleteTask} />
          )}
          {afternoonTasks.length > 0 && (
            <TaskSection title={t.afternoon} tasks={afternoonTasks} onToggleComplete={onToggleComplete} onEdit={onEditTask} onDelete={onDeleteTask} />
          )}
          {eveningTasks.length > 0 && (
            <TaskSection title={t.evening} tasks={eveningTasks} onToggleComplete={onToggleComplete} onEdit={onEditTask} onDelete={onDeleteTask} />
          )}
          {noTimeTasks.length > 0 && (
            <TaskSection title={t.noTimeSet} tasks={noTimeTasks} onToggleComplete={onToggleComplete} onEdit={onEditTask} onDelete={onDeleteTask} />
          )}
        </div>
      )}

    </div>
  );
}

function TaskSection({ title, tasks, onToggleComplete, onEdit, onDelete, urgentBadge = false }) {
  return (
    <div className="space-y-2">
      <h3 className={`text-xs font-semibold uppercase tracking-wider px-1 ${urgentBadge ? 'text-red-500' : 'text-slate-400'}`}>
        {title} ({tasks.length})
      </h3>
      <div className="space-y-2">
        {tasks.map(task => (
          <TaskCard 
            key={task.id} 
            task={task} 
            onToggleComplete={onToggleComplete} 
            onEdit={onEdit} 
            onDelete={onDelete} 
          />
        ))}
      </div>
    </div>
  );
}

function TaskCard({ task, onToggleComplete, onEdit, onDelete }) {
  const priorityColors = {
    urgent: 'bg-red-500 text-white',
    high: 'bg-amber-500 text-white',
    medium: 'bg-blue-500 text-white',
    low: 'bg-slate-400 text-white'
  };

  return (
    <div className={`bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-4 shadow-sm transition-all hover:shadow-md ${task.completed ? 'opacity-60 bg-slate-50 dark:bg-slate-900/50' : ''}`}>
      <div className="flex items-start justify-between gap-3">
        
        <div className="flex items-start space-x-3 flex-1 min-w-0">
          <button 
            onClick={() => onToggleComplete(task.id)}
            className="mt-0.5 text-slate-400 hover:text-sky-600 dark:hover:text-teal-400 transition-colors flex-shrink-0"
          >
            {task.completed ? (
              <CheckCircle2 className="w-5 h-5 text-sky-600 dark:text-teal-600 fill-sky-100 dark:fill-teal-950" />
            ) : (
              <Circle className="w-5 h-5" />
            )}
          </button>

          <div className="flex-1 min-w-0">
            <h4 className={`text-sm font-medium text-slate-900 dark:text-slate-100 truncate ${task.completed ? 'line-through text-slate-400 dark:text-slate-500' : ''}`}>
              {task.title}
            </h4>
            
            {task.description && (
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                {task.description}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-2 mt-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400">
              {task.time && (
                <span className="flex items-center space-x-1 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md font-medium">
                  <Clock className="w-3 h-3 text-sky-500 dark:text-teal-400" />
                  <span>{task.time}</span>
                </span>
              )}

              {task.duration && (
                <span className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md">
                  {task.duration}m
                </span>
              )}

              <span className="bg-sky-50 dark:bg-teal-950/50 text-sky-700 dark:text-teal-300 px-2 py-0.5 rounded-md font-medium">
                {task.category}
              </span>

              <span className={`px-2 py-0.5 rounded-md font-bold uppercase tracking-wider text-[9px] ${priorityColors[task.priority] || 'bg-slate-300'}`}>
                {task.priority}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-1 flex-shrink-0">
          <button 
            onClick={() => onEdit(task)}
            className="p-1.5 text-slate-400 hover:text-sky-600 dark:hover:text-teal-400 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <Edit3 className="w-4 h-4" />
          </button>
          <button 
            onClick={() => onDelete(task.id)}
            className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}

function WeekView({ tasks, t, lang, startOfWeek, selectedDate, setSelectedDate, onToggleComplete, onEditTask, onDeleteTask, onAddNew }) {
  const [year, month, day] = selectedDate.split('-').map(Number);
  const currentDateObj = new Date(year, month - 1, day);

  const getDayList = (date, startMonday) => {
    const d = new Date(date);
    const dayOfWeek = d.getDay();
    const diffToStart = startMonday ? (dayOfWeek === 0 ? -6 : 1 - dayOfWeek) : -dayOfWeek;
    
    const start = new Date(d);
    start.setDate(d.getDate() + diffToStart);

    const weekDays = [];
    for (let i = 0; i < 7; i++) {
      const nextDay = new Date(start);
      nextDay.setDate(start.getDate() + i);
      weekDays.push(nextDay.toISOString().split('T')[0]);
    }
    return weekDays;
  };

  const weekDays = useMemo(() => getDayList(currentDateObj, startOfWeek === 'monday'), [currentDateObj, startOfWeek]);

  const handlePrevWeek = () => {
    const d = new Date(currentDateObj);
    d.setDate(d.getDate() - 7);
    setSelectedDate(d.toISOString().split('T')[0]);
  };

  const handleNextWeek = () => {
    const d = new Date(currentDateObj);
    d.setDate(d.getDate() + 7);
    setSelectedDate(d.toISOString().split('T')[0]);
  };

  const selectedDayTasks = tasks.filter(task => task.date === selectedDate);
  const todayStr = getTodayDateString();

  return (
    <div className="space-y-6">
      
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-base text-slate-900 dark:text-white capitalize">
            {currentDateObj.toLocaleDateString(lang === 'es' ? 'es-ES' : 'en-US', { month: 'long', year: 'numeric' })}
          </h3>
          <div className="flex space-x-1">
            <button onClick={handlePrevWeek} className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button onClick={() => setSelectedDate(todayStr)} className="px-3 py-1 text-xs font-semibold rounded-xl bg-sky-50 dark:bg-teal-950/50 text-sky-600 dark:text-teal-400">
              {t.today}
            </button>
            <button onClick={handleNextWeek} className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1.5">
          {weekDays.map(dateStr => {
            const [y, m, d] = dateStr.split('-').map(Number);
            const dateObj = new Date(y, m - 1, d);
            const dayName = dateObj.toLocaleDateString(lang === 'es' ? 'es-ES' : 'en-US', { weekday: 'narrow' });
            const dayNum = dateObj.getDate();
            const isSelected = dateStr === selectedDate;
            const isToday = dateStr === todayStr;
            const count = tasks.filter(task => task.date === dateStr).length;

            return (
              <button
                key={dateStr}
                onClick={() => setSelectedDate(dateStr)}
                className={`flex flex-col items-center py-2.5 rounded-xl transition-all ${
                  isSelected 
                    ? 'bg-sky-500 dark:bg-teal-600 text-white shadow-md shadow-sky-500/30 dark:shadow-teal-600/30 font-bold' 
                    : isToday 
                    ? 'bg-sky-50 dark:bg-teal-950/50 text-sky-700 dark:text-teal-300 border border-sky-500/30 dark:border-teal-500/30' 
                    : 'bg-slate-50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
                }`}
              >
                <span className="text-[11px] uppercase opacity-80">{dayName}</span>
                <span className="text-sm font-bold mt-0.5">{dayNum}</span>
                <span className={`w-1.5 h-1.5 rounded-full mt-1.5 ${count > 0 ? (isSelected ? 'bg-white' : 'bg-sky-500 dark:bg-teal-500') : 'opacity-0'}`} />
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            {formatDateDisplay(selectedDate, lang)} ({selectedDayTasks.length})
          </h4>
          <button 
            onClick={() => onAddNew(selectedDate)}
            className="text-xs font-semibold text-sky-600 dark:text-teal-400 flex items-center space-x-1 hover:underline"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{t.addNewTask}</span>
          </button>
        </div>

        {selectedDayTasks.length === 0 ? (
          <div className="text-center py-10 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm">
            <p className="text-sm text-slate-500">No tasks for this day.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {selectedDayTasks.map(task => (
              <TaskCard 
                key={task.id} 
                task={task} 
                onToggleComplete={onToggleComplete} 
                onEdit={onEditTask} 
                onDelete={onDeleteTask} 
              />
            ))}
          </div>
        )}
      </div>

    </div>
  );
}

function MonthView({ tasks, t, lang, cursor, setCursor, selectedDate, setSelectedDate, onToggleComplete, onEditTask, onDeleteTask, onAddNew }) {
  const { year, month } = cursor;

  const handlePrevMonth = () => {
    if (month === 0) {
      setCursor({ year: year - 1, month: 11 });
    } else {
      setCursor({ year, month: month - 1 });
    }
  };

  const handleNextMonth = () => {
    if (month === 11) {
      setCursor({ year: year + 1, month: 0 });
    } else {
      setCursor({ year, month: month + 1 });
    }
  };

  const monthName = new Date(year, month, 1).toLocaleDateString(lang === 'es' ? 'es-ES' : 'en-US', { month: 'long', year: 'numeric' });

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = new Date(year, month, 1).getDay();
  
  const calendarDays = [];
  for (let i = 0; i < firstDayIndex; i++) {
    calendarDays.push({ empty: true });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    const mStr = String(month + 1).padStart(2, '0');
    const dStr = String(d).padStart(2, '0');
    const dateStr = `${year}-${mStr}-${dStr}`;
    calendarDays.push({ empty: false, dateStr, dayNum: d });
  }

  const selectedDayTasks = tasks.filter(task => task.date === selectedDate);
  const todayStr = getTodayDateString();

  return (
    <div className="space-y-6">
      
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-base text-slate-900 dark:text-white capitalize">{monthName}</h3>
          <div className="flex space-x-1">
            <button onClick={handlePrevMonth} className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button onClick={() => {
              const now = new Date();
              setCursor({ year: now.getFullYear(), month: now.getMonth() });
              setSelectedDate(getTodayDateString());
            }} className="px-3 py-1 text-xs font-semibold rounded-xl bg-sky-50 dark:bg-teal-950/50 text-sky-600 dark:text-teal-400">
              {t.today}
            </button>
            <button onClick={handleNextMonth} className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-slate-400 mb-2">
          <span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span>
        </div>

        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((item, index) => {
            if (item.empty) {
              return <div key={`empty-${index}`} className="h-10" />;
            }

            const { dateStr, dayNum } = item;
            const isSelected = dateStr === selectedDate;
            const isToday = dateStr === todayStr;
            const dayTasks = tasks.filter(t => t.date === dateStr);
            const hasTasks = dayTasks.length > 0;
            const allCompleted = hasTasks && dayTasks.every(t => t.completed);

            return (
              <button
                key={dateStr}
                onClick={() => setSelectedDate(dateStr)}
                className={`h-10 flex flex-col items-center justify-center rounded-xl relative transition-all ${
                  isSelected 
                    ? 'bg-sky-500 dark:bg-teal-600 text-white font-bold shadow-md shadow-sky-500/30 dark:shadow-teal-600/30' 
                    : isToday 
                    ? 'bg-sky-50 dark:bg-teal-950/50 text-sky-700 dark:text-teal-300 font-bold border border-sky-500/30 dark:border-teal-500/30' 
                    : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                }`}
              >
                <span className="text-xs">{dayNum}</span>
                {hasTasks && (
                  <span className={`w-1.5 h-1.5 rounded-full absolute bottom-1 ${
                    isSelected ? 'bg-white' : allCompleted ? 'bg-emerald-500' : 'bg-sky-500 dark:bg-teal-500'
                  }`} />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            {formatDateDisplay(selectedDate, lang)} ({selectedDayTasks.length})
          </h4>
          <button 
            onClick={() => onAddNew(selectedDate)}
            className="text-xs font-semibold text-sky-600 dark:text-teal-400 flex items-center space-x-1 hover:underline"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{t.addNewTask}</span>
          </button>
        </div>

        {selectedDayTasks.length === 0 ? (
          <div className="text-center py-10 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm">
            <p className="text-sm text-slate-500">No tasks for this day.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {selectedDayTasks.map(task => (
              <TaskCard 
                key={task.id} 
                task={task} 
                onToggleComplete={onToggleComplete} 
                onEdit={onEditTask} 
                onDelete={onDeleteTask} 
              />
            ))}
          </div>
        )}
      </div>

    </div>
  );
}

function FocusView({ tasks, t, focusStats, setFocusStats, showToast }) {
  const [mode, setMode] = useState('pomodoro');
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState('');

  const durations = {
    pomodoro: 25 * 60,
    shortBreak: 5 * 60,
    longBreak: 15 * 60
  };

  useEffect(() => {
    let timer = null;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      if (mode === 'pomodoro') {
        showToast(t.focusSessionCompleted);
        const addedMin = 25;
        setFocusStats(prev => ({
          ...prev,
          totalMinutes: prev.totalMinutes + addedMin,
          sessionsCompleted: prev.sessionsCompleted + 1
        }));
      } else {
        showToast(t.breakFinished);
      }
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft, mode]);

  const switchMode = (newMode) => {
    setIsRunning(false);
    setMode(newMode);
    setTimeLeft(durations[newMode]);
  };

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const totalDuration = durations[mode];
  const progress = ((totalDuration - timeLeft) / totalDuration) * 100;

  return (
    <div className="space-y-6">
      
      <div className="flex bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-1.5 rounded-2xl shadow-sm">
        <button
          onClick={() => switchMode('pomodoro')}
          className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all ${mode === 'pomodoro' ? 'bg-sky-500 dark:bg-teal-600 text-white shadow-md' : 'text-slate-500'}`}
        >
          {t.pomodoro}
        </button>
        <button
          onClick={() => switchMode('shortBreak')}
          className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all ${mode === 'shortBreak' ? 'bg-sky-500 dark:bg-teal-600 text-white shadow-md' : 'text-slate-500'}`}
        >
          {t.shortBreak}
        </button>
        <button
          onClick={() => switchMode('longBreak')}
          className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all ${mode === 'longBreak' ? 'bg-sky-500 dark:bg-teal-600 text-white shadow-md' : 'text-slate-500'}`}
        >
          {t.longBreak}
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 text-center shadow-lg relative overflow-hidden flex flex-col items-center">
        
        <div className="relative w-56 h-56 flex items-center justify-center my-4">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="112"
              cy="112"
              r="96"
              stroke="currentColor"
              strokeWidth="12"
              className="text-slate-100 dark:text-slate-800 fill-none"
            />
            <circle
              cx="112"
              cy="112"
              r="96"
              stroke="currentColor"
              strokeWidth="12"
              strokeDasharray={2 * Math.PI * 96}
              strokeDashoffset={2 * Math.PI * 96 * (1 - progress / 100)}
              strokeLinecap="round"
              className="text-sky-500 dark:text-teal-500 fill-none transition-all duration-1000"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              {formatTimer(timeLeft)}
            </span>
            <span className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-medium">
              {mode === 'pomodoro' ? t.pomodoro : t.shortBreak}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-4 mt-4">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className="w-16 h-16 rounded-2xl bg-sky-500 hover:bg-sky-600 dark:bg-teal-600 dark:hover:bg-teal-700 active:scale-95 text-white flex items-center justify-center shadow-lg shadow-sky-500/30 dark:shadow-teal-600/30 transition-all"
          >
            {isRunning ? <Pause className="w-7 h-7" /> : <Play className="w-7 h-7 ml-0.5" />}
          </button>
          <button
            onClick={() => { setIsRunning(false); setTimeLeft(durations[mode]); }}
            className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-600 dark:text-slate-300 flex items-center justify-center transition-all"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>

      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm">
        <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 block mb-2">{t.associatedTask}</label>
        <select
          value={selectedTaskId}
          onChange={(e) => setSelectedTaskId(e.target.value)}
          className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-sm outline-none"
        >
          <option value="">{t.noTaskLinked}</option>
          {tasks.filter(t => !t.completed).map(task => (
            <option key={task.id} value={task.id}>{task.title}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-teal-950/50 text-sky-600 dark:text-teal-400 flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-medium block">{t.totalFocusTime}</span>
            <span className="text-lg font-bold text-slate-900 dark:text-white">{focusStats.totalMinutes} min</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-emerald-950/50 text-blue-600 dark:text-emerald-400 flex items-center justify-center">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-medium block">{t.sessionsCompleted}</span>
            <span className="text-lg font-bold text-slate-900 dark:text-white">{focusStats.sessionsCompleted}</span>
          </div>
        </div>
      </div>

    </div>
  );
}

function SettingsView({ settings, setSettings, categories, setCategories, notificationPermission, requestNotificationPermission, t, showToast }) {
  const [newCatName, setNewCatName] = useState('');

  const handleAddCategory = () => {
    if (!newCatName.trim()) return;
    if (categories.includes(newCatName.trim())) return;
    setCategories([...categories, newCatName.trim()]);
    setNewCatName('');
    showToast("Category added");
  };

  const handleDeleteCategory = (cat) => {
    if (categories.length <= 1) return;
    setCategories(categories.filter(c => c !== cat));
    showToast("Category removed");
  };

  return (
    <div className="space-y-6">
      
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm space-y-3">
        <h3 className="font-semibold text-sm text-slate-900 dark:text-white flex items-center space-x-2">
          <Edit3 className="w-4 h-4 text-sky-500 dark:text-teal-400" />
          <span>{t.yourName}</span>
        </h3>
        <div>
          <input 
            type="text"
            placeholder={t.enterNamePlaceholder}
            value={settings.userName || ''}
            onChange={(e) => setSettings({ ...settings, userName: e.target.value })}
            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-sky-500 dark:focus:border-teal-500 transition-colors"
          />
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm space-y-4">
        <h3 className="font-semibold text-sm text-slate-900 dark:text-white flex items-center space-x-2">
          <Globe className="w-4 h-4 text-sky-500 dark:text-teal-400" />
          <span>{t.language}</span>
        </h3>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => setSettings({ ...settings, language: 'en' })}
            className={`py-2.5 text-xs font-medium rounded-xl border transition-all ${
              settings.language === 'en' 
                ? 'bg-sky-50 dark:bg-teal-950/50 border-sky-500 dark:border-teal-500 text-sky-700 dark:text-teal-300 font-bold' 
                : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
            }`}
          >
            English
          </button>
          <button
            onClick={() => setSettings({ ...settings, language: 'es' })}
            className={`py-2.5 text-xs font-medium rounded-xl border transition-all ${
              settings.language === 'es' 
                ? 'bg-sky-50 dark:bg-teal-950/50 border-sky-500 dark:border-teal-500 text-sky-700 dark:text-teal-300 font-bold' 
                : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
            }`}
          >
            Español
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm space-y-4">
        <h3 className="font-semibold text-sm text-slate-900 dark:text-white flex items-center space-x-2">
          {settings.theme === 'dark' ? (
            <Moon className="w-4 h-4 text-sky-500 dark:text-teal-400" />
          ) : settings.theme === 'light' ? (
            <Sun className="w-4 h-4 text-sky-500 dark:text-teal-400" />
          ) : (
            <Monitor className="w-4 h-4 text-sky-500 dark:text-teal-400" />
          )}
          <span>{t.appearance}</span>
        </h3>
        <div className="grid grid-cols-3 gap-2">
          {[
            { value: 'light', label: t.light, Icon: Sun },
            { value: 'dark', label: t.dark, Icon: Moon },
            { value: 'system', label: t.system, Icon: Monitor },
          ].map(({ value, label, Icon }) => (
            <button
              key={value}
              type="button"
              aria-pressed={settings.theme === value}
              onClick={() => setSettings({ ...settings, theme: value })}
              className={`flex flex-col items-center justify-center gap-1.5 rounded-xl border px-2 py-3 text-xs transition-colors ${
                settings.theme === value
                  ? 'border-sky-500 bg-sky-50 font-bold text-sky-700 dark:border-teal-500 dark:bg-teal-950/50 dark:text-teal-300'
                  : 'border-slate-200 text-slate-600 dark:border-slate-800 dark:text-slate-400'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm space-y-4">
        <h3 className="font-semibold text-sm text-slate-900 dark:text-white flex items-center space-x-2">
          <Bell className="w-4 h-4 text-sky-500 dark:text-teal-400" />
          <span>{t.notifications}</span>
        </h3>

        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-700 dark:text-slate-300">{t.enableReminders}</span>
          <input 
            type="checkbox"
            checked={settings.enableReminders}
            onChange={(e) => setSettings({ ...settings, enableReminders: e.target.checked })}
            className="w-4 h-4 accent-sky-500 dark:accent-teal-600 rounded"
          />
        </div>

        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
          <p className="text-slate-500 mb-2">{t.notificationPermissionNotice}</p>
          <div className="flex items-center justify-between">
            <span className="font-medium">Status: <span className="uppercase text-sky-600 dark:text-teal-400">{notificationPermission}</span></span>
            {notificationPermission !== 'granted' && (
              <button 
                onClick={requestNotificationPermission}
                className="bg-sky-500 dark:bg-teal-600 text-white px-3 py-1.5 rounded-lg text-xs font-semibold shadow"
              >
                {t.requestPermission}
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm space-y-4">
        <h3 className="font-semibold text-sm text-slate-900 dark:text-white flex items-center space-x-2">
          <Tag className="w-4 h-4 text-sky-500 dark:text-teal-400" />
          <span>Categories</span>
        </h3>

        <div className="flex space-x-2">
          <input 
            type="text"
            placeholder="New category..."
            value={newCatName}
            onChange={(e) => setNewCatName(e.target.value)}
            className="flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs outline-none"
          />
          <button 
            onClick={handleAddCategory}
            className="bg-sky-500 dark:bg-teal-600 text-white px-3.5 py-2 rounded-xl text-xs font-semibold shadow"
          >
            Add
          </button>
        </div>

        <div className="flex flex-wrap gap-1.5 pt-1">
          {categories.map(cat => (
            <span key={cat} className="inline-flex items-center space-x-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2.5 py-1 rounded-xl text-xs font-medium">
              <span>{cat}</span>
              {categories.length > 1 && (
                <button onClick={() => handleDeleteCategory(cat)} className="text-slate-400 hover:text-red-500 ml-1">
                  <X className="w-3 h-3" />
                </button>
              )}
            </span>
          ))}
        </div>
      </div>

    </div>
  );
}

function TaskModal({ initialTask, initialDate, categories, t, onClose, onSave }) {
  const [title, setTitle] = useState(initialTask ? initialTask.title : '');
  const [description, setDescription] = useState(initialTask ? initialTask.description || '' : '');
  const [date, setDate] = useState(initialTask ? initialTask.date : initialDate);
  const [time, setTime] = useState(initialTask ? initialTask.time || '' : '');
  const [duration, setDuration] = useState(initialTask ? initialTask.duration || 30 : 30);
  const [priority, setPriority] = useState(initialTask ? initialTask.priority : 'medium');
  const [category, setCategory] = useState(initialTask ? initialTask.category : categories[0]);
  const [reminder, setReminder] = useState(initialTask ? initialTask.reminder : true);
  const [recurrence, setRecurrence] = useState(initialTask ? initialTask.recurrence || 'none' : 'none');
  const [notes, setNotes] = useState(initialTask ? initialTask.notes || '' : '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSave({
      title: title.trim(),
      description: description.trim(),
      date,
      time,
      duration: Number(duration),
      priority,
      category,
      reminder,
      recurrence,
      notes: notes.trim()
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-t-3xl sm:rounded-3xl max-h-[90vh] overflow-y-auto p-6 shadow-2xl animate-in fade-in slide-in-from-bottom duration-200">
        
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
          <h3 className="font-bold text-base text-slate-900 dark:text-white">
            {initialTask ? t.edit : t.addNewTask}
          </h3>
          <button onClick={onClose} className="p-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 block mb-1">Task Title *</label>
            <input 
              type="text"
              required
              placeholder="What needs to be done?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-sky-500 dark:focus:border-teal-500"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 block mb-1">Description (Optional)</label>
            <textarea 
              rows={2}
              placeholder="Add details..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2 text-sm outline-none resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 block mb-1">{t.dueDate}</label>
              <input 
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-sm outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 block mb-1">{t.time}</label>
              <input 
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-sm outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 block mb-1">{t.priority}</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-sm outline-none capitalize"
              >
                <option value="low">{t.low}</option>
                <option value="medium">{t.medium}</option>
                <option value="high">{t.high}</option>
                <option value="urgent">{t.urgent}</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 block mb-1">{t.category}</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-sm outline-none"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 block mb-1">{t.duration}</label>
              <input 
                type="number"
                min="5"
                step="5"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-sm outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 block mb-1">{t.recurrence}</label>
              <select
                value={recurrence}
                onChange={(e) => setRecurrence(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-sm outline-none"
              >
                <option value="none">{t.none}</option>
                <option value="daily">{t.daily}</option>
                <option value="weekly">{t.weekly}</option>
                <option value="monthly">{t.monthly}</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">{t.reminder}</span>
            <input 
              type="checkbox"
              checked={reminder}
              onChange={(e) => setReminder(e.target.checked)}
              className="w-4 h-4 accent-sky-500 dark:accent-teal-600 rounded"
            />
          </div>

          <div className="flex space-x-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 py-2.5 rounded-xl text-sm font-semibold hover:bg-slate-200 transition-colors"
            >
              {t.cancel}
            </button>
            <button
              type="submit"
              className="flex-1 bg-sky-500 hover:bg-sky-600 dark:bg-teal-600 text-white py-2.5 rounded-xl text-sm font-semibold shadow-md shadow-sky-500/30 dark:shadow-teal-600/30 transition-all"
            >
              {t.save}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}