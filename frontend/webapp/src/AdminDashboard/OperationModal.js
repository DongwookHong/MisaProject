import React, { useState, useEffect } from 'react';
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
const daysOfWeek = [
  'MONDAY',
  'TUESDAY',
  'WEDNESDAY',
  'THURSDAY',
  'FRIDAY',
  'SATURDAY',
  'SUNDAY',
];
const daysOfWeekKorean = ['월', '화', '수', '목', '금', '토', '일'];

function OperationModal({ option, setStoreHours }) {
  const [weekdayHours, setWeekdayHours] = useState({ open: '', close: '' });
  const [weekendHours, setWeekendHours] = useState({ open: '', close: '' });
  const [breakTime, setBreakTime] = useState({ start: '' });
  const [lastOrder, setLastOrder] = useState({ time: '' });
  const [selectedDays, setSelectedDays] = useState([]);

  const [dailySchedule, setDailySchedule] = useState(
    daysOfWeek.reduce(
      (acc, day) => ({
        ...acc,
        [day]: {
          isOpen: true,
          openTime: '',
          closeTime: '',
          breakStartTime: '',
          lastOrderTime: '',
        },
      }),
      {}
    )
  );

  useEffect(() => {
    updateStoreHours();
  }, [
    weekdayHours,
    weekendHours,
    breakTime,
    lastOrder,
    selectedDays,
    dailySchedule,
    option,
  ]);

  const updateStoreHours = () => {
    let updatedStoreHours = [];

    if (option === '모든 영업일이 같아요') {
      updatedStoreHours = daysOfWeek.map((day) => ({
        dayOfWeek: day,
        isOpen: !selectedDays.includes(
          daysOfWeekKorean[daysOfWeek.indexOf(day)]
        ),
        openTime: weekdayHours.open,
        closeTime: weekdayHours.close,
        breakStartTime: breakTime.start,
        breakEndTime: '',
        lastOrder: lastOrder.time,
      }));
    } else if (option === '평일/주말 달라요') {
      updatedStoreHours = daysOfWeek.map((day) => {
        const isWeekend = day === 'SATURDAY' || day === 'SUNDAY';
        return {
          dayOfWeek: day,
          isOpen: !selectedDays.includes(
            daysOfWeekKorean[daysOfWeek.indexOf(day)]
          ),
          openTime: isWeekend ? weekendHours.open : weekdayHours.open,
          closeTime: isWeekend ? weekendHours.close : weekdayHours.close,
          breakStartTime: breakTime.start,
          breakEndTime: '',
          lastOrder: lastOrder.time,
        };
      });
    } else if (option === '요일별로 달라요') {
      updatedStoreHours = daysOfWeek.map((day) => ({
        ...dailySchedule[day],
        dayOfWeek: day,
      }));
    }

    setStoreHours(updatedStoreHours);
  };

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

  const handleDaySelect = (day) => {
    setSelectedDays((prev) => {
      const newSelectedDays = prev.includes(day)
        ? prev.filter((d) => d !== day)
        : [...prev, day];
      return newSelectedDays;
    });
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
            <div className="operation-subject">브레이크 타임</div>
            <div className="operation-break-time">
              <TimeDropdown
                value={breakTime.start}
                onChange={handleBreakTimeChange}
                name="start"
                options={timeOptions}
              />
            </div>
          </div>
          <div className="operation-break">
            <div className="operation-subject">라스트오더 </div>
            <div className="operation-break-time">
              <TimeDropdown
                value={lastOrder.time}
                onChange={handleLastOrderChange}
                name="time"
                options={timeOptions}
              />{' '}
              */}
            </div>
          </div>
          <div className="operation-dayoff">
            <div className="operation-subject">휴무일</div>
            <div className="operation-dayoff-options">
              <div className="day-selector">
                {daysOfWeekKorean.map((day) => (
                  <button
                    key={day}
                    type="button"
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
                value={weekendHours.open}
                onChange={(e) => handleInputChange(e, 'weekend')}
                name="open"
                options={timeOptions}
              />
              <div className="operation-flew">~</div>
              <TimeDropdown
                value={weekendHours.close}
                onChange={(e) => handleInputChange(e, 'weekend')}
                name="close"
                options={timeOptions}
              />
            </div>
          </div>
          <div className="operation-break">
            <div className="operation-subject">브레이크 타임</div>
            <div className="operation-break-time">
              <TimeDropdown
                value={breakTime.start}
                onChange={handleBreakTimeChange}
                name="start"
                options={timeOptions}
              />
            </div>
          </div>
          <div className="operation-break">
            <div className="operation-subject">라스트오더 </div>
            <div className="operation-break-time">
              <TimeDropdown
                value={lastOrder.time}
                onChange={handleLastOrderChange}
                name="time"
                options={timeOptions}
              />{' '}
              */}
            </div>
          </div>
          <div className="operation-dayoff">
            <div className="operation-subject">휴무일</div>
            <div className="operation-dayoff-options">
              <div className="day-selector">
                {daysOfWeekKorean.map((day) => (
                  <button
                    key={day}
                    type="button"
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
          {daysOfWeek.map((day, index) => (
            <div key={day} className="day-schedule">
              <div className="day-toggle">
                <input
                  type="checkbox"
                  id={`toggle-${day}`}
                  checked={dailySchedule[day].isOpen}
                  onChange={() => handleDayToggle(day)}
                />
                <label htmlFor={`toggle-${day}`}>
                  {daysOfWeekKorean[index]}
                </label>
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
                    <span>브레이크 타임:</span>
                    <TimeDropdown
                      value={dailySchedule[day].breakStartTime}
                      onChange={(e) =>
                        handleTimeChange(day, 'breakStartTime', e.target.value)
                      }
                      options={timeOptions}
                    />
                  </div>
                  <div className="time-row">
                    <span>라스트오더:</span>
                    <TimeDropdown
                      value={dailySchedule[day].lastOrderTime}
                      onChange={(e) =>
                        handleTimeChange(day, 'lastOrderTime', e.target.value)
                      }
                      options={timeOptions}
                    />{' '}
                    */}
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
