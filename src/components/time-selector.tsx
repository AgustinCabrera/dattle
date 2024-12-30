import React from 'react'

interface TimeSelectorProps{
  onTimeChange:(
    time: {
      hour:string;
      minute:string;
    }) => void;
}
{
  /*TimeSelector component uses the TimeSelectorProps interface to type its props. 
  The onTimeChange function is called whenever the time input changes, 
  passing the selected hour and minute as an object */
}
const TimeSelector: React.FC<TimeSelectorProps> = ({onTimeChange}) => {
  const [hour, setHour] = React.useState('00');
  const [minute, setMinute] = React.useState('00');

  const hours = Array.from({length: 24}, (_, i) => i.toString().padStart(2, '0'));
  const minutes = Array.from({length: 60}, (_, i) => i.toString().padStart(2, '0'));

  const handleTimeChange = () => {
    onTimeChange({hour, minute});
  }
  return (
    <div className='flex space-x-4'>
      <select 
      value={hour} 
      onChange={(e) => {
        setHour(e.target.value);
        handleTimeChange();
      }}
      className='p-2 border rounded'>
        {hours.map((hour) => (
          <option key={hour} value={hour}>{hour}</option>
        ))}
      </select>
      <span>:</span>
      <select
      value={minute}
      onChange={(e) => {
        setMinute(e.target.value);
        handleTimeChange();
      }}
      className='p-2 border rounded'>
        {minutes.map((minute) => (
          <option key={minute} value={minute}>{minute}</option>
        ))}
      </select>
    </div>
  )
}

export default TimeSelector
