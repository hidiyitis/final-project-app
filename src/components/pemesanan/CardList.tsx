import React from 'react'
import { Card } from '@/components/ui/card'
import { parseIsoString } from '@/utils/dateFormat'
import { ChevronRight, Tag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import convertRupiah from '@/utils/currency'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Link from 'next/link'
import { IOrder } from '@/lib/interfaces/orderInterface'

function CardListPemesanan({pemesananList}:{
  pemesananList?: IOrder[]
}) {
  if (pemesananList?.length === 0) {
    return <EmptyState/>
  }
  return (
    <>
      <ul>
      {pemesananList?.map(e => (
        <CardPemesanan  pemesanan={e} key={e.id}/>
      ))}
      </ul>
    </>
  )
}

const CardPemesanan = ({pemesanan}:{
  pemesanan?: IOrder
})=>{
  return(
    <li className='my-3'>
        <Card>
          <div className="flex flex-col">
            <div className="px-5 border-b-2">
              <div className='flex flex-row gap-3 items-center my-2 justify-between'>
                <div className='flex flex-row gap-5'>
                  <p>{parseIsoString(pemesanan!.date)}</p>
                  <div className='flex items-center'>
                    <StatusPemesanan status={pemesanan!.status}/>
                  </div>
                </div>
                <div className="flex flex-row">
                  <Link href={'pemesanan/detail/[id]'} as={`/pemesanan/detail/${pemesanan?.id}`}>
                    <Button variant={'ghost'} className='p-0'>Lihat Selengkapnya<ChevronRight/></Button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="flex flex-row px-5 py-2 justify-between">
              <div className='flex flex-col justify-between gap-1'>
                <div className='flex flex-row gap-2 p-0'>
                  <p className='text-sm text-white bg-slate-700 px-3 py-1 rounded-md'>{pemesanan?.service.title}</p>
                </div>
                <p className='text-lg font-normal'>{pemesanan?.customerName}</p>
                <p><b>Alamat: </b>{pemesanan?.address}</p>
                <div className='flex flex-row gap-1'>
                  <Tag color='hsl(var(--primary))'/>
                  <p className='font-semibold text-primary'>{convertRupiah(pemesanan?.service.price ?? 0)}</p>
                </div>
              </div>
              <div className="flex flex-row items-center justify-between">
                <div className='flex flex-row items-center gap-2'>
                  <p>{pemesanan?.pic.name}</p> 
                  <Avatar>
                    <AvatarImage src=""/>
                    <AvatarFallback className="font-semibold">{pemesanan?.pic.name[0]}</AvatarFallback>
                  </Avatar>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </li>
  )
}

const EmptyState =()=>{
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        Tidak ada Pesanan
      </h3>
    </div>
  );
}

const StatusPemesanan = ({status}:{status:string})=>{
  if (status.toUpperCase()==='BELUM') {
    return <p className='px-3 py-1 rounded-md backdrop-brightness-50 opacity-90 text-sm font-normal text-white'>{status}</p>
  }
  if (status.toUpperCase()==='SEDANG_DIKERJAKAN') {
    return <p className='px-3 py-1 rounded-md bg-yellow-400 opacity-90 text-sm font-normal text-white'>{status.replace('_', ' ')}</p>
  }
  return(
    <p className='px-3 py-1 rounded-md bg-green-400 opacity-90 text-sm font-normal text-white'>
      {status}
    </p>
  )
}

export default CardListPemesanan