
async function DetailPemesananPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  return (
    <main className="px-10">
      <div className="flex flex-col justify-between my-4">
        <div className="mb-5">
          <h1 className="text-2xl font-bold my-2">Pemesanan</h1>
          <p className="text-muted-foreground">Detail pemesanan jasa EzKost</p>
        </div>
      </div>
    </main>
  )
}

export default DetailPemesananPage