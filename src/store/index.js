// import node_modules
import Vue from 'vue';
import Vuex from 'vuex';
import {
  STORAGE_KEY,
  MODAL_OPEN,
  FETCH_LOCAL_STORAGE,
  SET_CALENDAR,
  SET_HOLIDAYS,
  SET_DATE,
  PREV_MONTH,
  NEXT_MONTH,
  ADD_TASK,
  REMOVE_TASK,
  SAVE_TASK_LIST,
  HANDLE_MODAL,
} from '~/constants/variable';
import { generateCalendar } from '~/constants/function';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentCalendar: {
      year: '',
      month: '',
      weekdayIndex: '',
      lastMonthDays: '',
      thisMonthDays: '',
    },
    displayedDateList: [
      {
        date: '',
        holiday: '',
        taskList: [],
      },
    ], // 表示するカレンダーの日
    isModal: false,
    selectedDate: '',
    taskList: [
      {
        date: '2020-12-20',
        name: '予定1',
        id: 1,
      },
      {
        date: '2020-12-21',
        name: 'タスク',
        id: 2,
      },
    ],
    holidays: {},
    today: '',
  },
  getters: {
    displayedDateList: (state) => {
      // カレンダー表示
      const array = [...Array(42).keys()].map((i) => i + 1);
      return array.map((num) => {
        const point = num - state.currentCalendar.weekdayIndex;
        const lastMonth = point < 1;
        const nextMonth = point > state.currentCalendar.thisMonthDays;

        const day = (() => {
          if (lastMonth) return state.currentCalendar.lastMonthDays + point; // 先月
          if (nextMonth) return point - state.currentCalendar.thisMonthDays; // 来月
          return point; // 今月
        })();
        const month = (() => {
          if (nextMonth && state.currentCalendar.month === 12) return 1; // 来月が1月の時
          if (lastMonth && state.currentCalendar.month === 1) return 12; // 先月が12月の時
          if (lastMonth) return state.currentCalendar.month - 1; // 先月
          if (nextMonth) return state.currentCalendar.month + 1; // 来月
          return state.currentCalendar.month; // 今月
        })();
        const year = (() => {
          if (lastMonth && state.currentCalendar.month === 1) return state.currentCalendar.year - 1; // 去年
          if (nextMonth && state.currentCalendar.month === 12) return state.currentCalendar.year + 1; // 来年
          return state.currentCalendar.year; // 今年
        })();

        const date = `${year}-${`0${String(month)}`.slice(-2)}-${`0${String(day)}`.slice(-2)}`;
        const holiday = state.holidays[date];
        return {
          num: day,
          month,
          date,
          holiday,
          lastMonth,
          nextMonth,
        };
      });
    },
  },
  mutations: {
    [FETCH_LOCAL_STORAGE](state) {
      const json = localStorage.getItem(STORAGE_KEY);
      if (!json) return;
      state.taskList = JSON.parse(json);
    },
    [SET_CALENDAR](state) {
      const today = new Date();
      const day = today.getDate();
      const year = today.getFullYear();
      const month = today.getMonth() + 1;
      state.currentCalendar = generateCalendar(year, month);
      state.today = `${year}-${`0${String(month)}`.slice(-2)}-${`0${String(day)}`.slice(-2)}`;
    },
    [SET_HOLIDAYS](state, payload) {
      state.holidays = payload.holidays;
    },
    [SET_DATE](state, payload) {
      state.selectedDate = payload.date;
    },
    [PREV_MONTH](state) {
      const {
        currentCalendar: { month, year },
      } = state;
      // 12月 <- 1月
      const thisMonth = month === 1 ? 12 : month - 1;
      const thisYear = month === 1 ? year - 1 : year;

      state.currentCalendar = generateCalendar(thisYear, thisMonth);
    },
    [NEXT_MONTH](state) {
      const {
        currentCalendar: { month, year },
      } = state;
      // 12月 -> 1月
      const thisMonth = month === 12 ? 1 : month + 1;
      const thisYear = month === 12 ? year + 1 : year;

      state.currentCalendar = generateCalendar(thisYear, thisMonth);
    },
    [ADD_TASK](state, payload) {
      state.taskList = [...state.taskList, payload];
    },
    [SAVE_TASK_LIST](state) {
      const json = JSON.stringify(state.taskList);
      if (!json) return;
      localStorage.setItem(STORAGE_KEY, json);
    },
    [REMOVE_TASK](state, payload) {
      state.taskList = state.taskList.filter((task) => task.id !== payload.id);
    },
    [HANDLE_MODAL](state, payload) {
      state.isModal = payload === MODAL_OPEN;
    },
  },
  actions: {
    initialize({ commit }, payload) {
      commit(FETCH_LOCAL_STORAGE);
      commit(SET_CALENDAR);
      commit(SET_HOLIDAYS, payload);
    },
    setDate({ commit }, payload) {
      commit(SET_DATE, payload);
    },
    prevMonth({ commit }) {
      commit(PREV_MONTH);
    },
    nextMonth({ commit }) {
      commit(NEXT_MONTH);
    },
    addTask({ commit }, payload) {
      commit(ADD_TASK, payload);
    },
    removeTask({ commit }, payload) {
      commit(REMOVE_TASK, payload);
    },
    saveTaskList({ commit }, payload) {
      commit(SAVE_TASK_LIST, payload);
    },
    handleModal({ commit }, payload) {
      commit(HANDLE_MODAL, payload);
    },
  },
});
