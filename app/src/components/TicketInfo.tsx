type TicketInfoType = {
  title: string
  info: string | string[]
}

export function TicketInfo({title, info}: TicketInfoType) {
  return (
  <div className='flex flex-col'>
    <span className='font-500 text-s text-dark'>{title}</span>
    <span className='font-700 text-m text-white'>{info}</span>
  </div>
)
}