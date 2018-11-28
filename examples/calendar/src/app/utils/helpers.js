import moment from 'moment'

export const getDateRange = (date, view) => {
  switch (view) {
    case 'month':
      return {
        start: moment(date).startOf('month').startOf('week').startOf('day').toDate(),
        end: moment(date).endOf('month').endOf('week').endOf('day').toDate()
      }
    case 'week':
      return {
        start: moment(date).startOf('week').startOf('day').toDate(),
        end: moment(date).endOf('week').endOf('day').toDate()
      }
    case 'day':
      return {
        start: moment(date).startOf('day').toDate(),
        end: moment(date).endOf('day').toDate()
      }
    case 'agenda':
      return {
        start: moment(date).startOf('day').toDate(),
        end: moment(date).endOf('day').toDate()
      }
  }
}

export const getFormattedDuration = (start, end, format = 'HH:mm:ss') => {
  if (start && end) {
    var duration = moment.duration(end.diff(start))
    var formattedTime = moment(duration.asMilliseconds()).format(format)

    return formattedTime
  } else {
    return '00:00:00'
  }
}

export const getDuration = ({ appointment }) => {
  if (appointment && appointment.procedure) {
    return moment(appointment.procedure.duration, 'LTS')
  }

  if (appointment) {
    return moment('00:30:00', 'LTS')
  }

  return null
}
