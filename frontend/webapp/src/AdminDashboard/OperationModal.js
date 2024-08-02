import React, { useState } from 'react';
import './OperationModal.css';
import TimeDropdown from './TimeDropdown';

const generateTimeOptions = () => {
  const options = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 10) {
      const time = `${String(hour).padStart(2, '0')}:${String(minute).padStart(
        2,
        '0'
      )}`;
      options.push({ value: time, label: time });
    }
  }
  return options;
};

const timeOptions = generateTimeOptions();
const daysOfWeek = ['월', '화', '수', '목', '금', '토', '일'];

function OperationModal({ option }) {
  const [weekdayHours, setWeekdayHours] = useState({ open: '', close: '' });
  const [weekendHours, setWeekendHours] = useState({
    openweekend: '',
    closeweekend: '',
  });
  const [breakTime, setBreakTime] = useState({ start: '', end: '' });
  const [lastOrder, setLastOrder] = useState({ first: '', last: '' });
  const [dayOff, setDayOff] = useState([]);
  // const [dayOff, setDayOff] = useState([]);
  const [selectedDays, setSelectedDays] = useState([]);

  const [dailySchedule, setDailySchedule] = useState(
    daysOfWeek.reduce(
      (acc, day) => ({
        ...acc,
        [day]: {
          isOpen: false,
          openTime: '',
          closeTime: '',
          breakStart: '',
          breakEnd: '',
          lastOrderStart: '',
          lastOrderEnd: '',
        },
      }),
      {}
    )
  );

  const handleDayToggle = (day) => {
    setDailySchedule((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        isOpen: !prev[day].isOpen,
      },
    }));
  };

  const handleTimeChange = (day, field, value) => {
    setDailySchedule((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [field]: value,
      },
    }));
  };

  const handleInputChange = (event, type) => {
    const { name, value } = event.target;
    if (type === 'weekday') {
      setWeekdayHours({ ...weekdayHours, [name]: value });
    } else if (type === 'weekend') {
      setWeekendHours({ ...weekendHours, [name]: value });
    }
  };

  const handleBreakTimeChange = (event) => {
    const { name, value } = event.target;
    setBreakTime((prev) => ({ ...prev, [name]: value }));
  };

  const handleLastOrderChange = (event) => {
    const { name, value } = event.target;
    setLastOrder((prev) => ({ ...prev, [name]: value }));
  };

  const handleDayOffChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setDayOff((prev) => [...prev, value]);
    } else {
      setDayOff((prev) => prev.filter((day) => day !== value));
    }
  };

  const handleDaySelect = (day) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  let content;

  switch (option) {
    case '모든 영업일이 같아요':
      content = (
        <>
          <div className="operation-time-row">
            <div className="operation-subject">영업시간</div>
            <div className="operation-break-time">
              <TimeDropdown
                value={weekdayHours.open}
                onChange={(e) => handleInputChange(e, 'weekday')}
                name="open"
                options={timeOptions}
              />
              <div className="operation-flew">~</div>
              <TimeDropdown
                value={weekdayHours.close}
                onChange={(e) => handleInputChange(e, 'weekday')}
                name="close"
                options={timeOptions}
              />
            </div>
          </div>
          <div className="operation-break">
            <div className="operation-subject">브레이크 </div>
            <div className="operation-break-time">
              <TimeDropdown
                value={breakTime.start}
                onChange={handleBreakTimeChange}
                name="start"
                options={timeOptions}
              />
              <div className="operation-flew">~</div>
              <TimeDropdown
                value={breakTime.end}
                onChange={handleBreakTimeChange}
                name="end"
                options={timeOptions}
              />
            </div>
          </div>
          <div className="operation-break">
            <div className="operation-subject">라스트오더 </div>
            <div className="operation-break-time">
              <TimeDropdown
                value={lastOrder.first}
                onChange={handleLastOrderChange}
                name="first"
                options={timeOptions}
              />
              <div className="operation-flew">~</div>
              <TimeDropdown
                value={lastOrder.last}
                onChange={handleLastOrderChange}
                name="last"
                options={timeOptions}
              />
            </div>
          </div>
          <div className="operation-dayoff">
            <div className="operation-subject">휴무일</div>
            <div className="operation-dayoff-options">
              <div className="day-selector">
                {['월', '화', '수', '목', '금', '토', '일'].map((day) => (
                  <button
                    key={day}
                    className={`day-button ${
                      selectedDays.includes(day) ? 'selected' : ''
                    }`}
                    onClick={() => handleDaySelect(day)}>
                    {day}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </>
      );
      break;
    case '평일/주말 달라요':
      content = (
        <>
          <div className="operation-time-row">
            <div className="operation-subject">평일 영업시간</div>
            <div className="operation-break-time">
              <TimeDropdown
                value={weekdayHours.open}
                onChange={(e) => handleInputChange(e, 'weekday')}
                name="open"
                options={timeOptions}
              />
              <div className="operation-flew">~</div>
              <TimeDropdown
                value={weekdayHours.close}
                onChange={(e) => handleInputChange(e, 'weekday')}
                name="close"
                options={timeOptions}
              />
            </div>
          </div>
          <div className="operation-time-row">
            <div className="operation-subject">주말 영업시간</div>
            <div className="operation-break-time">
              <TimeDropdown
                value={weekendHours.openweekend}
                onChange={(e) => handleInputChange(e, 'weekend')}
                name="openweekend"
                options={timeOptions}
              />
              <div className="operation-flew">~</div>
              <TimeDropdown
                value={weekendHours.closeweekend}
                onChange={(e) => handleInputChange(e, 'weekend')}
                name="closeweekend"
                options={timeOptions}
              />
            </div>
          </div>
          <div className="operation-break">
            <div className="operation-subject">브레이크 </div>
            <div className="operation-break-time">
              <TimeDropdown
                value={breakTime.start}
                onChange={handleBreakTimeChange}
                name="start"
                options={timeOptions}
              />
              <div className="operation-flew">~</div>
              <TimeDropdown
                value={breakTime.end}
                onChange={handleBreakTimeChange}
                name="end"
                options={timeOptions}
              />
            </div>
          </div>
          <div className="operation-break">
            <div className="operation-subject">라스트오더 </div>
            <div className="operation-break-time">
              <TimeDropdown
                value={lastOrder.first}
                onChange={handleLastOrderChange}
                name="first"
                options={timeOptions}
              />
              <div className="operation-flew">~</div>
              <TimeDropdown
                value={lastOrder.last}
                onChange={handleLastOrderChange}
                name="last"
                options={timeOptions}
              />
            </div>
          </div>
          <div className="operation-dayoff">
            <div className="operation-subject">휴무일</div>
            <div className="operation-dayoff-options">
              <div className="day-selector">
                {['월', '화', '수', '목', '금', '토', '일'].map((day) => (
                  <button
                    key={day}
                    className={`day-button ${
                      selectedDays.includes(day) ? 'selected' : ''
                    }`}
                    onClick={() => handleDaySelect(day)}>
                    {day}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </>
      );
      break;
    case '요일별로 달라요':
      content = (
        <div className="daily-schedule">
          {daysOfWeek.map((day) => (
            <div key={day} className="day-schedule">
              <div className="day-toggle">
                <input
                  type="checkbox"
                  id={`toggle-${day}`}
                  checked={dailySchedule[day].isOpen}
                  onChange={() => handleDayToggle(day)}
                />
                <label htmlFor={`toggle-${day}`}>{day}</label>
              </div>
              {dailySchedule[day].isOpen ? (
                <div className="day-times">
                  <div className="time-row">
                    <span>영업시간:</span>
                    <TimeDropdown
                      value={dailySchedule[day].openTime}
                      onChange={(e) =>
                        handleTimeChange(day, 'openTime', e.target.value)
                      }
                      options={timeOptions}
                    />
                    <span>~</span>
                    <TimeDropdown
                      value={dailySchedule[day].closeTime}
                      onChange={(e) =>
                        handleTimeChange(day, 'closeTime', e.target.value)
                      }
                      options={timeOptions}
                    />
                  </div>
                  <div className="time-row">
                    <span>브레이크:</span>
                    <TimeDropdown
                      value={dailySchedule[day].breakStart}
                      onChange={(e) =>
                        handleTimeChange(day, 'breakStart', e.target.value)
                      }
                      options={timeOptions}
                    />
                    <span>~</span>
                    <TimeDropdown
                      value={dailySchedule[day].breakEnd}
                      onChange={(e) =>
                        handleTimeChange(day, 'breakEnd', e.target.value)
                      }
                      options={timeOptions}
                    />
                  </div>
                  <div className="time-row">
                    <span>라스트오더:</span>
                    <TimeDropdown
                      value={dailySchedule[day].lastOrderStart}
                      onChange={(e) =>
                        handleTimeChange(day, 'lastOrderStart', e.target.value)
                      }
                      options={timeOptions}
                    />
                    <span>~</span>
                    <TimeDropdown
                      value={dailySchedule[day].lastOrderEnd}
                      onChange={(e) =>
                        handleTimeChange(day, 'lastOrderEnd', e.target.value)
                      }
                      options={timeOptions}
                    />
                  </div>
                </div>
              ) : (
                <div className="day-closed">휴무일</div>
              )}
            </div>
          ))}
        </div>
      );
      break;
    default:
      content = null;
  }

  if (!content) return null;

  return (
    <div className="operation-modal-container">
      <div className="operation-modal">
        <div className="operation-modal-content">{content}</div>
      </div>
    </div>
  );
}

export default OperationModal;
