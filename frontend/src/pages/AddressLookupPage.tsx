import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"
import { toast } from "sonner"

export default function AddressLookupPage() {
  const [address, setAddress] = useState("")
  const [loading, setLoading] = useState(false)
  const [jobId, setJobId] = useState("")
  const [lookupResult, setLookupResult] = useState<any>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!address) return

    setLoading(true)

    try {
      const res = await fetch("http://localhost:3001/api/address-lookup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ address }),
      })

      if (!res.ok) {
        throw new Error("Failed to queue address")
      }

      const data = await res.json()
      setJobId(data.id)

      toast.success("Your address is being looked up. We'll notify you once it's complete.")
    } catch (err: any) {
      toast.error(err.message || "Something went wrong.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!jobId) return

    const startTime = Date.now()
    const interval = setInterval(async () => {
      const res = await fetch(`http://localhost:3001/api/address-lookup/${jobId}`)
      const data = await res.json()

      if (data.status === "completed") {
        setLookupResult(data)
        clearInterval(interval)
        toast.success("Lookup complete!")
        return
      }

      if (Date.now() - startTime > 30000) {
        clearInterval(interval)
        toast.error("Lookup timed out. Please try again later.")
      }
    }, 2000)

    return () => clearInterval(interval)
  }, [jobId])

  return (
    <div className="w-full min-w-xl space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>HCAD Address Lookup</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="address" className="mb-4">Enter Address</Label>
                <Input
                  id="address"
                  placeholder="e.g. 1234 Main St, Houston, TX"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  disabled={loading}
                />
              </div>
              <Button type="submit" disabled={loading || !address}>
                {loading ? "Submitting..." : "Submit"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {loading && !lookupResult && (
          <div className="text-center text-gray-500">Looking up address...</div>
        )}

        {lookupResult && (
          <Card>
            <CardHeader>
              <CardTitle>Lookup Result</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div><strong>Address:</strong> {lookupResult.address}</div>
              <div><strong>Owner Name:</strong> {lookupResult.ownerName}</div>
              <div><strong>Mailing Address:</strong> {lookupResult.mailingAddress}</div>
              <div><strong>2024 Value:</strong> {lookupResult.value2024}</div>
              <div><strong>House Sqft:</strong> {lookupResult.houseSqft}</div>
              <div><strong>Lot Sqft:</strong> {lookupResult.lotSqft}</div>
              <div><strong>County:</strong> {lookupResult.county}</div>
              <div><strong>Status:</strong> {lookupResult.status}</div>
            </CardContent>
          </Card>
        )}
      </div>
  )
}