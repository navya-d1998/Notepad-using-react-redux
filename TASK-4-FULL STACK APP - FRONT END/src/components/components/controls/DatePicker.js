import React from 'react'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import format from "date-fns/format";
import { useState } from 'react';
import isWeekend from 'date-fns/isWeekend';

export default function DatePicker(props) {

    const { name, label, value, onChange } = props
   
        const [startDate, setStartDate] = useState(null);
        const isWeekday = date => {
          const day = date.getDay();
          return day !== 0 && day !== 6;
        };

    const convertToDefEventPara = (name, value) => ({
        target: {
            name, value
        }
    })

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker disableToolbar variant="inline" inputVariant="outlined"
                label={label}
                format="yyyy-MM-dd"
                name={name}
                selected={startDate}

                disablePast
                shouldDisableDate={isWeekend}
                value={value}
                onChange={date =>onChange(convertToDefEventPara(name,format(date, "yyyy-MM-dd")))}

            />
        </MuiPickersUtilsProvider>
    )
}