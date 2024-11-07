import Table from "@/components/manejemenPekerja/table";
import Button from "@/components/manejemenPekerja/button";
import Card from "@/components/manejemenPekerja/card";
import CardPekerjaan from "@/components/manejemenPekerja/cardPekerjaan";
import CardHapus from "@/components/manejemenPekerja/cardHapus";

export default async function ManajemenPekerja() {
  return (
    <main className="p-10">
      <h1 className="text-2xl font-bold my-2">Manajemen Pekerja</h1>
      <div>
        <Table/>
      </div>
      <div className="flex flex-row gap-10 mt-5">
        <div className="basis-1/4">
        <h3 className="font-bold my-2 ">Menambahkan Pekerja</h3>
        </div>
        <div className="basis-1/4">
        <h3 className="font-bold my-2 ">Memberikan Pekerjaan</h3>
        </div>
        <div className="basis-1/4">
        <h3 className="font-bold my-2 ">Menghapus Pekerja</h3>
        </div>
      </div>
      <div className="flex flex-row mt-5 gap-10">
        <div className="basis-1/4 ">
        <Card/>
        </div>
        <div className="basis-1/4">
          <CardPekerjaan/>
        </div>
        <div className="basis-1/4">
        <CardHapus/>
        </div>
      </div>
    </main>
  );
}
