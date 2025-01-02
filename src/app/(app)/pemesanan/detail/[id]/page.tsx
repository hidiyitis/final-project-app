'use client'
import DialogModal from "@/components/DialogModal"
import ModalPemesanan from "@/components/pemesanan/ModalPemesanan"
import { RedirectLoggin } from "@/components/RedirectLoggin"
import { Label } from "@/components/ui/label"
import { fetchOrderById } from "@/lib/apis/orderApi"
import { IFormOrder, IOrder } from "@/lib/interfaces/orderInterface"
import convertRupiah from "@/utils/currency"
import { parseDateTime } from "@/utils/dateFormat"
import { ArrowLeft } from "lucide-react"
import { useSession } from "next-auth/react"
import { useRouter, useParams, redirect } from "next/navigation"
import { useState, useEffect } from "react"

function DetailPemesananPage() {
  const router = useRouter()
  const [formOrder, setFormOrder] = useState<IFormOrder | undefined>(undefined); 
  const [order, setOrder] = useState<IOrder | null>(null); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState<string | null>(null);
  const [isErrorModal, setErrorModal] = useState(true); 
  const { id } = useParams();
  const {data: session} = useSession();

  const handleCloseErrorModal = () => { 
    setError(null); 
    setErrorModal(false);
  };
  useEffect(() => { 
    const getOrder = async () => { 
      try { 
        const data = await fetchOrderById(Number(id), session!);
        setOrder(data); 
        setFormOrder({
          address: data.address,
          customerName: data.customerName,
          date: data.date,
          picId: data.picId,
          serviceId: data.serviceId,
          status: data.status,
          totalPrice: data.totalPrice
        })
      } catch (error) {
         setError((error as Error).message); 
         setErrorModal(true);
      } finally { 
        setLoading(false); 
      } 
    }; 
    getOrder(); 
  }, []);
  if (loading) return <div className="text-center">Loading...</div>; 
  if (error) return <DialogModal status='Gagal' message={error} isOpen={isErrorModal} onClose={handleCloseErrorModal} />; 
  if (!order) return <div>No order found</div>;
  return (
    <main className="px-10">
      <div className="flex flex-col justify-between my-4">
        <div className="flex flex-row items-center gap-2">
            <ArrowLeft onClick={router.back} cursor={'pointer'}/>
              <h1 className="text-2xl font-bold my-2">Pemesanan</h1>
          </div>
          <div className="mb-5">
            <p className="text-muted-foreground">Detail pemesanan</p>
        </div>
        <div className="space-y-2">
          <div className="flex flex-row justify-between">
            <main>
              <div className="space-y-1">
                <Label className="text-primary">
                  Nama Pemesan
                </Label>
                <p>{order?.customerName}</p>
              </div>
              <div className="space-y-1">
                <Label className="text-primary">
                  Alamat
                </Label>
                <p>{order?.address}</p>
              </div>
              <div className="space-y-1">
                <Label className="text-primary">
                  Layanan
                </Label>
                <p>{order?.service.title}</p>
              </div>
              <div className="space-y-1">
                <Label className="text-primary">
                  Tanggal
                </Label>
                <p>{parseDateTime(order?.date)}</p>
              </div>
              <div className="space-y-1">
                <Label className="text-primary">
                  Petugas
                </Label>
                <p>{order?.pic?.name}</p>
              </div>
              <div className="space-y-1">
                <Label className="text-primary">
                  Total Harga
                </Label>
                <p>{convertRupiah(order!.service.price)}</p>
              </div>
              <div className="space-y-1">
                <Label className="text-primary">
                  Status
                </Label>
                <p>{order?.status.replace('_',' ')}</p>
              </div>
            </main>
            <ModalPemesanan order={formOrder}/>
          </div>
        </div>
      </div>
      <RedirectLoggin/>
    </main>
  )
}

export default DetailPemesananPage