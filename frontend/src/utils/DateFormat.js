export function getTime(now) {
    let format = '{W} at {h}:{m} {ap}';
    let Warray = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
    ];

    let Wday = Warray[now.getDay()];
    format = format.replace(/\{W\}/g, Wday);

    let h = now.getHours();
    let pm = h > 11 ? true : false;

    if (h > 12) {
        h -= 12;
    }

    let ap = pm ? 'PM' : 'AM';
    format = format.replace(/\{ap\}/g, ap);

    let hh;

    if (h < 10) {
        hh = '0' + h;
    } else {
        hh = h;
    }

    format = format.replace(/\{h\}/g, hh);

    let mm = now.getMinutes();

    if (mm < 10) {
        mm = '0' + mm;
    }
    format = format.replace(/\{m\}/g, mm);

    return format;
}

export function getDate(now) {
    let format = '{M}/{D}/{Y}';
    let Marray = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
    ];

    let Month = Marray[now.getMonth()];
    format = format.replace(/\{M\}/g, Month);

    let Mday = now.getDate();

    if (Mday < 10) {
        Mday = '0' + Mday;
    }

    format = format.replace(/\{D\}/g, Mday);

    let Year = now.getFullYear();
    format = format.replace(/\{Y\}/g, Year);

    return format;
}
