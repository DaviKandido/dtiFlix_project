// formatações de data.
'use strict';
const moment = require('moment');

const dateTimeFormat = 'YYYY-MM-DD HH:mm:ss';
const dateFormat = 'YYYY-MM-DD';

const DateTimeUtil = {
  now: () => {
    moment.locale('pt-BR');
    return moment().format(dateTimeFormat);
  },

  today: () => {
    moment.locale('pt-BR');
    return moment().format(dateFormat);
  },

  dateTimeFormat: (datetime, format) => {
    moment.locale('pt-BR');
    return moment(datetime, dateTimeFormat).format(format);
  },

  dateFormat: (date, format, fromFormat = dateFormat) => {
    moment.locale('pt-BR');
    return moment(date, fromFormat).format(format);
  },

  addDays: (date, days) => {
    return moment(date).add(days, 'days').format(dateFormat);
  },

  subtractDays: (date, days) => {
    return moment(date).subtract(days, 'days').format(dateFormat);
  },

  /**
   * 1 - Segunda, 7 - Domingo
   * @param {*} datetime
   * @returns
   */
  weekday: (datetime) => {
    moment.locale('pt-BR');
    return moment(datetime, dateTimeFormat).isoWeekday();
  },

  time: (datetime) => {
    return DateTimeUtil.dateTimeFormat(datetime, 'HH:mm:ss');
  },

  timeFormat: (time, format, fromFormat) => {
    return moment(time, fromFormat).format(format);
  },

  isInsideIntervalTime: (timeStart, timeEnd, time) => {
    return time >= timeStart && time <= timeEnd;
  },

  fromString: (dateString, format) => {
    return moment(dateString, format).format(dateFormat);
  },

  fromStringProdemgeOrZerosInvalid: (dateString) => {
    const dateMmt = moment(dateString, 'YYYYMMDD');
    return dateMmt.isValid() ? dateMmt.format(dateFormat) : '0000-00-00';
  },
  todayWithMonthWriten: () => {
    const date = new Date();
    const dia = date.getDate();
    const mes = date.getMonth();
    const ano = date.getFullYear();
    const meses = [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro',
    ];

    const dataExtenso = `${dia} ${meses[mes]} de ${ano}`;
    return dataExtenso;
  },
};

module.exports = DateTimeUtil;