import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ComboBox } from '@/components/ComboBox';
import { formOrderSchema } from '@/lib/schemas/orderSchema';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { IFormOrder } from '@/lib/interfaces/orderInterface';
import { STATUS_PEMESANAN } from '@/constants/pemesanan/constans';
import convertRupiah from '@/utils/currency';
import DialogModal from '../DialogModal';
import { IService } from '@/lib/interfaces/serviceInterface';
import { IWorker } from '@/lib/interfaces/workerInterface';
import { fetchServices } from '@/lib/apis/serviceApi';
import { fetchWorker } from '@/lib/apis/workerApi';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { RedirectLoggin } from '../RedirectLoggin';

interface IFormOrderProps {
  initialValues?: IFormOrder,
  onSubmit: (data: IFormOrder)=>void
  closeModal?: ()=>void
}

export default function FormPemesanan({
  initialValues,
  onSubmit
}:IFormOrderProps) {
  const { register, handleSubmit, setValue, getValues, watch, formState: { errors } } = useForm<IFormOrder>({
    resolver: zodResolver(formOrderSchema),
    defaultValues: initialValues
  });
  const [services, setServices] = useState<IService[]>([]); 
  const [pics, setPics] = useState<IWorker[]>([]); 
  const [error, setError] = useState<string | null>(null);
  const [isErrorModal, setErrorModal] = useState(false);

  const {data: session, status} = useSession()
  if (status === 'unauthenticated') {
    redirect('/')
  }
  useEffect(() => { 
    const fetchData = async () => { 
      try { 
        const [servicesData, picsData] = await Promise.all([fetchServices('',session!), fetchWorker(session!)]); 
        setServices(servicesData); 
        setPics(picsData); 
      } catch (error) { 
        setError((error as Error).message)
        setErrorModal(true);
      }
    }; 
    fetchData();
  }, []);

  const handleCloseErrorModal = () => { 
    setError(null); 
    setErrorModal(false);
    if (error?.includes('service')){
      redirect('/pemesanan')
    }
    window.location.reload();
  };

  const handleServiceSelect = (value: string) => { 
    const selectedService = services.find(service => service.id === parseInt(value)); 
    if (selectedService) { 
      setValue('serviceId', selectedService.id); 
      setValue('totalPrice', selectedService.price);  
    } 
  };

  const handlePICSelect = (value: string) => { 
    const selectedPIC = pics.find(pic => pic.id === parseInt(value)); 
    if (selectedPIC) { 
      setValue('picId', selectedPIC.id); 
    } 
  };

  const handleStatusSelect = (value: string) => { 
    const selectedStatus = STATUS_PEMESANAN.find(status => status === value); 
    if (selectedStatus) { 
      setValue('status', selectedStatus); 
    } 
  };
  
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="customerName" className="block text-sm font-medium text-gray-700">
            Customer Name
          </label>
          <Input id="customerName" {...register('customerName')} />
          {errors.customerName && <p className="mt-2 text-sm text-red-600">{errors.customerName.message}</p>}
        </div>

        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">
            Address
          </label>
          <Input id="address" {...register('address')} />
          {errors.address && <p className="mt-2 text-sm text-red-600">{errors.address.message}</p>}
        </div>

        <div>
          <label htmlFor="service" className="block text-sm font-medium text-gray-700">
            Service
          </label>
          <ComboBox 
            items={services.map(e=>{
              return {value: e.id.toString(), label: e.title}
            })}
            onSelect={handleServiceSelect}
            value={getValues('serviceId') ? getValues('serviceId').toString() : ''}
            placeholder="Select a service"
          />
          {errors.serviceId && <p className="mt-2 text-sm text-red-600">{errors.serviceId.message}</p>}
        </div>

        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">
            Date
          </label>
          <Input id="date" type="datetime-local" {...register('date')} />
          {errors.date && <p className="mt-2 text-sm text-red-600">{errors.date.message}</p>}
        </div>

        <div>
          <label htmlFor="picId" className="block text-sm font-medium text-gray-700">
            PIC
          </label>
          <ComboBox 
            items={pics.map(e=> {
              return {value: e.id.toString(), label: e.name}
            })}
            onSelect={handlePICSelect}
            value={watch('picId') ? watch('picId').toString() : ''}
            placeholder="Select a PIC"
          />
          {errors.picId && <p className="mt-2 text-sm text-red-600">{errors.picId.message}</p>}
        </div>

        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">
            STATUS
          </label>
          <ComboBox 
            items={STATUS_PEMESANAN.map(e=>({label: e.split('_').join(' '), value: e}))}
            onSelect={handleStatusSelect}
            value={watch('status') ?? ''}
            placeholder="Select a Status"
          />
          {errors.picId && <p className="mt-2 text-sm text-red-600">{errors.picId.message}</p>}
        </div>

        <div>
          <label htmlFor="totalPrice" className="block text-sm font-medium text-gray-700">
            Total Price
          </label>
          {convertRupiah(watch('totalPrice') ?? 0 )}
          {errors.address && <p className="mt-2 text-sm text-red-600">{errors.address.message}</p>}
        </div>

        <Button type="submit">Submit</Button>
      </form>
      {error && <DialogModal status='Berhasil' message={error} isOpen={isErrorModal} onClose={handleCloseErrorModal} />}
      <RedirectLoggin/>
    </>
  );
}
