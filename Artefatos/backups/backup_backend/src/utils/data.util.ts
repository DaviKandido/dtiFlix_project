// formatações de data.
'use strict';
import moment from 'moment';

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

  dateTimeFormat: (datetime: any, format: any) => {
    moment.locale('pt-BR');
    return moment(datetime, dateTimeFormat).format(format);
  },

  dateFormat: (date: any, format: any, fromFormat = dateFormat) => {
    moment.locale('pt-BR');
    return moment(date, fromFormat).format(format);
  },

  addDays: (date: any, days: any) => {
    return moment(date).add(days, 'days').format(dateFormat);
  },

  subtractDays: (date: any, days: any) => {
    return moment(date).subtract(days, 'days').format(dateFormat);
  },

  /**
   * 1 - Segunda, 7 - Domingo
   * @param {*} datetime
   * @returns
   */
  weekday: (datetime: any) => {
    moment.locale('pt-BR');
    return moment(datetime, dateTimeFormat).isoWeekday();
  },

  time: (datetime: any) => {
    return DateTimeUtil.dateTimeFormat(datetime, 'HH:mm:ss');
  },

  timeFormat: (time: any, format: any, fromFormat: any) => {
    return moment(time, fromFormat).format(format);
  },

  isInsideIntervalTime: (timeStart: any, timeEnd: any, time: any) => {
    return time >= timeStart && time <= timeEnd;
  },

  fromString: (dateString: any, format: any) => {
    return moment(dateString, format).format(dateFormat);
  },

  fromStringProdemgeOrZerosInvalid: (dateString: any) => {
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