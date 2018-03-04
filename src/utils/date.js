import moment from 'moment';

export function format(date, to = 'DD/MM/YYYY hh:mm') {
    return moment(date).format(to);
}
